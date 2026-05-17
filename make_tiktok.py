"""
Genera el vídeo TikTok promo de Alex Rubio.
Secuencia:
  1. highlight3_cut.mp4
  2. highlight5_cut.mp4
  3. (fade negro) → inicio.png  [2.5s]
  4. → pc.png  [zoom in] ─── crossfade ─── tablet.png  [zoom in] ─── crossfade ─── movil.png  [zoom in]
  7. (fade negro) → fin.png  [3.5s]
Audio: sonido.mp3 a partir del segundo 12.
"""

import numpy as np
from PIL import Image as PILImage
import os

PUB = r"c:\Users\dmp20\Alex Rubio\public"
OUT = r"c:\Users\dmp20\Alex Rubio\public\tiktok_promo.mp4"
W, H = 1080, 1920
FPS = 30
FADE  = 0.35   # fade a/desde negro
XFADE = 0.55   # crossfade entre dispositivos

# ─── Utilidades de imagen/vídeo ───────────────────────────────────────────────

def fit(path):
    img = PILImage.open(path).convert("RGB")
    iw, ih = img.size
    scale = max(W / iw, H / ih)
    nw, nh = int(iw * scale), int(ih * scale)
    img = img.resize((nw, nh), PILImage.LANCZOS)
    x, y = (nw - W) // 2, (nh - H) // 2
    return img.crop((x, y, x + W, y + H))

def img_clip(name, duration):
    from moviepy import ImageClip
    arr = np.array(fit(os.path.join(PUB, name)))
    return ImageClip(arr).with_duration(duration).with_fps(FPS)

def video_clip(name):
    from moviepy import VideoFileClip
    clip = VideoFileClip(os.path.join(PUB, name))
    cw, ch = clip.size
    if cw / ch > W / H:
        nw = int(ch * W / H)
        x1 = (cw - nw) // 2
        clip = clip.cropped(x1=x1, y1=0, x2=x1 + nw, y2=ch)
    else:
        nh = int(cw * H / W)
        y1 = (ch - nh) // 2
        clip = clip.cropped(x1=0, y1=y1, x2=cw, y2=y1 + nh)
    return clip.resized((W, H)).with_fps(FPS)

def zoom_clip(name, duration, zoom_to=1.55):
    """Zoom in ease-in-out cúbico desde 1× hasta zoom_to×."""
    big = fit(os.path.join(PUB, name)).resize(
        (int(W * zoom_to), int(H * zoom_to)), PILImage.LANCZOS
    )
    arr = np.array(big)
    bw, bh = big.size

    def make_frame(t):
        p = t / duration
        p = p * p * (3 - 2 * p)           # ease-in-out cúbico
        scale = 1.0 + (zoom_to - 1.0) * p
        cw = int(W * zoom_to / scale)
        ch = int(H * zoom_to / scale)
        x = max(0, (bw - cw) // 2)
        y = max(0, (bh - ch) // 2)
        cw, ch = min(cw, bw - x), min(ch, bh - y)
        cropped = arr[y : y + ch, x : x + cw]
        return np.array(PILImage.fromarray(cropped).resize((W, H), PILImage.LANCZOS))

    from moviepy import VideoClip
    return VideoClip(make_frame, duration=duration).with_fps(FPS)

def fade(clip, fadein=0.0, fadeout=0.0):
    from moviepy.video.fx import FadeIn, FadeOut
    effects = []
    if fadein  > 0: effects.append(FadeIn(fadein))
    if fadeout > 0: effects.append(FadeOut(fadeout))
    return clip.with_effects(effects) if effects else clip

# ─── Crossfade real entre clips ───────────────────────────────────────────────

def crossfade_seq(clips, xfade):
    """
    Concatena clips con crossfade real (mezcla de píxeles) entre ellos.
    Cada transición dura `xfade` segundos.
    """
    from moviepy import VideoClip, concatenate_videoclips

    parts = []
    n = len(clips)

    for i, c in enumerate(clips):
        is_first = (i == 0)
        is_last  = (i == n - 1)

        # Segmento central del clip (sin los extremos de crossfade)
        seg_start = 0      if is_first else xfade
        seg_end   = c.duration if is_last  else c.duration - xfade
        if seg_end > seg_start:
            parts.append(c.subclipped(seg_start, seg_end))

        # Transición hacia el siguiente clip
        if not is_last:
            c1, c2 = c, clips[i + 1]

            def make_trans(c1=c1, c2=c2):
                def frame(t):
                    alpha = t / xfade
                    f1 = c1.get_frame(c1.duration - xfade + t)
                    f2 = c2.get_frame(t)
                    return (f1 * (1 - alpha) + f2 * alpha).astype(np.uint8)
                return VideoClip(frame, duration=xfade).with_fps(FPS)

            parts.append(make_trans())

    return concatenate_videoclips(parts, method="compose")

# ─── Construcción del vídeo ───────────────────────────────────────────────────

print("Cargando clips...")

h3     = fade(video_clip("highlight3_cut.mp4"), fadeout=FADE)
h5     = fade(video_clip("highlight5_cut.mp4"), fadein=FADE, fadeout=FADE)
inicio = fade(img_clip("inicio.png", 2.5),      fadein=FADE, fadeout=FADE)

pc_raw     = zoom_clip("pc.png",     3.5)
tablet_raw = zoom_clip("tablet.png", 3.5)
movil_raw  = fade(zoom_clip("movil.png", 3.5), fadeout=FADE)

devices = crossfade_seq([pc_raw, tablet_raw, movil_raw], XFADE)
fin     = fade(img_clip("fin.png", 3.5), fadein=FADE)

from moviepy import concatenate_videoclips

print("Concatenando...")
final_vid = concatenate_videoclips([h3, h5, inicio, devices, fin], method="compose")
print(f"Duración total: {final_vid.duration:.1f}s  ({W}x{H} @ {FPS}fps)")

# ─── Audio ────────────────────────────────────────────────────────────────────

audio_path = os.path.join(PUB, "sonido.mp3")
if os.path.exists(audio_path):
    from moviepy import AudioFileClip, CompositeAudioClip

    music = AudioFileClip(audio_path)
    music_dur = min(music.duration, final_vid.duration)
    music = music.subclipped(0, music_dur)

    if final_vid.audio is not None:
        mixed = CompositeAudioClip([final_vid.audio, music])
    else:
        mixed = music

    final_vid = final_vid.with_audio(mixed)
    print(f"Audio: sonido.mp3 desde t=0s ({music_dur:.1f}s)")
else:
    print("AVISO: no se encontró sonido.mp3 en public/")

# ─── Exportar ─────────────────────────────────────────────────────────────────

print("Exportando...")
final_vid.write_videofile(
    OUT,
    fps=FPS,
    codec="libx264",
    audio_codec="aac",
    preset="fast",
    logger="bar",
)
print(f"\n✓ Guardado en: {OUT}")
