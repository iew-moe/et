from pathlib import Path
import json
import ast

OUT_DIR = Path('schematics/parallel_series_topos_clean')
OUT_DIR.mkdir(parents=True, exist_ok=True)

# load TOPOS from notebook to avoid drift (parse literal, do not exec)
nb = json.load(open('parallel_series.ipynb', encoding='utf-8'))
TOPOS = None
for cell in nb['cells']:
    if cell.get('cell_type') != 'code':
        continue
    src = ''.join(cell.get('source', ''))
    idx = src.find('TOPOS = [')
    if idx == -1:
        continue
    start = idx + len('TOPOS = ')
    depth = 0
    end = None
    for i in range(start, len(src)):
        ch = src[i]
        if ch == '[':
            depth += 1
        elif ch == ']':
            depth -= 1
            if depth == 0:
                end = i + 1
                break
    if end is None:
        raise RuntimeError('Failed to parse TOPOS list')
    list_text = src[start:end]
    TOPOS = ast.literal_eval(list_text)
    break
if not TOPOS:
    raise RuntimeError('TOPOS not found in notebook')

# cleanup old pngs in clean folder
for p in OUT_DIR.glob('parallel_series_*_*.png'):
    try:
        p.unlink()
    except PermissionError:
        pass

try:
    from lcapy import Circuit
except Exception as exc:
    raise SystemExit(f'lcapy/LaTeX not available: {exc}')

KINDS = ['R', 'L', 'C']

def make_netlist(topo, kind):
    lines = [ln.replace('{E}', kind) for ln in topo['net']]
    lines.append('WA A a_ext; left=0.9, l=A')
    lines.append('WB B b_ext; right=0.9, l=B')
    return '\n'.join(lines) + '\n'

for kind in KINDS:
    for topo in TOPOS:
        # consistent naming: parallel_series_{KIND}_{TOPO}.png
        out_path = OUT_DIR / f"parallel_series_{kind}_{topo['id']}.png"
        cct = Circuit(make_netlist(topo, kind))
        # set nominal values so labels are stable
        for i in range(1, topo['n'] + 1):
            cct[f'{kind}{i}'].value = 1.0
        cct.draw(str(out_path), style='european', label_values=False, label_nodes=False,
                 draw_nodes=False, node_spacing=1.2, cpt_size=1.1, cleanup=False, debug=1)

print(f'Generated {len(TOPOS) * len(KINDS)} schematics in {OUT_DIR}')
