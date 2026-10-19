#!/usr/bin/env python3
"""Extrait les tracés vectoriels (remplissages) d'un PDF Illustrator simple → liste (d, couleur)."""
import re, zlib, sys

def content(path):
    d = open(path, 'rb').read()
    best = None
    for m in re.finditer(rb'stream(\r\n|\n|\r)', d):
        st = m.end(); en = d.find(b'endstream', st); raw = d[st:en]
        try:
            t = zlib.decompress(raw)
        except Exception:
            continue
        n = len(re.findall(rb' c\s', t))
        if n > 10 and (best is None or n > best[0]):
            best = (n, t)
    return best[1].decode('latin1')

def mul(a, b):
    return [a[0]*b[0]+a[1]*b[2], a[0]*b[1]+a[1]*b[3], a[2]*b[0]+a[3]*b[2], a[2]*b[1]+a[3]*b[3], a[4]*b[0]+a[5]*b[2]+b[4], a[4]*b[1]+a[5]*b[3]+b[5]]

def convert(path, H=None):
    src = content(path)
    if H is None:
        m = re.search(r'([\d.]+) ([\d.]+) ([\d.]+) ([\d.]+) re\s*W', src)
        H = 1080
    toks = re.findall(r'/[^\s/\[\]<>()]+|\[|\]|[^\s\[\]]+', src)
    stack = []; ctm = [1, 0, 0, 1, 0, 0]; st = []; fill = (0, 0, 0); cur = []; out = []; pts = []
    def P(x, y):
        X = ctm[0]*x + ctm[2]*y + ctm[4]; Y = ctm[1]*x + ctm[3]*y + ctm[5]
        return (round(X, 2), round(-Y, 2))
    for t in toks:
        if t == 'q': stack.append((ctm[:], fill)); continue
        if t == 'Q': ctm, fill = stack.pop(); continue
        if t == 'cm': a = [float(x) for x in st[-6:]]; ctm = mul(a, ctm); st = []; continue
        if t in ('rg', 'sc', 'scn') and len(st) >= 3: fill = tuple(float(x) for x in st[-3:]); st = []; continue
        if t == 'g': v = float(st[-1]); fill = (v, v, v); st = []; continue
        if t == 'k': c, m_, y, k = [float(x) for x in st[-4:]]; fill = ((1-c)*(1-k), (1-m_)*(1-k), (1-y)*(1-k)); st = []; continue
        if t == 'm': X, Y = P(*map(float, st[-2:])); cur.append(f'M{X} {Y}'); pts.append((X, Y)); st = []; continue
        if t == 'l': X, Y = P(*map(float, st[-2:])); cur.append(f'L{X} {Y}'); pts.append((X, Y)); st = []; continue
        if t == 'c':
            v = list(map(float, st[-6:])); a = P(v[0], v[1]); b = P(v[2], v[3]); c = P(v[4], v[5])
            cur.append(f'C{a[0]} {a[1]} {b[0]} {b[1]} {c[0]} {c[1]}'); pts.append(c); st = []; continue
        if t in ('v', 'y'):
            v = list(map(float, st[-4:])); a = P(v[0], v[1]); b = P(v[2], v[3])
            cur.append(f'Q{a[0]} {a[1]} {b[0]} {b[1]}'); pts.append(b); st = []; continue
        if t == 'h': cur.append('Z'); st = []; continue
        if t == 're': cur.append('RE'); st = []; continue
        if t in ('n', 'W'): cur = [] if t == 'n' else cur; st = []; continue
        if t in ('f', 'f*', 'F', 'B', 'b'):
            d = ' '.join(c for c in cur if c != 'RE')
            if d:
                col = '#%02x%02x%02x' % tuple(round(c*255) for c in fill)
                out.append((d, col))
            cur = []; st = []; continue
        if t in ('S', 's'): cur = []; st = []; continue
        st.append(t)
    return out

if __name__ == '__main__':
    for d, c in convert(sys.argv[1]):
        nums = [float(x) for x in re.findall(r'-?\d+\.?\d*', d)]
        xs = nums[0::2]; ys = nums[1::2]
        print(c, 'x', round(min(xs)), round(max(xs)), 'y', round(min(ys)), round(max(ys)), len(d))
