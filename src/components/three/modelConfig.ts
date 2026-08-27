import { publicPath } from "@/lib/publicPath";

/**
 * Swap point for real 3D assets.
 *
 * Right now every scene (`CandleScene`, `PeskirScene`, `ProductPlatform`)
 * renders a hand-tuned procedural fallback built from primitives + shaders,
 * so the site works with zero external assets.
 *
 * Once a 3D artist delivers real, optimised (Draco-compressed) .glb files:
 *  1. Drop them in `public/models/` (see public/models/README.md).
 *  2. Set the matching flag below to `true`.
 *  3. Each scene component already branches on these flags and calls
 *     `useGLTF(MODEL_PATHS.xxx)` instead of the procedural group — search
 *     for `USE_GLTF_MODELS` in CandleScene.tsx / PeskirScene.tsx / ProductPlatform.tsx.
 */
export const USE_GLTF_MODELS = {
  candle: false,
  peskir: false,
  products: false,
} as const;

export const MODEL_PATHS = {
  candle: publicPath("/models/baptism-candle.glb"),
  peskir: publicPath("/models/peskir.glb"),
  products: {
    baptismCandles: publicPath("/models/product-baptism-candles.glb"),
    weddingCandles: publicPath("/models/product-wedding-candles.glb"),
    weddingTowels: publicPath("/models/product-wedding-towels.glb"),
    baptismAccessories: publicPath("/models/product-baptism-accessories.glb"),
    slavaDecor: publicPath("/models/product-slava-decor.glb"),
    giftware: publicPath("/models/product-giftware.glb"),
  },
} as const;
