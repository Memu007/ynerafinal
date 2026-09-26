import sys, os
from fontTools.fontBuilder import FontBuilder
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.pens.cu2quPen import Cu2QuPen
from fontTools.feaLib.builder import addOpenTypeFeaturesFromString
import glyphs as GL
def build(out, style="Bold", wght=700, fea=None):
    order=['.notdef']+list(GL.G.keys()); cmap={}; gl={}; adv={}
    for n,(fn,a,uni) in GL.G.items():
        pen=TTGlyphPen(None); path=fn()
        if path is not None:
            path.simplify(fix_winding=True,keep_starting_points=False); path.draw(Cu2QuPen(pen,0.8,reverse_direction=True))
        gl[n]=pen.glyph(); adv[n]=int(round(a))
        if uni: cmap[uni]=n
    pen=TTGlyphPen(None); gl['.notdef']=pen.glyph(); adv['.notdef']=500
    fb=FontBuilder(GL.UPM,isTTF=True); fb.setupGlyphOrder(order); fb.setupCharacterMap(cmap); fb.setupGlyf(gl)
    met={}
    for n in order:
        g=fb.font['glyf'][n]; g.recalcBounds(fb.font['glyf']); met[n]=(adv[n],getattr(g,'xMin',0))
    fb.setupHorizontalMetrics(met); fb.setupHorizontalHeader(ascent=920,descent=-250)
    fam="Ynera Furca"
    fb.setupNameTable({"familyName":fam,"styleName":style,"uniqueFontIdentifier":f"{fam} {style}; 1.0","fullName":f"{fam} {style}","psName":f"YneraFurca-{style}","version":"Version 1.000","copyright":"Copyright 2026 Ynera. Diseño original.","description":"Ynera Furca: tipografía display de Ynera. Base recta, brote redondo, bifurcación."})
    fb.setupOS2(sTypoAscender=920,sTypoDescender=-250,sTypoLineGap=0,usWinAscent=980,usWinDescent=300,sxHeight=GL.X,sCapHeight=GL.C,usWeightClass=wght,fsSelection=0x40,achVendID="YNRA")
    fb.setupPost()
    if fea: addOpenTypeFeaturesFromString(fb.font,fea)
    fb.save(out); print('ok',out,len(order))
if __name__=='__main__':
    fea=open('kern.fea').read() if os.path.exists('kern.fea') else None
    build(sys.argv[1] if len(sys.argv)>1 else 'Furca.ttf',fea=fea)
