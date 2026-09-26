# Ynera Furca — fuente editable

Display propia de Ynera, construida por código a partir de las reglas del símbolo (ver `brand/CODIGO-DE-MARCA.md` §5).

- `geo.py`: primitivas (rectángulos, anillos superelípticos, trazos con contraste óptico).
- `glyphs.py`: un bloque por glifo. Parámetros al principio (trazo `W`, contraste `FH`, espaciado `SP`, remate `TIP`).
- `kern.fea`: pares de kerning.
- `build.py`: compila el TTF.

```bash
pip install fonttools skia-pathops skia-python brotli
cd v2/src/tipografia && python3 build.py YneraFurca-Bold.ttf
# subset + woff2 al sitio
python3 -c "from fontTools.ttLib import TTFont;from fontTools import subset;f=TTFont('YneraFurca-Bold.ttf');o=subset.Options();o.flavor='woff2';o.layout_features=['kern'];o.name_IDs=['*'];o.notdef_outline=True;s=subset.Subsetter(o);s.populate(unicodes=list(range(0x20,0x7F))+list(range(0xA0,0x180))+[0x2013,0x2014,0x2018,0x2019,0x201C,0x201D,0x2192]);s.subset(f);f.flavor='woff2';f.save('../../fonts/ynera-furca-bold.woff2')"
```
