# Ynera Furca — tipografía display de Ynera.
# Reglas (derivadas del símbolo): trazo casi monolineal; toda base se corta recta (raíz);
# en minúsculas, cada trazo que crece hacia arriba termina en brote redondo; donde una rama
# nace del tronco hay una bifurcación (muesca en V). Las mayúsculas son el tronco: sobrias, rectas.
# La Y es el símbolo.
import math
from geo import *
from fontTools.misc.transform import Transform
from fontTools.pens.transformPen import TransformPen
def rot(p,adv,h):
    q=P(); p.draw(TransformPen(q.getPen(),Transform(-1,0,0,-1,adv,h))); return q
UPM=1000; X=520; C=700; ASC=750; DSC=-200; O=12
import os
W=int(os.environ.get('FW','132')); H=int(W*float(os.environ.get('FH','0.78'))); SW=int(W*0.97)
TIP=os.environ.get('TIP','bevel')   # round | bevel | flat
NW=0.40; ND=0.80
SP=float(os.environ.get('SP','0.86'))
SB=int(46*SP); SBR=int(32*SP)
G={}

def g(name,uni,adv):
    def deco(fn): G[name]=[fn,adv,uni]; return fn
    return deco
def stem(x,y0,y1,top='r'):
    if top!='r' or TIP=='flat': return rect(x,y0,x+W,y1)
    if TIP=='bevel':
        cut=W*0.42   # corte de poda: más alto a la izquierda
        return poly([(x,y0),(x,y1),(x+W,y1-cut),(x+W,y0)])
    b=y1-W/2; return U(rect(x,y0,x+W,b),circ(x+W/2,y1-W/2,W/2))
def fork(x,y,down=False,side=1):
    w=W*NW*side; d=W*ND
    return poly([(x,y-90),(x,y+d),(x+w,y-90)]) if down else poly([(x,y+90),(x,y-d),(x+w,y+90)])
def arch(x0,x1,ytop):
    rx=(x1-x0)/2; ry=min(rx*1.0,ytop*0.6); cy=ytop-ry
    return I(ring(x0,cy-ry,x1,ytop,W,H),band(cy,ytop+10)),cy
def bowl(x0,x1,y0=-O,y1=X+O,ws=None): return ring(x0,y0,x1,y1,ws or W*0.96,H)
def dbowl(xs,y0,y1,xr,rxk=1.0):
    ry=(y1-y0)/2; rx=min(ry*rxk,xr-xs-W); cx=xr-rx
    r=I(ring(cx-rx,y0,xr,y1,W,H),band(x0=cx))
    return U(r,rect(xs,y0,cx+1,y0+H),rect(xs,y1-H,cx+1,y1))
def acute(cx,y): return seg((cx-44,y),(cx+46,y+150),W*0.72)
def dier(cx,y): return U(circ(cx-110,y+60,W*0.5),circ(cx+110,y+60,W*0.5))
def tilde(cx,y):
    l=Line(cx-150,y+30).C(cx-110,y+110,cx-60,y+110,cx,y+70).C(cx+60,y+30,cx+110,y+30,cx+150,y+110)
    return l.stroke(W*0.62)
def idot(cx): return circ(cx,ASC-W*0.6,W*0.6)

# ---------------- minúsculas ----------------
@g('l',ord('l'),W+2*SB)
def _(): return stem(SB,0,ASC)
@g('i',ord('i'),W+2*SB)
def _(): return U(stem(SB,0,X+O),idot(SB+W/2))
@g('dotlessi',0x131,W+2*SB)
def _(): return stem(SB,0,X+O)
@g('j',ord('j'),W+2*SB-10)
def _():
    x=SB-10; r=150
    hook=I(ring(x+W-2*r,DSC,x+W,DSC+2*r,W,H),U(band(DSC-20,DSC+r,x+W-r-60,x+W+10)))
    return U(stem(x,DSC+r-1,X+O),hook,idot(x+W/2))
def n_like(adv,top):
    x1=adv-SB; a,cy=arch(SB,x1,X+O)
    return D(U(stem(SB,0,top),a,rect(x1-W,0,x1,cy+2)),fork(SB+W,X+O))
@g('n',ord('n'),548)
def _(): return n_like(548,X+O)
@g('h',ord('h'),548)
def _(): return n_like(548,ASC)
@g('m',ord('m'),836)
def _():
    adv=836; x1=adv-SB; mid=(SB+x1)/2
    a1,cy=arch(SB,mid+W/2,X+O); a2,_=arch(mid-W/2,x1,X+O)
    p=U(stem(SB,0,X+O),a1,a2,rect(mid-W/2,0,mid+W/2,cy+2),rect(x1-W,0,x1,cy+2))
    return D(p,fork(SB+W,X+O),fork(mid+W/2,X+O))
@g('u',ord('u'),548)
def _():
    adv=548; x1=adv-SB; rx=(x1-SB)/2; ry=min(rx,(X+O)*0.6); cy=-O+ry
    b=I(ring(SB,-O,x1,cy+ry,W,H),band(-O-10,cy))
    p=U(stem(x1-W,0,X+O),stem(SB,cy-2,X+O),b)
    return D(p,fork(x1-W,-O,down=True,side=-1))
@g('o',ord('o'),556)
def _(): return bowl(SBR,556-SBR)
@g('c',ord('c'),508)
def _():
    x0,x1=SBR,508-SBR+26; cy=X/2; ry=X/2+O
    return D(bowl(x0,x1),rect((x0+x1)/2+W*0.25,cy-ry*0.30,x1+30,cy+ry*0.34))
@g('e',ord('e'),540)
def _():
    x0,x1=SBR,540-SBR; cy=X/2; ry=X/2+O; yb=cy-H/2+22
    r=D(bowl(x0,x1),rect((x0+x1)/2+W*0.25,cy-ry*0.34,x1+30,yb))
    return U(r,I(rect(x0+10,yb,x1,yb+H),ell((x0+x1)/2,cy,(x1-x0)/2-2,ry)))
def bowl_stem(right,top,bot,adv):
    if right:
        x0,x1=SBR,adv-SB; sx=x1-W
        return D(U(bowl(x0,x1-W*0.3),stem(sx,bot,top)),fork(sx,X+O,side=-1))
    x0,x1=SB,adv-SBR
    return D(U(bowl(x0+W*0.3,x1),stem(x0,bot,top)),fork(x0+W,X+O))
@g('a',ord('a'),572)
def _(): return bowl_stem(True,X+O,0,572)
@g('d',ord('d'),572)
def _(): return bowl_stem(True,ASC,0,572)
@g('b',ord('b'),572)
def _(): return bowl_stem(False,ASC,0,572)
@g('p',ord('p'),572)
def _(): return bowl_stem(False,X+O,DSC,572)
@g('q',ord('q'),572)
def _(): return bowl_stem(True,X+O,DSC,572)
@g('g',ord('g'),572)
def _():
    adv=572; x0,x1=SBR,adv-SB; sx=x1-W; hr=170
    hook=I(ring(x0+14,DSC-O,x1,DSC-O+2*hr,W,H),band(DSC-O-10,DSC-O+hr,x0+70))
    p=U(bowl(x0,x1-W*0.3),stem(sx,DSC-O+hr-2,X+O),hook)
    return D(p,fork(sx,X+O,side=-1))
@g('r',ord('r'),368)
def _():
    a,cy=arch(SB,SB+2*172,X+O); a=I(a,band(x1=SB+2*172-48))
    return D(U(stem(SB,0,X+O),a),fork(SB+W,X+O))
@g('f',ord('f'),318)
def _():
    xs=SB+6; r=170
    hook=I(ring(xs,ASC-2*r,xs+2*r,ASC,W,H),band(ASC-r,ASC+20,xs-10,xs+r+64))
    return U(rect(xs,0,xs+W,ASC-r+2),hook,rect(xs-40,X-H,xs+W+132,X))
@g('t',ord('t'),330)
def _():
    xs=SB+40
    return U(stem(xs,0,X+170),rect(xs-70,X-H,xs+W+120,X))
@g('s',ord('s'),480)
def _():
    w=SW; x0,x1=SBR+w/2,480-SBR-w/2; yt=X+O-w/2; yb=-O+w/2; ym=(yt+yb)/2+8
    rt=(x1-x0)/2-6; rb=(x1-x0)/2; cx=(x0+x1)/2
    l=Line(cx+rt*math.cos(math.radians(22)),(yt+ym)/2+(yt-ym)/2*math.sin(math.radians(22)))
    l.A(cx,(yt+ym)/2,rt,(yt-ym)/2,22,270).A(cx,(ym+yb)/2,rb,(ym-yb)/2,90,-200)
    return l.stroke(w)
def vpair(xl,xr,xb,ybot,ytop,w):
    return U(dstroke((xb,ybot),(xl,ytop-w/2),w,ylo=ybot,tip=True),dstroke((xb,ybot),(xr,ytop-w/2),w,ylo=ybot,tip=True))
@g('v',ord('v'),520)
def _(): return vpair(SB-8+W/2,520-SB+8-W/2,260,0,X,W*0.94)
@g('w',ord('w'),780)
def _():
    w=W*0.9; a=SB-12+w/2; b=780-SB+12-w/2; m=390
    return U(vpair(a,m,(a+m)/2,0,X,w),vpair(m,b,(m+b)/2,0,X,w))
@g('x',ord('x'),520)
def _():
    w=W*0.94; a=SB-6+w/2; b=520-SB+6-w/2
    return U(dstroke((a,0),(b,X-w/2),w,ylo=0,tip=True),dstroke((b,0),(a,X-w/2),w,ylo=0,tip=True))
@g('y',ord('y'),524)
def _():
    w=W*0.94; a=SB-8+w/2; b=524-SB+8-w/2; jx=262
    right=dstroke((jx-(b-jx)*0.42,DSC),(b,X-w/2),w,ylo=DSC,tip=TIP=='round')
    if TIP!='round':
        right=U(I(seg((jx-(b-jx)*0.42,DSC),(b,X-w*0.1),w,400,0),band(DSC,2000)))
        return U(right,seg((jx,0),(a,X-w*0.1),w))
    return U(right,dstroke((jx,0),(a,X-w/2),w,tip=True))
@g('z',ord('z'),480)
def _():
    x0,x1=SB-6,480-SB+6
    return U(rect(x0,X-H,x1,X),rect(x0,0,x1,H),I(seg((x0+W*0.35,H/2),(x1-W*0.35,X-H/2),W*0.98,200,200),band(0,X)))
@g('k',ord('k'),536)
def _():
    x1=536-SB+6; w=W*0.94; jy=X*0.40
    arm=dstroke((SB+W*0.5,jy-20),(x1-w/2,X-w/2),w,tip=True)
    t=0.42; px=SB+W*0.5+(x1-w/2-SB-W*0.5)*t; py=jy-20+(X-w/2-jy+20)*t
    leg=dstroke((px,py),(x1-w*0.4,0),w,ylo=0)
    return U(stem(SB,0,ASC),arm,leg)
# ---------------- mayúsculas: el tronco ----------------
def st(x,y0=0,y1=C): return rect(x,y0,x+W,y1)
@g('A',ord('A'),676)
def _():
    adv=676; cx=adv/2; w=W*0.98; xl=SB-14+w*0.55; xr=adv-SB+14-w*0.55
    p=U(dstroke((xl,0),(cx,C-10),w,ylo=0,yhi=C),dstroke((xr,0),(cx,C-10),w,ylo=0,yhi=C))
    yb=190; return U(p,I(rect(0,yb,adv,yb+H),poly([(xl,0),(cx,C),(xr,0)])))
@g('B',ord('B'),628)
def _():
    x1=628-SB; ym=C*0.53
    return U(st(SB),dbowl(SB,0,ym+H/2,x1),dbowl(SB,ym-H/2,C,x1-34))
@g('C',ord('C'),662)
def _():
    x0,x1=SBR,662-SBR+24; cy=C/2; ry=C/2+O
    return D(ring(x0,-O,x1,C+O,W*1.02,H),rect((x0+x1)/2+W*0.2,cy-ry*0.26,x1+30,cy+ry*0.28))
@g('D',ord('D'),676)
def _(): return U(st(SB),dbowl(SB,0,C,676-SBR,0.92))
@g('E',ord('E'),566)
def _():
    x1=566-SB; return U(st(SB),rect(SB,C-H,x1,C),rect(SB,C/2-H/2+6,x1-30,C/2+H/2+6),rect(SB,0,x1,H))
@g('F',ord('F'),548)
def _():
    x1=548-SB; return U(st(SB),rect(SB,C-H,x1,C),rect(SB,C/2-H/2-10,x1-30,C/2+H/2-10))
@g('G',ord('G'),690)
def _():
    x0,x1=SBR,690-SB; cy=C/2; ry=C/2+O; yt=cy+18
    r=D(ring(x0,-O,x1,C+O,W*1.02,H),rect((x0+x1)/2+W*0.2,yt,x1+30,cy+ry*0.28))
    return U(r,rect((x0+x1)/2+30,yt-H,x1,yt),rect(x1-W,cy-ry*0.5,x1,yt))
@g('H',ord('H'),690)
def _():
    x1=690-SB; return U(st(SB),st(x1-W),rect(SB,C/2-H/2,x1,C/2+H/2))
@g('I',ord('I'),W+2*SB)
def _(): return st(SB)
@g('J',ord('J'),520)
def _():
    x1=520-SB; r=(x1-SBR)/2
    return U(rect(x1-W,r,x1,C),I(ring(SBR,-O,x1,-O+2*r,W,H),band(-O-10,r+1)),)
@g('K',ord('K'),640)
def _():
    x1=640-SB+10; w=W*0.98; jy=C*0.34
    arm=dstroke((SB+W*0.5,jy),(x1-w*0.5,C),w,yhi=C)
    t=0.44; px=SB+W*0.5+(x1-w*0.5-SB-W*0.5)*t; py=jy+(C-jy)*t
    return U(st(SB),arm,dstroke((px,py),(x1-w*0.45,0),w,ylo=0))
@g('L',ord('L'),532)
def _(): return U(st(SB),rect(SB,0,532-SB,H))
@g('M',ord('M'),832)
def _():
    adv=832; x1=adv-SB; cx=adv/2; w=W*0.92
    d1=dstroke((cx,0),(SB+W*0.5,C),w,ylo=0,yhi=C); d2=dstroke((cx,0),(x1-W*0.5,C),w,ylo=0,yhi=C)
    return U(st(SB),st(x1-W),d1,d2)
@g('N',ord('N'),700)
def _():
    x1=700-SB; w=W*0.98
    return U(st(SB),st(x1-W),dstroke((x1-W*0.5,0),(SB+W*0.5,C),w,ylo=0,yhi=C))
@g('O',ord('O'),736)
def _(): return ring(SBR,-O,736-SBR,C+O,W*1.02,H)
@g('Q',ord('Q'),736)
def _():
    return U(ring(SBR,-O,736-SBR,C+O,W*1.02,H),dstroke((420,230),(736-SBR+6,-80),W*0.9,ylo=-80))
@g('P',ord('P'),604)
def _(): return U(st(SB),dbowl(SB,C*0.40-H/2,C,604-SB))
@g('R',ord('R'),628)
def _():
    x1=628-SB; y0=C*0.42-H/2
    return U(st(SB),dbowl(SB,y0,C,x1-20),dstroke((x1-230,y0+H/2),(x1-W*0.45,0),W*0.98,ylo=0))
@g('S',ord('S'),612)
def _():
    w=SW*1.02; x0,x1=SBR+w/2,612-SBR-w/2; yt=C+O-w/2; yb=-O+w/2; ym=(yt+yb)/2+10
    rt=(x1-x0)/2-10; rb=(x1-x0)/2; cx=(x0+x1)/2
    l=Line(cx+rt*math.cos(math.radians(20)),(yt+ym)/2+(yt-ym)/2*math.sin(math.radians(20)))
    l.A(cx,(yt+ym)/2,rt,(yt-ym)/2,20,270).A(cx,(ym+yb)/2,rb,(ym-yb)/2,90,-202)
    return l.stroke(w)
@g('T',ord('T'),600)
def _(): return U(rect(SB-20,C-H,600-SB+20,C),st(300-W/2))
@g('U',ord('U'),680)
def _():
    x1=680-SB; r=(x1-SB)/2; cy=-O+r*0.95
    return U(rect(SB,cy-1,SB+W,C),rect(x1-W,cy-1,x1,C),I(ring(SB,-O,x1,-O+2*r*0.95,W,H),band(-O-10,cy)))
@g('V',ord('V'),664)
def _():
    w=W*0.98; cx=332
    return U(dstroke((cx,0),(SB-14+w*0.55,C),w,ylo=0,yhi=C),dstroke((cx,0),(664-SB+14-w*0.55,C),w,ylo=0,yhi=C))
@g('W',ord('W'),964)
def _():
    w=W*0.92; a=SB-14+w*0.55; b=964-SB+14-w*0.55; m=482; l1=(a+m)/2; l2=(m+b)/2
    return U(*[dstroke((x0,0),(x1,C),w,ylo=0,yhi=C) for x0,x1 in [(l1,a),(l1,m),(l2,m),(l2,b)]])
@g('X',ord('X'),660)
def _():
    w=W*0.98; a=SB-10+w*0.5; b=660-SB+10-w*0.5
    return U(dstroke((a,0),(b,C),w,ylo=0,yhi=C),dstroke((b,0),(a,C),w,ylo=0,yhi=C))
@g('Y',ord('Y'),660)
def _():
    adv=660; cx=adv/2; ang=math.radians(40); reach=cx-SB+10-W/2
    L=reach/math.sin(ang); tipy=C-W/2; yf=tipy-L*math.cos(ang)
    p=rect(cx-W/2,0,cx+W/2,yf+W*0.2)
    for s in (-1,1):
        # la Y es el símbolo: ramas a ±40° cortadas en perpendicular, como una poda
        p=U(p,seg((cx,yf-W*0.30),(cx+s*reach,tipy+W*0.5*math.cos(ang)-8),W*0.9))
    return p
@g('Z',ord('Z'),600)
def _():
    x0,x1=SB-6,600-SB+6
    return U(rect(x0,C-H,x1,C),rect(x0,0,x1,H),I(seg((x0+W*0.3,H/2),(x1-W*0.3,C-H/2),W*1.02,200,200),band(0,C)))
# ---------------- cifras ----------------
NUMW=560
@g('zero',ord('0'),NUMW)
def _(): return ring(SBR+6,-O,NUMW-SBR-6,C+O,W,H)
@g('one',ord('1'),NUMW)
def _():
    sx=300; return U(st(sx),dstroke((sx+20,C-W*0.4),(sx-150,C-230),W*0.9,yhi=C),rect(sx-150+0,0,sx+W+130,0) if False else None)
@g('two',ord('2'),NUMW)
def _():
    w=SW; x0,x1=SBR+w/2+6,NUMW-SBR-w/2-6; r=(x1-x0)/2; cy=C+O-w/2-r*0.95
    l=Line(x0,cy+10).A((x0+x1)/2,cy,r,r*0.95,180,0-8).L(x0-w*0.2,H/2+w*0.1)
    return U(I(l.stroke(w),band(H-2,2000)),rect(x0-w/2,0,x1+w/2,H))
@g('three',ord('3'),NUMW)
def _():
    w=SW; x0,x1=SBR+w/2+10,NUMW-SBR-w/2-6; ym=C*0.56
    rt=((C+O-w/2)-ym)/2; rb=(ym+O-w/2)/2+10
    top=Line(x0,(C+O-w/2)-rt+30).A((x0+x1)/2-10,C+O-w/2-rt,(x1-x0)/2-10,rt,160,-90)
    bot=Line((x0+x1)/2-70,ym).L((x0+x1)/2,ym).A((x0+x1)/2,ym-rb,(x1-x0)/2,rb,90,-200)
    return U(top.stroke(w),bot.stroke(w))
@g('four',ord('4'),NUMW)
def _():
    sx=NUMW-SB-W-30; yb=180
    return U(st(sx),rect(SB-10,yb,NUMW-SB+10,yb+H),I(seg((SB+W*0.3,yb+H/2),(sx+W*0.5,C),W*0.94,0,200),U(band(yb,C),)))
@g('five',ord('5'),NUMW)
def _():
    x0,x1=SBR+10,NUMW-SBR-6; rb=236; top=-O+2*rb; cyb=-O+rb; cx=(x0+x1)/2; rx=(x1-x0)/2
    b=D(ring(x0,-O,x1,top,W,H),rect(x0-10,cyb-0.46*rb,cx-0.1*rx,cyb+0.34*rb))
    sx=x0
    return U(b,rect(sx,cyb+0.34*rb,sx+W,C),rect(sx,C-H,x1-8,C))
@g('six',ord('6'),NUMW)
def _():
    x0,x1=SBR+6,NUMW-SBR-6; r=(x1-x0)/2; b=ring(x0,-O,x1,-O+2*r*1.0,W,H)
    stemc=Line(x0+W/2,-O+r).C(x0+W/2,C*0.72,x0+W*1.6,C-W/2,x1-W*0.2,C-W/2+8).stroke(W*0.96)
    return U(b,stemc)
@g('seven',ord('7'),NUMW)
def _():
    x0,x1=SB-10,NUMW-SB+10
    return U(rect(x0,C-H,x1,C),I(seg((x0+170,0),(x1-W*0.5,C-H/2),W,200,10),band(0,C)))
@g('eight',ord('8'),NUMW)
def _():
    x0,x1=SBR+6,NUMW-SBR-6; ym=C*0.54
    return U(ring(x0+30,ym-H/2,x1-30,C+O,W*0.94,H),ring(x0,-O,x1,ym+H/2,W,H))
@g('nine',ord('9'),NUMW)
def _():
    return rot(G['six'][0](),NUMW,C)
# ---------------- signos ----------------
DOT=W*0.6
@g('period',ord('.'),2*SB+2*DOT-10)
def _(): return circ(SB-5+DOT,DOT,DOT)
@g('comma',ord(','),2*SB+2*DOT-10)
def _(): return U(circ(SB-5+DOT,DOT,DOT),dstroke((SB-5+DOT*1.5,DOT*0.8),(SB-5+DOT*0.4,-150),W*0.62))
@g('colon',ord(':'),2*SB+2*DOT-10)
def _(): return U(circ(SB-5+DOT,DOT,DOT),circ(SB-5+DOT,X-DOT,DOT))
@g('semicolon',ord(';'),2*SB+2*DOT-10)
def _(): return U(G['comma'][0](),circ(SB-5+DOT,X-DOT,DOT))
@g('exclam',ord('!'),W+2*SB)
def _(): return U(stem(SB,C*0.30,C),circ(SB+W/2,DOT,DOT))
@g('exclamdown',0xA1,W+2*SB)
def _(): return U(rect(SB,DSC+40,SB+W,X-C*0.30+DSC+40),circ(SB+W/2,X-DOT,DOT))
@g('question',ord('?'),520)
def _():
    w=SW; x0,x1=SBR+w/2,520-SBR-w/2; r=(x1-x0)/2; cy=C+O-w/2-r*0.9
    l=Line(x0,cy+6).A((x0+x1)/2,cy,r,r*0.9,180,-60).L((x0+x1)/2-w*0.1,C*0.3)
    return U(I(l.stroke(w),band(C*0.30,2000)),circ((x0+x1)/2-w*0.1,DOT,DOT))
@g('questiondown',0xBF,520)
def _():
    from fontTools.misc.transform import Transform
    p=G['question'][0](); q=P(); from fontTools.pens.transformPen import TransformPen
    p.draw(TransformPen(q.getPen(),Transform(-1,0,0,-1,520,X+20))); return q
@g('hyphen',ord('-'),360)
def _(): return rect(SB,250,360-SB,250+H*0.9)
@g('endash',0x2013,540)
def _(): return rect(SB,250,540-SB,250+H*0.9)
@g('emdash',0x2014,1000)
def _(): return rect(SB,250,1000-SB,250+H*0.9)
@g('quotesingle',ord("'"),W+2*SB)
def _(): return stem(SB,C-250,C+30)
@g('quotedbl',ord('"'),2*W+2*SB+60)
def _(): return U(stem(SB,C-250,C+30),stem(SB+W+60,C-250,C+30))
def qmark(x,y,flip=False):
    d=circ(x,y,DOT*0.9); t=dstroke((x+DOT*0.6,y-DOT*0.1),(x-DOT*0.3,y-DOT*2.2),W*0.5) if not flip else dstroke((x-DOT*0.6,y+DOT*0.1),(x+DOT*0.3,y+DOT*2.2),W*0.5)
    return U(d,t)
QW=2*SB+2*DOT-10
def cm(dx,dy,flip=False):
    p=G['comma'][0](); q=P()
    t=Transform(-1,0,0,-1,QW+dx,C+dy-DOT*0.2) if flip else Transform(1,0,0,1,dx,C-2*DOT+dy)
    p.draw(TransformPen(q.getPen(),t)); return q
@g('quoteright',0x2019,QW)
def _(): return cm(0,0)
@g('quoteleft',0x2018,QW)
def _(): return cm(0,-150,True)
@g('quotedblright',0x201D,2*QW-40)
def _(): return U(cm(0,0),cm(QW-40,0))
@g('quotedblleft',0x201C,2*QW-40)
def _(): return U(cm(0,-150,True),cm(QW-40,-150,True))
@g('parenleft',ord('('),330)
def _(): return Line(300,C+80).A(300,(C-100)/2+(-120+60),230,(C+200)/2+20,110,250).stroke(W*0.9)
@g('parenright',ord(')'),330)
def _(): return Line(30,C+80).A(30,(C-100)/2+(-120+60),230,(C+200)/2+20,70,-70).stroke(W*0.9)
@g('slash',ord('/'),420)
def _(): return I(seg((60,-120),(360,C+60),W*0.9,50,50),band(-120,C+60))
@g('periodcentered',0xB7,2*SB+2*DOT)
def _(): return circ(SB+DOT,X/2+20,DOT)
@g('plus',ord('+'),560)
def _(): return U(rect(60,300-H/2,500,300+H/2),rect(280-H/2,80,280+H/2,520))
@g('percent',ord('%'),820)
def _():
    return U(ring(40,380,300,C+O,W*0.8,W*0.7),ring(520,-O,780,C-380+O,W*0.8,W*0.7),I(seg((150,-20),(670,C+20),W*0.85,0,0),band(-O,C+O)))
@g('arrowright',0x2192,800)
def _(): return U(rect(60,300-H*0.42,660,300+H*0.42),dstroke((720,300),(470,560),W*0.84),dstroke((720,300),(470,40),W*0.84),circ(706,300,W*0.42))
@g('ampersand',ord('&'),700)
def _():
    w=SW; l=Line(640,0).L(250,C*0.52).A(330,C*0.72,150,C*0.2,210,-20).L(270,C*0.44).A(270,C*0.24,200,C*0.24,110,330).L(650,C*0.4)
    return I(l.stroke(w),band(0,C+O))
@g('space',32,232)
def _(): return None
@g('nbspace',0xA0,232)
def _(): return None

# ---------------- acentuadas ----------------
def compose(name,uni,base,mark,y,dx=0):
    fn,adv,_=G[base]
    @g(name,uni,adv)
    def _():
        return U(fn(),mark(adv/2+dx,y))
for b,u in [('a',0xE1),('e',0xE9),('o',0xF3),('u',0xFA)]: compose(b+'acute',u,b,acute,X+100)
compose('iacute',0xED,'dotlessi',acute,X+100)
compose('udieresis',0xFC,'u',dier,X+60)
compose('ntilde',0xF1,'n',tilde,X+60)
for b,u in [('A',0xC1),('E',0xC9),('I',0xCD),('O',0xD3),('U',0xDA)]: compose(b+'acute',u,b,acute,C+70,dx=(-(G[b][1]/2)+SB+W/2) if b=='E' else 0)
compose('Udieresis',0xDC,'U',dier,C+50)
compose('Ntilde',0xD1,'N',tilde,C+50)
