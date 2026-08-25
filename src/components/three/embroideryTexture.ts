import * as THREE from "three";

/**
 * Procedurally paints a cross-stitch-style Serbian embroidery pattern
 * (border vines + a central cross motif) onto a canvas, used as the
 * Peškir's diffuse texture. Avoids needing an external image asset.
 */
export function createEmbroideryTexture() {
  const size = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#f7f1e6";
  ctx.fillRect(0, 0, size, size);

  // subtle linen weave
  ctx.strokeStyle = "rgba(0,0,0,0.03)";
  ctx.lineWidth = 1;
  for (let i = 0; i < size; i += 4) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, size);
    ctx.stroke();
  }

  const gold = "#b8862f";
  const wine = "#6b1b2b";
  const margin = size * 0.09;
  const step = size * 0.055;

  function zigzagBorder(inset: number, color: string, width: number) {
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    for (let x = inset; x <= size - inset; x += step) {
      const y1 = inset;
      const y2 = inset + step * 0.6;
      ctx.moveTo(x, y1);
      ctx.lineTo(x + step / 2, y2);
      ctx.lineTo(x + step, y1);
    }
    ctx.stroke();

    ctx.beginPath();
    for (let x = inset; x <= size - inset; x += step) {
      const y1 = size - inset;
      const y2 = size - inset - step * 0.6;
      ctx.moveTo(x, y1);
      ctx.lineTo(x + step / 2, y2);
      ctx.lineTo(x + step, y1);
    }
    ctx.stroke();
  }

  zigzagBorder(margin, gold, 4);
  zigzagBorder(margin + step * 0.75, wine, 3);

  // small cross motifs along the vertical borders
  function drawCross(cx: number, cy: number, s: number, color: string) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx - s, cy);
    ctx.lineTo(cx + s, cy);
    ctx.moveTo(cx, cy - s);
    ctx.lineTo(cx, cy + s);
    ctx.stroke();
  }

  for (let y = margin + step; y <= size - margin - step; y += step * 1.4) {
    drawCross(margin * 0.6, y, step * 0.28, wine);
    drawCross(size - margin * 0.6, y, step * 0.28, wine);
  }

  // central medallion: cross inside a diamond of dots
  const cx = size / 2;
  const cy = size / 2;
  ctx.strokeStyle = gold;
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(cx, cy - 70);
  ctx.lineTo(cx, cy + 70);
  ctx.moveTo(cx - 46, cy - 24);
  ctx.lineTo(cx + 46, cy - 24);
  ctx.stroke();

  ctx.fillStyle = wine;
  const dotRadius = 5;
  const ringRadius = 110;
  const dots = 20;
  for (let i = 0; i < dots; i++) {
    const angle = (i / dots) * Math.PI * 2;
    const dx = cx + Math.cos(angle) * ringRadius;
    const dy = cy + Math.sin(angle) * ringRadius;
    ctx.beginPath();
    ctx.arc(dx, dy, dotRadius, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}
