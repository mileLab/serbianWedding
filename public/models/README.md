# 3D-Modelle einbinden

Aktuell laufen alle 3D-Szenen mit sauber gebauten, prozeduralen Platzhalter-Geometrien
(reines Three.js/React-Three-Fiber-Code, keine externen Dateien nötig).

Sobald echte, von einem 3D-Artist erstellte Modelle vorliegen:

1. Exportiere als `.glb` (binäres glTF), mit Draco-Kompression für kleine Dateigrößen.
2. Lege die Dateien hier ab, z. B. `peskir.glb`, `product-baptism-candles.glb`,
   usw. (siehe `src/components/three/modelConfig.ts` für die erwarteten
   Dateinamen).
3. Setze in `src/components/three/modelConfig.ts` das jeweilige Flag in
   `USE_GLTF_MODELS` auf `true`.
4. Starte den Dev-Server neu — die Szene lädt automatisch das echte Modell
   über `useGLTF` (inkl. Suspense-Ladezustand), die prozedurale Geometrie
   bleibt als Fallback im Code erhalten.

Der Hero-Bereich nutzt keine Three.js-Kerzenszene mehr — dort läuft
stattdessen ein scroll-synchronisiertes Video (`public/videos/cross.mp4`,
siehe `Hero.tsx`).
