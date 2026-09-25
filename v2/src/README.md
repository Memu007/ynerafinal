# Escena 3D del árbol

`tree.src.js` es la fuente de la escena (three.js). Se compila a `v2/tree.js`:

```sh
npm i three@0.169.0 lenis@1.1.20 esbuild@0.24.0
npx esbuild v2/src/tree.src.js --bundle --minify --format=iife --target=es2019 --outfile=v2/tree.js
```
