"""Prepara las imágenes de la web a partir de los PNG originales de la carpeta.

- Fotos: versiones WebP en varios anchos (hero 2400 px reescalado con Lanczos + enfoque suave,
  1600, 1000 y 600 px) en assets/img/fotos/.
- Adornos: recorta cada motivo de la lámina «Motivos dorados…» (ya trae transparencia)
  y lo guarda en assets/img/adornos/.
- Marca: sello circular del logotipo, favicon e imagen para compartir.

Uso: python scripts/prepare_assets.py
"""
import json
from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "img"

# nombre de salida -> fichero original
FOTOS = {
    "sala-ambar": "Sala de yoga con luz ámbar-2.png",
    "hatha-vinyasa": "Hatha Vinyasa al amanecer-2.png",
    "guerrero-luminoso": "Postura guerrera en estudio luminoso-1.png",
    "principiantes-atardecer": "Yoga para principiantes al atardecer-1.png",
    "estiramiento-guiado": "Estiramiento guiado en clase de yoga-1.png",
    "yoga-pareja": "Yoga en pareja bajo luz ámbar-3.png",
    "restaurativo-ambar": "Descanso restaurativo en luz ámbar-1.png",
    "restaurativo-sereno": "Descanso sereno en yoga restaurativo-2.png",
    "accesorios": "Accesorios de yoga en luz ámbar-3.png",
    "rincon-calido": "Rincón de yoga en luz cálida-5.png",
    "nidra-atardecer": "Yoga Nidra al atardecer-3.png",
    "nidra-grupo": "f77b888f-8324-4451-991d-b3af88d72d99.png",
    "savasana-atardecer": "Savasana serena al atardecer-4.png",
    "meditacion-ambar": "Mujer meditando en luz ámbar-4.png",
    "manos-serenas": "Manos serenas en meditación-4.png",
    "meditacion-luminosa": "Meditación serena en estudio luminoso-3.png",
    "manos-guian": "Manos que guían la meditación-7.png",
    "respiracion": "Respiración consciente antes del yoga-2.png",
    "mantras-ambar": "Círculo de mantras en luz ámbar-5.png",
    "mantras-calma": "Círculo de mantras en calma-5.png",
    "cuenco": "Cuenco tibetano y luz ámbar-6.png",
    "ninos-ambar": "Yoga infantil con luz ámbar-6.png",
    "ninos-sonrisas": "Equilibrio y sonrisas en yoga infantil-2.png",
    "ninos-alegria": "Equilibrio y alegría en yoga infantil-6.png",
    "ninos-luminoso": "Yoga infantil en estudio luminoso-1.png",
    "taller-luminoso": "Taller de yoga en estudio luminoso-7.png",
    "circulo-calma": "Círculo de calma tras el yoga-4.png",
    "sala-madera": "Meditación serena en sala de madera-3.png",
    "retiro-mediterraneo": "Yoga al atardecer en retiro mediterráneo-7.png",
    "retiro-olivos": "Yoga al amanecer entre olivos-8.png",
}

ANCHOS = [2400, 1600, 1000, 600]

# Rejilla 4 x 3 de la lámina de adornos
ADORNOS = [
    ["mandala", "om", "loto", "sol"],
    ["luna", "esterilla", "vela", "rama"],
    ["arco", "guirnalda", "cojin", "esquina"],
]


def save_webp(im: Image.Image, path: Path, quality: int = 82) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    im.save(path, "WEBP", quality=quality, method=6)


def fotos() -> None:
    dst = OUT / "fotos"
    dims = {}
    for nombre, fichero in FOTOS.items():
        src = Image.open(ROOT / fichero).convert("RGB")
        w, h = src.size
        dims[nombre] = [w, h]
        for ancho in ANCHOS:
            if ancho > w:
                # Reescalado HD: Lanczos en dos pasos + enfoque y micro-contraste muy suaves
                mid = src.resize((int(w * 1.25), int(h * 1.25)), Image.LANCZOS)
                im = mid.resize((ancho, round(h * ancho / w)), Image.LANCZOS)
                im = im.filter(ImageFilter.UnsharpMask(radius=1.6, percent=55, threshold=2))
                im = ImageEnhance.Contrast(im).enhance(1.02)
            elif ancho == w:
                im = src.copy()
            else:
                im = src.resize((ancho, round(h * ancho / w)), Image.LANCZOS)
                im = im.filter(ImageFilter.UnsharpMask(radius=0.8, percent=40, threshold=2))
            save_webp(im, dst / f"{nombre}-{ancho}.webp", 80 if ancho >= 1600 else 82)
        print("foto", nombre, w, "x", h)
    (dst / "dims.json").write_text(json.dumps(dims, indent=1), encoding="utf-8")


def label(mask: np.ndarray) -> tuple[list[tuple[int, int, int, int, int, int]], np.ndarray]:
    """Componentes conexas (4-vecinos). Devuelve [(x0, y0, x1, y1, área, id)] y el mapa de etiquetas."""
    h, w = mask.shape
    seen = np.zeros_like(mask, dtype=bool)
    labels = np.zeros(mask.shape, dtype=np.int32)
    comps = []
    for y in range(h):
        for x in range(w):
            if not mask[y, x] or seen[y, x]:
                continue
            q = deque([(y, x)])
            seen[y, x] = True
            lid = len(comps) + 1
            x0 = x1 = x
            y0 = y1 = y
            area = 0
            while q:
                cy, cx = q.popleft()
                labels[cy, cx] = lid
                area += 1
                x0, x1, y0, y1 = min(x0, cx), max(x1, cx), min(y0, cy), max(y1, cy)
                for ny, nx in ((cy + 1, cx), (cy - 1, cx), (cy, cx + 1), (cy, cx - 1)):
                    if 0 <= ny < h and 0 <= nx < w and mask[ny, nx] and not seen[ny, nx]:
                        seen[ny, nx] = True
                        q.append((ny, nx))
            comps.append((x0, y0, x1, y1, area, lid))
    return comps, labels


def adornos() -> None:
    sheet = Image.open(ROOT / "Motivos dorados para estudio de yoga-5.png").convert("RGBA")
    W, H = sheet.size
    k = 4
    small = sheet.split()[3].resize((W // k, H // k), Image.BOX)
    # Dilatación para unir piezas sueltas (estrellas de la luna, puntos del arco)
    small = small.point(lambda v: 255 if v > 24 else 0).filter(ImageFilter.MaxFilter(9))
    mask = np.array(small) > 0
    comps, labels = label(mask)
    comps = [c for c in comps if c[4] > 150]
    dst = OUT / "adornos"
    dst.mkdir(parents=True, exist_ok=True)
    usados = set()
    for x0, y0, x1, y1, area, lid in sorted(comps, key=lambda c: -c[4]):
        cx, cy = (x0 + x1) / 2 * k, (y0 + y1) / 2 * k
        col, row = min(3, int(cx / (W / 4))), min(2, int(cy / (H / 3)))
        nombre = ADORNOS[row][col]
        if nombre in usados:
            continue
        usados.add(nombre)
        pad = 6
        box = (max(0, x0 * k - pad), max(0, y0 * k - pad), min(W, (x1 + 1) * k + pad), min(H, (y1 + 1) * k + pad))
        im = sheet.crop(box)
        # Solo los píxeles de este componente (los vecinos de la lámina se descartan)
        own = Image.fromarray(((labels == lid) * 255).astype(np.uint8)).resize((W // k * k, H // k * k), Image.NEAREST)
        own = own.filter(ImageFilter.MaxFilter(5)).crop(box)
        # Limpia el halo casi invisible para que no deje velos
        r, g, b, a = im.split()
        a = a.point(lambda v: 0 if v < 6 else v)
        a = Image.fromarray(np.minimum(np.array(a), np.array(own)))
        im = Image.merge("RGBA", (r, g, b, a))
        im = im.crop(im.getbbox())
        piezas = {nombre: im}
        if nombre == "arco" and im.size[1] > im.size[0] * 1.2:
            # La luna y el arco de puntos quedan unidos por una hilera de puntos: se cortan por el hueco
            perfil = np.array(im.split()[3]).sum(axis=1)
            h = len(perfil)
            corte = int(h * 0.42) + int(np.argmin(perfil[int(h * 0.42):int(h * 0.62)]))
            luna = im.crop((0, 0, im.size[0], corte))
            arco = im.crop((0, corte, im.size[0], h))
            piezas = {"luna": luna.crop(luna.getbbox()), "arco": arco.crop(arco.getbbox())}
            usados.add("luna")
        for n, pieza in piezas.items():
            save_webp(pieza, dst / f"{n}.webp", 88)
            pieza.save(dst / f"{n}.png", optimize=True)
            print("adorno", n, pieza.size)
    faltan = {n for fila in ADORNOS for n in fila} - usados
    if faltan:
        print("AVISO: no se encontraron", faltan)


def marca() -> None:
    logo = Image.open(ROOT / "Logotipo de escuela de yoga.png").convert("RGB")
    W, H = logo.size
    dst = OUT / "marca"
    dst.mkdir(parents=True, exist_ok=True)
    # Disco del letrero: centro y radio medidos sobre el original (1254 x 1254)
    cx, cy, r = 613, 623, 548
    # Sello con halo: el muro se funde a transparente
    R = min(int(r * 1.12), cx - 1, cy - 1, W - cx - 1, H - cy - 1)
    crop = logo.crop((cx - R, cy - R, cx + R, cy + R)).convert("RGBA")
    size = crop.size[0]
    yy, xx = np.mgrid[0:size, 0:size]
    d = np.sqrt((xx - size / 2) ** 2 + (yy - size / 2) ** 2)
    alpha = np.clip((R - d) / (R - r) , 0, 1) ** 1.6
    alpha[d <= r] = 1
    crop.putalpha(Image.fromarray((alpha * 255).astype(np.uint8)))
    for s in (720, 360, 180):
        save_webp(crop.resize((s, s), Image.LANCZOS), dst / f"sello-{s}.webp", 90)
    crop.resize((360, 360), Image.LANCZOS).save(dst / "sello-360.png", optimize=True)
    # Disco limpio (sin halo) para favicon
    disc = logo.crop((cx - r, cy - r, cx + r, cy + r)).convert("RGBA")
    m = Image.new("L", disc.size, 0)
    ImageDraw.Draw(m).ellipse((2, 2, disc.size[0] - 2, disc.size[1] - 2), fill=255)
    disc.putalpha(m)
    disc.resize((48, 48), Image.LANCZOS).save(dst / "favicon-48.png")
    disc.resize((180, 180), Image.LANCZOS).save(dst / "apple-touch-icon.png")
    disc.resize((512, 512), Image.LANCZOS).save(dst / "icon-512.png")
    # Letrero completo (foto del muro) para la sección de la escuela
    for s in (1200, 700):
        save_webp(logo.resize((s, s), Image.LANCZOS), dst / f"letrero-{s}.webp", 84)
    # Imagen para compartir (1200 x 630)
    base = Image.open(ROOT / FOTOS["sala-ambar"]).convert("RGB")
    bw, bh = base.size
    t = 630 / 1200
    ch = int(bw * t)
    base = base.crop((0, (bh - ch) // 2, bw, (bh - ch) // 2 + ch)).resize((1200, 630), Image.LANCZOS)
    base = ImageEnhance.Brightness(base).enhance(0.55)
    sello = crop.resize((440, 440), Image.LANCZOS)
    base.paste(sello, (380, 95), sello)
    base.save(OUT / "og-escuela.jpg", quality=86)
    print("marca lista")


if __name__ == "__main__":
    adornos()
    marca()
    fotos()
