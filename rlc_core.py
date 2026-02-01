# Pyodide core (no ipywidgets)
import math
import cmath
import random
import base64
from io import BytesIO

import matplotlib
matplotlib.use("Agg")

# ---------- helpers ----------

def log_uniform(rng, lo, hi):
    return 10 ** rng.uniform(math.log10(lo), math.log10(hi))

E12_SERIES = [1.0, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2]

def round_e12(x):
    if x <= 0:
        return x
    exp = math.floor(math.log10(x))
    base = 10 ** exp
    frac = x / base
    nearest = min(E12_SERIES, key=lambda v: abs(v - frac))
    val = nearest * base
    if val != 0:
        sig = 6
        expv = math.floor(math.log10(abs(val)))
        scale = 10 ** (sig - 1 - expv)
        val = round(val * scale) / scale
    return val

def round_sig(x, sig, up=False):
    if x == 0:
        return 0
    exp = math.floor(math.log10(abs(x)))
    scale = 10 ** (sig - 1 - exp)
    if up:
        return math.ceil(x * scale) / scale
    return round(x * scale) / scale

def format_sig(x, sig=3):
    s = f"{x:.{sig}g}"
    if 'e' not in s and '.' in s:
        s = s.rstrip('0').rstrip('.')
    return s

def format_si(x, unit, exps, sig=3):
    if x == 0:
        return f"0 {unit}"
    exp10 = math.floor(math.log10(abs(x)))
    exp3 = 3 * math.floor(exp10 / 3)
    if exp3 not in exps:
        exp3 = min(exps, key=lambda e: abs(e - exp3))
    scale = 10 ** exp3
    val = x / scale
    s = format_sig(val, sig)
    prefixes = {
        -12: 'p', -9: 'n', -6: 'u', -3: 'm', 0: '', 3: 'k', 6: 'M', 9: 'G'
    }
    prefix = prefixes.get(exp3, f"e{exp3}")
    return f"{s} {prefix}{unit}"

def format_R(x):
    return format_si(x, 'Ohm', exps=[-3,0,3,6])

def format_L(x):
    return format_si(x, 'H', exps=[-12,-9,-6,-3,0,3])

def format_C(x):
    return format_si(x, 'F', exps=[-12,-9,-6,-3,0,3])

def format_V(x):
    return format_si(x, 'V', exps=[-3,0,3])

def format_freq(f_hz):
    return format_si(f_hz, 'Hz', exps=[-12,-9,-6,-3,0,3,6,9])

# ---------- circuit configurations ----------
CONFIGS = [
    {'name': 'R-(C||L)', 'type': 'series_parallel', 'series': 'R', 'parallel': ('C', 'L')},
    {'name': 'C-(R||L)', 'type': 'series_parallel', 'series': 'C', 'parallel': ('R', 'L')},
    {'name': 'L-(C||R)', 'type': 'series_parallel', 'series': 'L', 'parallel': ('C', 'R')},
    {'name': '(V||R)||(L-C)', 'type': 'parallel_series', 'single': 'R', 'series_pair': ('L', 'C')},
    {'name': '(V||L)||(R-C)', 'type': 'parallel_series', 'single': 'L', 'series_pair': ('R', 'C')},
    {'name': '(V||C)||(R-L)', 'type': 'parallel_series', 'single': 'C', 'series_pair': ('R', 'L')},
]

# Netlists for optional offline lcapy rendering (not used in web/pyodide).
NETLISTS = {
    'R-(C||L)': r'''
V1 1 0; down=2, l={$\color{blue}\underline{\mathrm{V}}$}, i_>={$\color{red}\underline{\mathrm{I}}$}
R 1 2; right=3, i_>={$\color{red}\underline{\mathrm{I}}_{\mathrm{R}}$}, v^>={$\color{blue}\underline{\mathrm{V}}_{\mathrm{R}}$}
W0 0 4; right=5
C 2 4; down=2, i_>={$\color{red}\underline{\mathrm{I}}_{\mathrm{C}}$}, v^>={$\color{blue}\underline{\mathrm{V}}_{\mathrm{C}}$}
W1 2 3; right=3
L 3 5; down=2, i_>={$\color{red}\underline{\mathrm{I}}_{\mathrm{L}}$}, v^>={$\color{blue}\underline{\mathrm{V}}_{\mathrm{L}}$}
W2 5 4; left=3
''',
    'C-(R||L)': r'''
V1 1 0; down=2, l={$\color{blue}\underline{\mathrm{V}}$}, i_>={$\color{red}\underline{\mathrm{I}}$}
C 1 2; right=3, i_>={$\color{red}\underline{\mathrm{I}}_{\mathrm{C}}$}, v^>={$\color{blue}\underline{\mathrm{V}}_{\mathrm{C}}$}
W0 0 4; right=5
R 2 4; down=2, i_>={$\color{red}\underline{\mathrm{I}}_{\mathrm{R}}$}, v^>={$\color{blue}\underline{\mathrm{V}}_{\mathrm{R}}$}
W1 2 3; right=3
L 3 5; down=2, i_>={$\color{red}\underline{\mathrm{I}}_{\mathrm{L}}$}, v^>={$\color{blue}\underline{\mathrm{V}}_{\mathrm{L}}$}
W2 5 4; left=3
''',
    'L-(C||R)': r'''
V1 1 0; down=2, l={$\color{blue}\underline{\mathrm{V}}$}, i_>={$\color{red}\underline{\mathrm{I}}$}
L 1 2; right=3, i_>={$\color{red}\underline{\mathrm{I}}_{\mathrm{L}}$}, v^>={$\color{blue}\underline{\mathrm{V}}_{\mathrm{L}}$}
W0 0 4; right=5
C 2 4; down=2, i_>={$\color{red}\underline{\mathrm{I}}_{\mathrm{C}}$}, v^>={$\color{blue}\underline{\mathrm{V}}_{\mathrm{C}}$}
W1 2 3; right=3
R 3 5; down=2, i_>={$\color{red}\underline{\mathrm{I}}_{\mathrm{R}}$}, v^>={$\color{blue}\underline{\mathrm{V}}_{\mathrm{R}}$}
W2 5 4; left=3
''',
    '(V||R)||(L-C)': r'''
V1 1 0; down=2, l={$\color{blue}\underline{\mathrm{V}}$}, i_>={$\color{red}\underline{\mathrm{I}}$}
W0 1 2; right=3
R 2 3; down=2, i_>={$\color{red}\underline{\mathrm{I}}_{\mathrm{R}}$}, v^>={$\color{blue}\underline{\mathrm{V}}_{\mathrm{R}}$}
W1 3 0; left=3
W2 1 4; right=6
L 4 5; down=2, i_>={$\color{red}\underline{\mathrm{I}}_{\mathrm{L}}$}, v^>={$\color{blue}\underline{\mathrm{V}}_{\mathrm{L}}$}
C 5 6; down=2, i_>={$\color{red}\underline{\mathrm{I}}_{\mathrm{C}}$}, v^>={$\color{blue}\underline{\mathrm{V}}_{\mathrm{C}}$}
W3 6 0; left=6
''',
    '(V||L)||(R-C)': r'''
V1 1 0; down=2, l={$\color{blue}\underline{\mathrm{V}}$}, i_>={$\color{red}\underline{\mathrm{I}}$}
W0 1 2; right=3
L 2 3; down=2, i_>={$\color{red}\underline{\mathrm{I}}_{\mathrm{L}}$}, v^>={$\color{blue}\underline{\mathrm{V}}_{\mathrm{L}}$}
W1 3 0; left=3
W2 1 4; right=6
R 4 5; down=2, i_>={$\color{red}\underline{\mathrm{I}}_{\mathrm{R}}$}, v^>={$\color{blue}\underline{\mathrm{V}}_{\mathrm{R}}$}
C 5 6; down=2, i_>={$\color{red}\underline{\mathrm{I}}_{\mathrm{C}}$}, v^>={$\color{blue}\underline{\mathrm{V}}_{\mathrm{C}}$}
W3 6 0; left=6
''',
    '(V||C)||(R-L)': r'''
V1 1 0; down=2, l={$\color{blue}\underline{\mathrm{V}}$}, i_>={$\color{red}\underline{\mathrm{I}}$}
W0 1 2; right=3
C 2 3; down=2, i_>={$\color{red}\underline{\mathrm{I}}_{\mathrm{C}}$}, v^>={$\color{blue}\underline{\mathrm{V}}_{\mathrm{C}}$}
W1 3 0; left=3
W2 1 4; right=6
R 4 5; down=2, i_>={$\color{red}\underline{\mathrm{I}}_{\mathrm{R}}$}, v^>={$\color{blue}\underline{\mathrm{V}}_{\mathrm{R}}$}
L 5 6; down=2, i_>={$\color{red}\underline{\mathrm{I}}_{\mathrm{L}}$}, v^>={$\color{blue}\underline{\mathrm{V}}_{\mathrm{L}}$}
W3 6 0; left=6
''',
}

# ---------- core ----------

def comp_impedance(R, L, C, f):
    w = 2 * math.pi * f
    ZR = R
    ZL = 1j * w * L
    ZC = 1 / (1j * w * C)
    return {'R': ZR, 'L': ZL, 'C': ZC}

def solve_topology(R, L, C, V, f, cfg):
    Z = comp_impedance(R, L, C, f)
    if cfg['type'] == 'series_parallel':
        s = cfg['series']
        p1, p2 = cfg['parallel']
        Zpar = (Z[p1] * Z[p2]) / (Z[p1] + Z[p2])
        Ztot = Z[s] + Zpar
        return {
            'type': cfg['type'],
            'Z': Z,
            'Zpar': Zpar,
            'Ztot': Ztot,
            'series': s,
            'parallel': (p1, p2),
            'Zseries': None,
        }
    single = cfg['single']
    s1, s2 = cfg['series_pair']
    Zseries = Z[s1] + Z[s2]
    Zpar = (Z[single] * Zseries) / (Z[single] + Zseries)
    Ztot = Zpar
    return {
        'type': cfg['type'],
        'Z': Z,
        'Zpar': Zpar,
        'Ztot': Ztot,
        'single': single,
        'series_pair': (s1, s2),
        'Zseries': Zseries,
    }

STATE = {}

# ---------- plotting ----------

def _png_b64(fig):
    bio = BytesIO()
    fig.savefig(bio, format='png')
    return base64.b64encode(bio.getvalue()).decode('ascii')


def _eng_label(x, unit=''):
    if x == 0:
        return f'0 {unit}'.strip()
    exp3 = 3 * math.floor(math.log10(abs(x)) / 3)
    val = x / (10 ** exp3)
    s = format_sig(val, 3)
    prefixes = {-12:'p', -9:'n', -6:'u', -3:'m', 0:'', 3:'k', 6:'M', 9:'G'}
    prefix = prefixes.get(exp3, f"e{exp3}")
    return f"{s} {prefix}{unit}".strip()

def _u(s):
    ul = "\u0332"
    return "".join(ch + ul for ch in s)


def try_render_schematic(prefer_live=True, out_dir='schematics'):
    """Try to render schematic with lcapy (offline). Fallback to pre-rendered PNG."""
    if not STATE:
        return None
    cfg = STATE['cfg']
    cfg_name = cfg['name'].replace('(', '').replace(')', '').replace('|', '_').replace('-', '_')
    target = f"{out_dir}/{cfg_name}.png"

    if prefer_live:
        try:
            import shutil
            if shutil.which('latex') or shutil.which('pdflatex'):
                from lcapy import Circuit
                netlist = NETLISTS.get(cfg['name'])
                if netlist:
                    cct = Circuit(netlist)
                    cct['V1'].value = STATE['V']
                    cct['R'].value = STATE['R']
                    cct['L'].value = STATE['L']
                    cct['C'].value = STATE['C']
                    from pathlib import Path
                    p = Path(target)
                    p.parent.mkdir(parents=True, exist_ok=True)
                    cct.draw(str(p), style='european', label_values=True, label_nodes=False, node_spacing=1.1, cpt_size=1.0, scale=0.75)
                    return str(p)
        except Exception:
            pass

    try:
        from pathlib import Path
        p = Path(target)
        return str(p) if p.exists() else None
    except Exception:
        return None


def draw_phasor(vectors):
    import matplotlib.pyplot as plt
    from matplotlib.ticker import FuncFormatter

    V_max = max(abs(v) for k, v in vectors.items() if k.startswith('V_') or k == 'V') or 1.0
    I_max = max(abs(v) for k, v in vectors.items() if k.startswith('I_') or k == 'I') or 1.0

    def next_nice_125(x):
        if x <= 0:
            return 1.0
        exp = math.floor(math.log10(x))
        base = 10 ** exp
        f = x / base
        if f <= 1:
            n = 1
        elif f <= 2:
            n = 2
        elif f <= 5:
            n = 5
        else:
            n = 10
        return n * base

    Vstep = next_nice_125(V_max / 8.0)
    Istep = next_nice_125(I_max / 8.0)
    step = Vstep
    I_scale = Vstep / Istep

    fig, ax = plt.subplots(figsize=(7, 7), dpi=240)

    def draw_vec(z, label, color, scale, lw=2.0, ls='-', shift=0.0):
        head = 0.2 * step
        dx, dy = z.real * scale, z.imag * scale
        norm = math.hypot(dx, dy) or 1.0
        px, py = -dy / norm, dx / norm
        sx, sy = px * shift, py * shift
        ax.arrow(sx, sy, dx, dy,
                 head_width=head, head_length=0.17 * step,
                 length_includes_head=True, linewidth=lw,
                 linestyle=ls, color=color, alpha=0.6)
        off = 0.60 * step
        ox, oy = off * dx / norm, off * dy / norm
        ax.text(sx + dx + ox, sy + dy + oy, label, color=color, ha='center', fontsize=12,
                bbox=dict(facecolor='white', edgecolor='none', alpha=0.35, boxstyle='round,pad=0.2'))

    palette = ['tab:green','tab:red','tab:orange','tab:blue','tab:cyan','tab:purple','tab:brown','tab:pink','tab:olive','tab:gray']
    keys = []
    if 'V' in vectors:
        keys.append('V')
    keys += sorted([k for k in vectors.keys() if k.startswith('V_')])
    if 'I' in vectors:
        keys.append('I')
    keys += sorted([k for k in vectors.keys() if k.startswith('I_')])
    color_map = {k: palette[i % len(palette)] for i, k in enumerate(keys)}

    for idx, k in enumerate(keys):
        if k == 'V':
            label = _u('V')
            scale = 1.0
        elif k.startswith('V_'):
            suffix = k.split('_',1)[1]
            label = f"{_u('V')}$_{{\\mathrm{{{suffix}}}}}$"
            scale = 1.0
        elif k == 'I':
            label = _u('I')
            scale = I_scale
        else:
            suffix = k.split('_',1)[1]
            label = f"{_u('I')}$_{{\\mathrm{{{suffix}}}}}$"
            scale = I_scale
        shift = (idx - (len(keys) - 1) / 2.0) * (0.008 * step)
        draw_vec(vectors[k], label, color_map[k], scale, lw=2.0, shift=shift)

    from matplotlib.patches import Circle
    ticks = [i * step for i in range(-8, 9)]
    ax.set_xlim(-8*step, 8*step)
    ax.set_ylim(-8*step, 8*step)
    for i in range(1, 9):
        ax.add_patch(Circle((0, 0), radius=i * step, fill=False, linestyle=':', linewidth=0.5, edgecolor='0.85', zorder=0))
    for deg in [30, 60, 120, 150, -30, -60, -120, -150]:
        a = math.radians(deg)
        r = 8 * step
        ax.plot([-r * math.cos(a), r * math.cos(a)], [-r * math.sin(a), r * math.sin(a)],
                linestyle=':', linewidth=0.5, color='0.85', zorder=0)
    ax.set_xticks(ticks)
    ax.set_yticks(ticks)
    ax.tick_params(axis='both', labelsize=8)
    ax.tick_params(axis='x', labelrotation=90)
    fmt_eng = FuncFormatter(lambda x, pos: _eng_label(x, 'V'))
    ax.xaxis.set_major_formatter(fmt_eng)
    ax.yaxis.set_major_formatter(fmt_eng)
    ax.set_xlabel(f"Re({_u('V')})")
    ax.set_ylabel(f"Im({_u('V')})")
    ax.grid(True, linestyle=':', linewidth=0.5)

    secx = ax.twiny()
    secy = ax.twinx()
    secx.set_xlim(ax.get_xlim())
    secy.set_ylim(ax.get_ylim())
    secx.set_xticks(ticks)
    secy.set_yticks(ticks)
    secx.tick_params(axis='x', labelsize=8)
    secx.tick_params(axis='x', labelrotation=90)
    secy.tick_params(axis='y', labelsize=8)
    secx.set_xlabel(f"Re({_u('I')})")
    secy.set_ylabel(f"Im({_u('I')})")
    fmt = FuncFormatter(lambda x, pos: _eng_label(x / I_scale, 'A'))
    secx.xaxis.set_major_formatter(fmt)
    secy.yaxis.set_major_formatter(fmt)
    secx.grid(False)
    secy.grid(False)

    img = _png_b64(fig)
    plt.close(fig)

    # blank plot with only V
    fig2, ax2 = plt.subplots(figsize=(7, 7), dpi=240)
    ax2.axhline(0, color='0.8', linewidth=0.6, linestyle=':')
    ax2.axvline(0, color='0.8', linewidth=0.6, linestyle=':')
    ax2.set_xlim(-8*step, 8*step)
    ax2.set_ylim(-8*step, 8*step)
    for i in range(1, 9):
        ax2.add_patch(Circle((0, 0), radius=i * step, fill=False, linestyle=':', linewidth=0.5, edgecolor='0.85', zorder=0))
    for deg in [30, 60, 120, 150, -30, -60, -120, -150]:
        a = math.radians(deg)
        r = 8 * step
        ax2.plot([-r * math.cos(a), r * math.cos(a)], [-r * math.sin(a), r * math.sin(a)],
                 linestyle=':', linewidth=0.5, color='0.85', zorder=0)
    ax2.set_aspect('equal', 'box')
    ax2.grid(True, linestyle=':', linewidth=0.5)
    ax2.set_xticks(ticks)
    ax2.set_yticks(ticks)
    ax2.tick_params(axis='both', labelsize=8)
    ax2.tick_params(axis='x', labelrotation=90)
    ax2.xaxis.set_major_formatter(fmt_eng)
    ax2.yaxis.set_major_formatter(fmt_eng)
    ax2.set_xlabel(f"Re({_u('V')})")
    ax2.set_ylabel(f"Im({_u('V')})")
    secx2 = ax2.secondary_xaxis('top', functions=(lambda x: x / I_scale, lambda x: x * I_scale))
    secy2 = ax2.secondary_yaxis('right', functions=(lambda y: y / I_scale, lambda y: y * I_scale))
    secx2.set_xlabel(f"Re({_u('I')})")
    secy2.set_ylabel(f"Im({_u('I')})")
    sec_ticks = [t / I_scale for t in ticks]
    secx2.set_xticks(sec_ticks)
    secy2.set_yticks(sec_ticks)
    secx2.tick_params(axis='x', labelsize=8)
    secx2.tick_params(axis='x', labelrotation=90)
    secy2.tick_params(axis='y', labelsize=8)
    fmt_I = FuncFormatter(lambda x, pos: _eng_label(x, 'A'))
    secx2.xaxis.set_major_formatter(fmt_I)
    secy2.yaxis.set_major_formatter(fmt_I)

    v_color = color_map.get('V', 'tab:green')
    v = vectors.get('V', 0)
    vdx, vdy = v.real, v.imag
    vnorm = math.hypot(vdx, vdy) or 1.0
    voff = 0.60 * step
    vox, voy = voff * vdx / vnorm, voff * vdy / vnorm
    ax2.arrow(0, 0, v.real, v.imag,
              head_width=0.2 * step, head_length=0.17 * step,
              length_includes_head=True, linewidth=2.0,
              color=v_color, alpha=0.6)
    ax2.text(v.real + vox, v.imag + voy, _u('V'),
             color=v_color, ha='center', fontsize=12,
             bbox=dict(facecolor='white', edgecolor='none', alpha=0.35, boxstyle='round,pad=0.2'))

    blank = _png_b64(fig2)
    plt.close(fig2)

    return img, blank, Vstep, Istep

# ---------- generate / check ----------

def generate(seed_text=''):
    if seed_text.isdigit():
        if len(seed_text) == 7:
            base_seed = int(seed_text)
        elif len(seed_text) == 6:
            base_seed = int(seed_text + '0')
        else:
            base_seed = random.randint(1000000, 6999999)
    else:
        base_seed = random.randint(1000000, 6999999)

    digits = [int(ch) for ch in f"{base_seed:07d}"]
    first_digit = digits[0]
    mode_digit = digits[6]
    mode = 0 if (mode_digit % 2) == 0 else 1

    if 1 <= first_digit <= 6:
        cfg = CONFIGS[first_digit - 1]
    else:
        cfg = random.choice(CONFIGS)

    found = False
    for k in range(1000):
        rng = random.Random(base_seed + k)
        R = round_e12(log_uniform(rng, 1e-3, 1e5))
        L = round_e12(log_uniform(rng, 1e-8, 1e-2))
        C = round_e12(log_uniform(rng, 1e-11, 1e-3))
        V = round_sig(log_uniform(rng, 1e-1, 800.0), 2)
        f = round_sig(log_uniform(rng, 50.0, 1e6), 1, up=True)

        res = solve_topology(R, L, C, V, f, cfg)
        Z = res['Z']
        Zpar = res['Zpar']
        Ztot = res['Ztot']
        Zseries = res['Zseries']

        min_val = min(R, abs(Z['C']), abs(Z['L']), abs(Zpar), abs(Zseries) if Zseries is not None else abs(Zpar))
        max_val = max(R, abs(Z['C']), abs(Z['L']), abs(Zpar), abs(Zseries) if Zseries is not None else abs(Zpar))
        if min_val >= 0.1 * max_val:
            found = True
            break

    if not found:
        raise RuntimeError('Keine gültige Kombination gefunden')

    I = V / Ztot
    STATE.clear()
    STATE.update({'R': R, 'L': L, 'C': C, 'V': V, 'f': f, 'cfg': cfg, 'res': res, 'Z': Z, 'Zpar': Zpar, 'Ztot': Ztot, 'I': I, 'mode': mode, 'seed': base_seed})

    if res['type'] == 'series_parallel':
        s = res['series']
        p1, p2 = res['parallel']
        topo_txt = f"{s}-({p1}||{p2})"
        task1 = f"Berechne <u>Z</u><sub>{p1}{p2}</sub>."
        zpair_tag = f"{p1}{p2}"
        v1_tag, v2_tag, i1_tag, i2_tag = s, f"{p1}{p2}", p1, p2
        v1 = I * Z[s]
        v2 = I * Zpar
        i1 = v2 / Z[p1]
        i2 = v2 / Z[p2]
    else:
        single = res['single']
        s1, s2 = res['series_pair']
        topo_txt = f"(V||{single})||({s1}-{s2})"
        task1 = f"Berechne <u>Z</u><sub>{s1}{s2}</sub>."
        zpair_tag = f"{s1}{s2}"
        v1_tag, v2_tag, i1_tag, i2_tag = s1, s2, single, f"{s1}{s2}"
        Zseries = res['Zseries']
        i1 = V / Z[single]
        i2 = V / Zseries
        v1 = i2 * Z[s1]
        v2 = i2 * Z[s2]

    mode_text = 'kartesischer Form' if mode == 0 else 'Polarform'

    tasks = [
        f"Geben Sie alle Ergebnisse in {mode_text} an.",
        "1) Berechne <u>Z</u><sub>C</sub>.",
        "2) Berechne <u>Z</u><sub>L</sub>.",
        f"3) {task1}",
        "4) Berechne die Gesamtimpedanz <u>Z</u>.",
        "5) Berechne den Strom <u>I</u>.",
        f"6) Berechne die beiden Teilspannungen <u>V</u><sub>{v1_tag}</sub> und <u>V</u><sub>{v2_tag}</sub>.",
        f"7) Berechne die beiden Teilströme <u>I</u><sub>{i1_tag}</sub> und <u>I</u><sub>{i2_tag}</sub>.",
        "8) Ist diese RLC Schaltung bei f induktiv oder kapazitiv?",
        "9) Berechne die komplexe Scheinleistung <u>S</u>."
    ]

    if res['type'] == 'series_parallel':
        s = res['series']
        p1, p2 = res['parallel']
        Zpar = res['Zpar']
        I_series = V / res['Ztot']
        V_s = I_series * Z[s]
        V_par = I_series * Zpar
        I_p1 = V_par / Z[p1]
        I_p2 = V_par / Z[p2]
        vectors = {'V': V, f'V_{s}': V_s, f'V_{p1}{p2}': V_par, 'I': I_series, f'I_{p1}': I_p1, f'I_{p2}': I_p2}
    else:
        single = res['single']
        s1, s2 = res['series_pair']
        Zseries = res['Zseries']
        I_single = V / Z[single]
        I_series = V / Zseries
        V_s1 = I_series * Z[s1]
        V_s2 = I_series * Z[s2]
        I_total = V / res['Ztot']
        vectors = {'V': V, f'V_{s1}': V_s1, f'V_{s2}': V_s2, 'I': I_total, f'I_{single}': I_single, f'I_{s1}{s2}': I_series}

    phasor_png, blank_png, Vstep, Istep = draw_phasor(vectors)

    rows = []
    def add_row(lbl, z, unit):
        r = abs(z)
        ang = math.degrees(cmath.phase(z))
        cart = f"{format_sig(z.real,3)} {z.imag:+.3g} <b>j</b>"
        pol = f"{format_sig(r,3)} ∠ {format_sig(ang,3)}°"
        rows.append((lbl, cart, pol, unit))

    # also include impedances asked in the input table
    add_row('<u>Z</u><sub>C</sub>', Z['C'], 'Ohm')
    add_row('<u>Z</u><sub>L</sub>', Z['L'], 'Ohm')
    add_row(f"<u>Z</u><sub>{zpair_tag}</sub>", Zpar, 'Ohm')
    add_row('<u>Z</u>', Ztot, 'Ohm')

    for name, z in vectors.items():
        if name == 'V':
            lbl, unit = '<u>V</u>', 'V'
        elif name == 'I':
            lbl, unit = '<u>I</u>', 'A'
        elif name.startswith('V_'):
            lbl, unit = f"<u>V</u><sub>{name.split('_',1)[1]}</sub>", 'V'
        else:
            lbl, unit = f"<u>I</u><sub>{name.split('_',1)[1]}</sub>", 'A'
        add_row(lbl, z, unit)

    S = V * complex(I).conjugate()
    add_row('<u>S</u>', S, 'VA')

    def to_polar(z):
        return abs(z), math.degrees(cmath.phase(z))


    nature = 'kapazitiv' if I.imag > 0 else 'induktiv'

    return {
        'seed': base_seed,
        'mode': mode,
        'topo': topo_txt,
        'values': {
            'R': format_R(R), 'L': format_L(L), 'C': format_C(C),
            'V': format_V(V), 'f': format_freq(f)
        },
        'tasks': tasks,
        'nature': nature,
        'phasor_png': phasor_png,
        'blank_png': blank_png,
        'scale': {'Vstep': Vstep, 'Istep': Istep},
        'schematic': cfg['name'].replace('(', '').replace(')', '').replace('|', '_').replace('-', '_') + '.png',
        'zeiger': rows,
        'tags': {
            'zpair': zpair_tag,
            'v1': v1_tag, 'v2': v2_tag,
            'i1': i1_tag, 'i2': i2_tag
        },
    }


def check(inputs):
    if not STATE:
        return {}
    Z = STATE['Z']
    Zpar = STATE['Zpar']
    Ztot = STATE['Ztot']
    I = STATE['I']
    S = STATE['V'] * complex(I).conjugate()
    res = STATE['res']
    V = STATE['V']

    if res['type'] == 'series_parallel':
        s = res['series']
        p1, p2 = res['parallel']
        I_series = V / Ztot
        V_s = I_series * Z[s]
        V_par = I_series * Zpar
        I_p1 = V_par / Z[p1]
        I_p2 = V_par / Z[p2]
        V1_true, V2_true = V_s, V_par
        I1_true, I2_true = I_p1, I_p2
    else:
        single = res['single']
        s1, s2 = res['series_pair']
        Zseries = res['Zseries']
        I_single = V / Z[single]
        I_series = V / Zseries
        V_s1 = I_series * Z[s1]
        V_s2 = I_series * Z[s2]
        V1_true, V2_true = V_s1, V_s2
        I1_true, I2_true = I_single, I_series

    def ok(val, ref):
        tol = 0.01 * max(1.0, abs(ref))
        return abs(val - ref) <= tol

    out = {}
    for k, ref in {
        'zpar_re': Zpar.real, 'zpar_im': Zpar.imag,
        'zc_re': Z['C'].real, 'zc_im': Z['C'].imag,
        'zl_re': Z['L'].real, 'zl_im': Z['L'].imag,
        'z_re': Ztot.real, 'z_im': Ztot.imag,
        'i_re': I.real, 'i_im': I.imag,
        'v1_re': V1_true.real, 'v1_im': V1_true.imag,
        'v2_re': V2_true.real, 'v2_im': V2_true.imag,
        'i1_re': I1_true.real, 'i1_im': I1_true.imag,
        'i2_re': I2_true.real, 'i2_im': I2_true.imag,
        's_re': S.real, 's_im': S.imag,
    }.items():
        try:
            out[k] = ok(float(inputs.get(k, 'nan')), ref)
        except Exception:
            out[k] = False

    def ang(z):
        return math.degrees(cmath.phase(z))

    for k, ref in {
        'zpar_mag': abs(Zpar), 'zpar_phase': ang(Zpar),
        'zc_mag': abs(Z['C']), 'zc_phase': ang(Z['C']),
        'zl_mag': abs(Z['L']), 'zl_phase': ang(Z['L']),
        'z_mag': abs(Ztot), 'z_phase': ang(Ztot),
        'i_mag': abs(I), 'i_phase': ang(I),
        'v1_mag': abs(V1_true), 'v1_phase': ang(V1_true),
        'v2_mag': abs(V2_true), 'v2_phase': ang(V2_true),
        'i1_mag': abs(I1_true), 'i1_phase': ang(I1_true),
        'i2_mag': abs(I2_true), 'i2_phase': ang(I2_true),
        's_mag': abs(S), 's_phase': ang(S),
    }.items():
        try:
            out[k] = ok(float(inputs.get(k, 'nan')), ref)
        except Exception:
            out[k] = False

    nature_expected = 'kapazitiv' if I.imag > 0 else 'induktiv'
    out['nature'] = (inputs.get('nature') == nature_expected)
    return out
