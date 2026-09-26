import math, pathops, skia
K=0.64
def P(): return pathops.Path()
def poly(pts):
    p=P(); pen=p.getPen(); pen.moveTo(pts[0]); [pen.lineTo(q) for q in pts[1:]]; pen.closePath(); return p
def rect(x0,y0,x1,y1): return poly([(x0,y0),(x0,y1),(x1,y1),(x1,y0)])
def ell(cx,cy,rx,ry,k=K):
    p=P(); pen=p.getPen(); pen.moveTo((cx+rx,cy))
    pen.curveTo((cx+rx,cy+k*ry),(cx+k*rx,cy+ry),(cx,cy+ry))
    pen.curveTo((cx-k*rx,cy+ry),(cx-rx,cy+k*ry),(cx-rx,cy))
    pen.curveTo((cx-rx,cy-k*ry),(cx-k*rx,cy-ry),(cx,cy-ry))
    pen.curveTo((cx+k*rx,cy-ry),(cx+rx,cy-k*ry),(cx+rx,cy)); pen.closePath(); return p
def circ(cx,cy,r): return ell(cx,cy,r,r,0.5523)
def U(*ps):
    ps=[q for q in ps if q is not None]; out=ps[0]
    for q in ps[1:]: out=pathops.op(out,q,pathops.PathOp.UNION)
    return out
def D(a,*bs):
    for b in bs: a=pathops.op(a,b,pathops.PathOp.DIFFERENCE)
    return a
def I(a,b): return pathops.op(a,b,pathops.PathOp.INTERSECTION)
def ring(x0,y0,x1,y1,ws,wt,k=K):
    cx,cy,rx,ry=(x0+x1)/2,(y0+y1)/2,(x1-x0)/2,(y1-y0)/2
    return D(ell(cx,cy,rx,ry,k),ell(cx,cy,rx-ws,ry-wt,k))
def band(y0=-5000,y1=5000,x0=-5000,x1=5000): return rect(x0,y0,x1,y1)
def seg(p0,p1,w,e0=0,e1=0):
    (x0,y0),(x1,y1)=p0,p1; dx,dy=x1-x0,y1-y0;L=math.hypot(dx,dy);ux,uy=dx/L,dy/L;nx,ny=-uy*w/2,ux*w/2
    a=(x0-ux*e0,y0-uy*e0);b=(x1+ux*e1,y1+uy*e1)
    return poly([(a[0]+nx,a[1]+ny),(b[0]+nx,b[1]+ny),(b[0]-nx,b[1]-ny),(a[0]-nx,a[1]-ny)])
def dstroke(p0,p1,w,ylo=None,yhi=None,tip=False):
    import os
    if tip and os.environ.get("TIP","bevel")!="round":
        tip=False; yhi=p1[1]+w/2
    """trazo recto de p0 a p1. ylo/yhi: corte horizontal (se extiende y recorta). tip: punta redonda en p1"""
    e0=400 if ylo is not None and p0[1]<=p1[1] else (400 if yhi is not None and p0[1]>p1[1] else 0)
    e1=0 if tip else (400 if (yhi is not None and p1[1]>=p0[1]) or (ylo is not None and p1[1]<p0[1]) else 0)
    s=seg(p0,p1,w,e0,e1)
    s=I(s,band(-5000 if ylo is None else ylo, 5000 if yhi is None else yhi))
    return U(s,circ(p1[0],p1[1],w/2)) if tip else s
def to_pathops(sk):
    p=P(); pen=p.getPen(); it=skia.Path.Iter(sk,False)
    while True:
        verb,pts=it.next()
        if verb==skia.Path.kDone_Verb: break
        if verb==skia.Path.kMove_Verb: pen.moveTo((pts[0].x(),pts[0].y()))
        elif verb==skia.Path.kLine_Verb: pen.lineTo((pts[1].x(),pts[1].y()))
        elif verb==skia.Path.kQuad_Verb: pen.qCurveTo((pts[1].x(),pts[1].y()),(pts[2].x(),pts[2].y()))
        elif verb==skia.Path.kCubic_Verb: pen.curveTo(*[(q.x(),q.y()) for q in pts[1:4]])
        elif verb==skia.Path.kConic_Verb:
            q=skia.Path.ConvertConicToQuads(pts[0],pts[1],pts[2],it.conicWeight(),2)
            for j in range(1,len(q)-1,2): pen.qCurveTo((q[j].x(),q[j].y()),(q[j+1].x(),q[j+1].y()))
        elif verb==skia.Path.kClose_Verb: pen.closePath()
    p.simplify(); return p
class Line:
    """línea central con arcos elípticos; se engruesa con skia (remates rectos)"""
    def __init__(s,x,y): s.p=skia.Path(); s.p.moveTo(x,y); s.x,s.y=x,y
    def L(s,x,y): s.p.lineTo(x,y); s.x,s.y=x,y; return s
    def A(s,cx,cy,rx,ry,a0,a1):
        # arco desde el ángulo a0 a a1 (grados, antihorario, y hacia arriba)
        n=max(1,int(math.ceil(abs(a1-a0)/90-1e-9))); da=(a1-a0)/n
        pt=lambda a:(cx+rx*math.cos(math.radians(a)),cy+ry*math.sin(math.radians(a)))
        dv=lambda a:(-rx*math.sin(math.radians(a)),ry*math.cos(math.radians(a)))
        x0,y0=pt(a0)
        if abs(x0-s.x)>0.5 or abs(y0-s.y)>0.5: s.p.lineTo(x0,y0)
        for i in range(n):
            b0=a0+i*da;b1=b0+da;k=4/3*math.tan(math.radians(da)/4)
            p0=pt(b0);p1=pt(b1);d0=dv(b0);d1=dv(b1)
            s.p.cubicTo(p0[0]+k*d0[0],p0[1]+k*d0[1],p1[0]-k*d1[0],p1[1]-k*d1[1],p1[0],p1[1])
        s.x,s.y=pt(a1); return s
    def C(s,x1,y1,x2,y2,x,y): s.p.cubicTo(x1,y1,x2,y2,x,y); s.x,s.y=x,y; return s
    def stroke(s,w,cap=skia.Paint.kButt_Cap,contrast=None):
        # contraste óptico: se estira en y, se engruesa y se comprime -> horizontales más finas
        import os
        k=contrast if contrast is not None else 1/float(os.environ.get('FH','0.78'))
        m=skia.Matrix.Scale(1,k); src=skia.Path(s.p); src.transform(m)
        pt=skia.Paint(StrokeWidth=w,Style=skia.Paint.kStroke_Style,StrokeCap=cap,StrokeJoin=skia.Paint.kMiter_Join,AntiAlias=True)
        out=skia.Path(); pt.getFillPath(src,out,None,8); out.transform(skia.Matrix.Scale(1,1/k)); return to_pathops(out)
