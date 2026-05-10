"""Convert 1_upscaled.gif / 2_upscaled.gif to high-quality animated WebP + APNG.

GIF caps at 256 colors and 1-bit alpha — that's why the palette output looked
banded with jagged edges. WebP/APNG keep full RGBA per frame.
"""
from pathlib import Path
from PIL import Image, ImageSequence

ASSETS = Path(__file__).resolve().parent.parent / "assets"


def convert(src: Path) -> None:
    im = Image.open(src)
    frames, durations = [], []
    for frame in ImageSequence.Iterator(im):
        frames.append(frame.convert("RGBA").copy())
        durations.append(frame.info.get("duration", 100))
    loop = im.info.get("loop", 0)

    webp = ASSETS / f"{src.stem}.webp"
    frames[0].save(
        webp,
        save_all=True,
        append_images=frames[1:],
        duration=durations,
        loop=loop,
        lossless=False,
        quality=95,
        method=4,
    )

    apng = ASSETS / f"{src.stem}.png"
    frames[0].save(
        apng,
        save_all=True,
        append_images=frames[1:],
        duration=durations,
        loop=loop,
        disposal=2,
    )

    print(f"{src.name}: {im.size}, {len(frames)} frames")
    print(f"  -> {webp.name}  {webp.stat().st_size/1024:.0f} KB")
    print(f"  -> {apng.name}  {apng.stat().st_size/1024:.0f} KB")


if __name__ == "__main__":
    for name in ("1_upscaled.gif", "2_upscaled.gif"):
        convert(ASSETS / name)
