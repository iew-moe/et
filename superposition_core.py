import math
import random
import re
from pathlib import Path


E12_SERIES = [1.0, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2]


def round_e12(x):
    if x <= 0:
        return x
    exp = math.floor(math.log10(x))
    base = 10 ** exp
    frac = x / base
    nearest = min(E12_SERIES, key=lambda v: abs(v - frac))
    return nearest * base


def _rng_from_seed(seed_text):
    if isinstance(seed_text, str) and seed_text.strip().isdigit():
        seed = int(seed_text.strip())
    else:
        seed = random.randint(100000, 999999)
    return random.Random(seed), seed


def _target_mode_from_seed(seed):
    # Even last digit -> voltage task, odd -> current task.
    return "I" if (seed % 2) else "V"


def _pick_source(rng, idx):
    typ = rng.choice(["V", "I"])
    if typ == "V":
        val = float(rng.choice([1, 5, 12, 24, 230, 400]))
        unit = "V"
        name = f"V{idx}"
    else:
        val = float(rng.choice([1, 16, 32, 50]))
        unit = "A"
        name = f"I{idx}"
    return {"type": typ, "id": name, "value": val, "unit": unit}


def _pick_resistors(rng, n=4):
    # 1-2-5-Reihe (Dekaden) im Bereich 1 ... 1000 Ohm.
    vals_125 = []
    for exp in range(0, 4):
        decade = 10 ** exp
        for b in (1.0, 2.0, 5.0):
            r = b * decade
            if 1 <= r <= 1000:
                vals_125.append(float(r))
    if 1000.0 not in vals_125:
        vals_125.append(1000.0)
    return [rng.choice(vals_125) for _ in range(n)]


def _resistor_id_list(n, start_index=3):
    return [f"R{i}" for i in range(start_index, start_index + n)]


def _resistor_pairs(case):
    ids = case.get("resistor_ids")
    vals = case.get("resistors", [])
    if ids is None:
        ids = [f"R{i}" for i in range(1, len(vals) + 1)]
    return list(zip(ids, vals))


def _node_id(x, y):
    return f"n{x}_{y}"


def _edge_key(a, b):
    return tuple(sorted((a, b)))


def _all_grid_edges(nx, ny):
    edges = []
    for y in range(ny + 1):
        for x in range(nx):
            edges.append(((x, y), (x + 1, y)))
    for x in range(nx + 1):
        for y in range(ny):
            edges.append(((x, y), (x, y + 1)))
    return edges


def _expand_segment(a, b):
    x1, y1 = a
    x2, y2 = b
    if x1 != x2 and y1 != y2:
        return None
    pts = [a]
    if x1 == x2:
        step = 1 if y2 > y1 else -1
        for y in range(y1 + step, y2 + step, step):
            pts.append((x1, y))
    else:
        step = 1 if x2 > x1 else -1
        for x in range(x1 + step, x2 + step, step):
            pts.append((x, y1))
    return pts


def _expand_polyline(points):
    if len(points) < 2:
        return None
    out = [points[0]]
    for i in range(len(points) - 1):
        seg = _expand_segment(points[i], points[i + 1])
        if seg is None:
            return None
        out.extend(seg[1:])
    # remove possible duplicates caused by zero-length corners
    dedup = [out[0]]
    for p in out[1:]:
        if p != dedup[-1]:
            dedup.append(p)
    return dedup


def _path_edges(path_nodes):
    return [_edge_key(path_nodes[i], path_nodes[i + 1]) for i in range(len(path_nodes) - 1)]


def _edge_hint(a, b):
    (x1, y1), (x2, y2) = a, b
    if x2 > x1:
        return "right=2"
    if x2 < x1:
        return "left=2"
    if y2 > y1:
        return "up=2"
    return "down=2"


def _line(name, a, b, hint_mode="none", extra_opts=None, ground_node=None):
    n1 = "0" if ground_node is not None and a == ground_node else _node_id(*a)
    n2 = "0" if ground_node is not None and b == ground_node else _node_id(*b)
    base = f"{name} {n1} {n2}"
    opts = []
    if hint_mode == "full":
        opts.append(_edge_hint(a, b))
    elif hint_mode == "horizontal_only":
        (x1, y1), (x2, y2) = a, b
        if y1 == y2:
            opts.append(_edge_hint(a, b))
    if extra_opts:
        opts.extend(extra_opts)
    if not opts:
        return base
    return f"{base}; " + ", ".join(opts)


def _adjacency(edges):
    adj = {}
    for a, b in edges:
        adj.setdefault(a, set()).add(b)
        adj.setdefault(b, set()).add(a)
    return adj


def _shortest_path_edges(start, goal, all_edges):
    from collections import deque

    adj = _adjacency(all_edges)
    q = deque([start])
    prev = {start: None}
    while q:
        u = q.popleft()
        if u == goal:
            break
        for v in adj.get(u, ()):
            if v not in prev:
                prev[v] = u
                q.append(v)
    if goal not in prev:
        return None
    path_nodes = []
    cur = goal
    while cur is not None:
        path_nodes.append(cur)
        cur = prev[cur]
    path_nodes.reverse()
    return [_edge_key(path_nodes[i], path_nodes[i + 1]) for i in range(len(path_nodes) - 1)]


def _shortest_path_edges_avoiding(start, goal, all_edges, blocked_keys):
    from collections import deque

    adj = {}
    for a, b in all_edges:
        ek = _edge_key(a, b)
        if ek in blocked_keys:
            continue
        adj.setdefault(a, set()).add(b)
        adj.setdefault(b, set()).add(a)

    q = deque([start])
    prev = {start: None}
    while q:
        u = q.popleft()
        if u == goal:
            break
        for v in adj.get(u, ()):
            if v not in prev:
                prev[v] = u
                q.append(v)

    if goal not in prev:
        return None

    path_nodes = []
    cur = goal
    while cur is not None:
        path_nodes.append(cur)
        cur = prev[cur]
    path_nodes.reverse()
    return [_edge_key(path_nodes[i], path_nodes[i + 1]) for i in range(len(path_nodes) - 1)]


def _component_endpoint_sets(component_edges):
    # Union-find on component-only graph to determine disconnected groups.
    parent = {}

    def find(x):
        parent.setdefault(x, x)
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]

    def union(a, b):
        ra, rb = find(a), find(b)
        if ra != rb:
            parent[rb] = ra

    nodes = set()
    for a, b in component_edges:
        nodes.add(a)
        nodes.add(b)
        union(a, b)

    groups = {}
    for n in nodes:
        groups.setdefault(find(n), set()).add(n)
    return list(groups.values())


def _has_cycle(edges):
    parent = {}

    def find(x):
        parent.setdefault(x, x)
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]

    def union(a, b):
        ra, rb = find(a), find(b)
        if ra == rb:
            return True
        parent[rb] = ra
        return False

    for a, b in edges:
        if union(a, b):
            return True
    return False


def _prune_open_wire_stubs(component_keys, wire_keys):
    # Remove wire-only dangling branches iteratively:
    # if a node has degree 1 and that only edge is a wire, delete that wire.
    wire_keys = set(wire_keys)
    changed = True
    while changed:
        changed = False
        final_keys = set(component_keys) | set(wire_keys)
        deg = {}
        incident = {}
        for ek in final_keys:
            a, b = ek
            deg[a] = deg.get(a, 0) + 1
            deg[b] = deg.get(b, 0) + 1
            incident.setdefault(a, []).append(ek)
            incident.setdefault(b, []).append(ek)

        for node, d in list(deg.items()):
            if d != 1:
                continue
            edge = incident[node][0]
            if edge in wire_keys:
                wire_keys.remove(edge)
                changed = True
                break

    return wire_keys


def _break_wire_cycles(component_keys, wire_keys):
    """
    Remove redundant wire-only loops by keeping only a spanning forest of
    wire edges. Component edges are untouched.
    """
    parent = {}

    def find(x):
        parent.setdefault(x, x)
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]

    def union(a, b):
        ra, rb = find(a), find(b)
        if ra == rb:
            return False
        parent[rb] = ra
        return True

    keep = set()
    for ek in sorted(set(wire_keys), key=lambda e: (e[0], e[1])):
        a, b = ek
        if union(a, b):
            keep.add(ek)
    return keep


def _make_grid_topology(rng):
    # Fixed 10x10 node grid.
    nx = 10
    ny = 10

    # Start with center unit square.
    a = (5, 5)
    b = (6, 5)
    c = (6, 6)
    d = (5, 6)
    square = [_edge_key(a, b), _edge_key(b, c), _edge_key(c, d), _edge_key(d, a)]

    # Build component pool: 2 sources + 3..5 resistors.
    n_res = rng.choices([3, 4, 5], weights=[45, 35, 20], k=1)[0]
    comp_ids = ["S1", "S2"] + [f"R{i}" for i in range(1, n_res + 1)]

    # Initial loop: 2..4 components, with at least one source.
    k0 = rng.randint(2, 4)
    first_source = rng.choice(["S1", "S2"])
    remaining_pool = [x for x in comp_ids if x != first_source]
    init_comp_ids = [first_source] + rng.sample(remaining_pool, k0 - 1)
    left_ids = [x for x in comp_ids if x not in init_comp_ids]

    comp_map = {}
    init_edges = rng.sample(square, k0)
    for cid, ek in zip(init_comp_ids, init_edges):
        comp_map[ek] = cid

    used_keys = set(square)
    node_set = {a, b, c, d}
    wire_keys = used_keys - set(comp_map.keys())

    # Expand by connecting two existing nodes with an outside polyline branch.
    while left_ids:
        max_put = min(len(left_ids), 4)
        put_now = rng.randint(1, max_put)

        nodes = list(node_set)
        found = False
        for _ in range(200):
            u, v = rng.sample(nodes, 2)
            minx = min(n[0] for n in node_set)
            maxx = max(n[0] for n in node_set)
            miny = min(n[1] for n in node_set)
            maxy = max(n[1] for n in node_set)

            side = rng.choice(["top", "bottom", "left", "right"])
            if side == "top":
                y_out = min(ny - 1, maxy + rng.randint(1, 2))
                poly = [u, (u[0], y_out), (v[0], y_out), v]
            elif side == "bottom":
                y_out = max(0, miny - rng.randint(1, 2))
                poly = [u, (u[0], y_out), (v[0], y_out), v]
            elif side == "right":
                x_out = min(nx - 1, maxx + rng.randint(1, 2))
                poly = [u, (x_out, u[1]), (x_out, v[1]), v]
            else:
                x_out = max(0, minx - rng.randint(1, 2))
                poly = [u, (x_out, u[1]), (x_out, v[1]), v]

            path_nodes = _expand_polyline(poly)
            if not path_nodes or len(path_nodes) < 3:
                continue
            path_keys = _path_edges(path_nodes)
            if any(ek in used_keys for ek in path_keys):
                continue
            # New branch should go outside current bounding box (except endpoints).
            internal = path_nodes[1:-1]
            if not internal:
                continue
            if not any((p[0] < minx or p[0] > maxx or p[1] < miny or p[1] > maxy) for p in internal):
                continue
            if len(path_keys) < put_now:
                continue

            # Place put_now components on this path.
            chosen_edges = rng.sample(path_keys, put_now)
            assign_ids = rng.sample(left_ids, put_now)
            for cid, ek in zip(assign_ids, chosen_edges):
                comp_map[ek] = cid
                left_ids.remove(cid)

            for ek in path_keys:
                used_keys.add(ek)
                if ek not in comp_map:
                    wire_keys.add(ek)
            node_set.update(path_nodes)
            found = True
            break

        if not found:
            # Fallback: if we cannot place additional branch, put all remaining components
            # on currently used wire edges to finish a valid connected closed network.
            candidates = [ek for ek in wire_keys if ek not in comp_map]
            if not candidates:
                break
            put_now = min(len(left_ids), len(candidates))
            chosen_edges = rng.sample(candidates, put_now)
            assign_ids = rng.sample(left_ids, put_now)
            for cid, ek in zip(assign_ids, chosen_edges):
                comp_map[ek] = cid
                left_ids.remove(cid)

    component_keys = set(comp_map.keys())
    wire_keys = used_keys - component_keys

    # Avoid ideal wire loops; simplify wire-only subgraph to a forest.
    wire_keys = _break_wire_cycles(component_keys, wire_keys)
    # Then clean up remaining dangling wire stubs.
    wire_keys = _prune_open_wire_stubs(component_keys, wire_keys)

    component_edges = [(ek[0], ek[1]) for ek in component_keys]
    wire_edges = [(ek[0], ek[1]) for ek in wire_keys]

    return {
        "nx": nx,
        "ny": ny,
        "component_edges": component_edges,
        "wire_edges": wire_edges,
        "component_map": comp_map,
        "total_edges_used": len(component_edges) + len(wire_edges),
        "n_res": n_res,
    }


def _has_open_ends(component_edges, wire_edges):
    deg = {}
    for a, b in list(component_edges) + list(wire_edges):
        deg[a] = deg.get(a, 0) + 1
        deg[b] = deg.get(b, 0) + 1
    return any(d == 1 for d in deg.values())


def _build_netlist_from_grid(
    grid,
    comp_id_map,
    sources=None,
    target_resistor_id=None,
    target_mode="V",
    component_hint_mode="full",
    wire_hint_mode="none",
):
    # comp_id_map keys are edge keys: ((x1,y1),(x2,y2)) sorted.
    source_type = {}
    if sources:
        for src in sources:
            source_type[src["id"]] = src["type"]

    def _v_lbl(idx):
        return f"\\color{{blue}}{{\\mathrm{{V}}_{{{idx}}}}}"

    def _i_lbl(idx):
        return f"\\color{{red}}{{\\mathrm{{I}}_{{{idx}}}}}"

    def _vr_lbl(idx):
        return f"\\color{{blue}}{{\\mathrm{{V}}_{{\\mathrm{{R}}{idx}}}}}"

    def _ir_lbl(idx):
        return f"\\color{{red}}{{\\mathrm{{I}}_{{\\mathrm{{R}}{idx}}}}}"

    def _idx(name):
        digits = "".join(ch for ch in name if ch.isdigit())
        return digits if digits else "?"

    lines = []
    all_nodes = set()
    for ek in comp_id_map.keys():
        all_nodes.add(ek[0])
        all_nodes.add(ek[1])
    for a, b in grid["wire_edges"]:
        all_nodes.add(a)
        all_nodes.add(b)
    ground_node = sorted(all_nodes)[0] if all_nodes else None

    for ek, cid in comp_id_map.items():
        extra = []
        typ = source_type.get(cid)
        if typ == "V":
            # Voltage source: source label is shown on arrow (not on component body).
            i = _idx(cid)
            extra.append(f"v^>=${_v_lbl(i)}$")
        elif typ == "I":
            # Current source: source label is shown on arrow (not on component body).
            i = _idx(cid)
            extra.append(f"i_>=${_i_lbl(i)}$")
        elif target_resistor_id is not None and cid == target_resistor_id:
            # Exactly one selected resistor: show target arrow (V or I).
            i = _idx(cid)
            if target_mode == "I":
                extra.append(f"i_>=${_ir_lbl(i)}$")
            else:
                extra.append(f"v^>=${_vr_lbl(i)}$")
        if cid.startswith("R"):
            i = _idx(cid)
            extra.append(f"l=$\\mathrm{{R}}_{{{i}}}$")
        lines.append(
            _line(
                cid,
                ek[0],
                ek[1],
                hint_mode=component_hint_mode,
                extra_opts=extra,
                ground_node=ground_node,
            )
        )

    for i, e in enumerate(grid["wire_edges"], start=1):
        lines.append(
            _line(
                f"W{i}",
                e[0],
                e[1],
                hint_mode=wire_hint_mode,
                ground_node=ground_node,
            )
        )

    return "\n".join(lines)


def rebuild_case_netlist(case, target_mode=None, target_resistor_id=None):
    mode = target_mode or case.get("target_mode", "V")
    rid = target_resistor_id or case.get("target_resistor_id")
    grid_stub = {"wire_edges": case["wire_edges"]}
    return _build_netlist_from_grid(
        grid_stub,
        case["component_map"],
        sources=case.get("sources"),
        target_resistor_id=rid,
        target_mode=mode,
        component_hint_mode="full",
        wire_hint_mode="full",
    )


def generate_case(seed_text=""):
    rng, seed = _rng_from_seed(seed_text)
    last_case = None
    for iteration in range(1, 251):
        grid = _make_grid_topology(rng)

        sources = [_pick_source(rng, 1), _pick_source(rng, 2)]
        resistors = _pick_resistors(rng, grid["n_res"])
        resistor_ids = _resistor_id_list(grid["n_res"], start_index=3)
        target_mode = _target_mode_from_seed(seed)

        # Resolve placeholder IDs (S1/S2) to actual source IDs (V1/I1...).
        id_map = {"S1": sources[0]["id"], "S2": sources[1]["id"]}
        for i in range(1, grid["n_res"] + 1):
            id_map[f"R{i}"] = resistor_ids[i - 1]

        comp_id_map = {}
        for ek, cid in grid["component_map"].items():
            comp_id_map[ek] = id_map[cid]

        target_resistor_id = rng.choice(resistor_ids) if resistor_ids else None

        netlist = _build_netlist_from_grid(
            grid,
            comp_id_map,
            sources=sources,
            target_resistor_id=target_resistor_id,
            target_mode=target_mode,
            component_hint_mode="full",
            wire_hint_mode="full",
        )

        case = {
            "seed": seed,
            "iterations": iteration,
            "topology": "Grid-basiertes Netz",
            "grid": {"Nx": grid["nx"], "Ny": grid["ny"], "used_edges": grid["total_edges_used"]},
            "component_edges": grid["component_edges"],
            "wire_edges": grid["wire_edges"],
            "component_map": comp_id_map,
            "target_resistor_id": target_resistor_id,
            "target_mode": target_mode,
            "resistor_ids": resistor_ids,
            "sources": sources,
            "resistors": resistors,
            "netlist": netlist,
        }
        last_case = case
        try:
            case["solved_values"] = solve_case_values(case)

            # Reject trivial cases: any element (sources or resistors)
            # with near-zero voltage or current.
            zero_tol = 1e-9
            has_zero_vi = False
            for _, vi in case["solved_values"].items():
                if abs(vi["V"]) <= zero_tol or abs(vi["I"]) <= zero_tol:
                    has_zero_vi = True
                    break
            if has_zero_vi:
                continue

            # Superposition quality gate:
            # both partial target voltages must be non-zero and different.
            sp = solve_superposition(case)
            target = sp["target_resistor"]
            parts = sp["parts"]
            if len(parts) != 2:
                continue

            if target_mode == "I":
                v1 = parts[0]["target_current"]
                v2 = parts[1]["target_current"]
            else:
                v1 = parts[0]["target_voltage"]
                v2 = parts[1]["target_voltage"]
            if v1 is None or v2 is None:
                continue

            abs_tol = 1e-9
            rel_tol = 1e-3

            def _is_zero(z):
                return abs(z) <= abs_tol

            def _is_same(a, b):
                scale = max(abs(a), abs(b), 1.0)
                return abs(a - b) <= max(abs_tol, rel_tol * scale)

            if _is_zero(v1) or _is_zero(v2):
                continue
            if _is_same(v1, v2):
                continue

            case["superposition"] = sp
            case["target_resistor"] = target
            return case
        except Exception:
            continue

    # Fallback if no solvable case found within retries.
    if last_case is not None and "iterations" not in last_case:
        last_case["iterations"] = 250
    return last_case


def render_case_png(case, out_dir="schematics/superposition"):
    out_path = Path(out_dir)
    out_path.mkdir(parents=True, exist_ok=True)
    file_name = f"superposition_{case['seed']}.png"
    img_path = out_path / file_name

    try:
        import shutil
        if not (shutil.which("latex") or shutil.which("pdflatex")):
            raise RuntimeError("TeX not available")

        from lcapy import Circuit

        # Try hint-preserving netlists (strictly with component hints).
        netlists_to_try = [case["netlist"]]
        if "component_map" in case and "wire_edges" in case:
            grid_stub = {
                "wire_edges": case["wire_edges"],
            }
            netlists_to_try.append(
                _build_netlist_from_grid(
                    grid_stub,
                    case["component_map"],
                    sources=case.get("sources"),
                    target_resistor_id=case.get("target_resistor_id"),
                    target_mode=case.get("target_mode", "V"),
                    component_hint_mode="horizontal_only",
                    wire_hint_mode="none",
                )
            )

        last_err = None
        for net in netlists_to_try:
            try:
                net_draw = _invert_vsource_arrow_for_draw(net)
                cct = Circuit(net_draw)
                _set_element_values(cct, case)

                cct.draw(
                    str(img_path),
                    style="european",
                    label_values=True,
                    label_nodes=False,
                    draw_nodes="none",
                    node_spacing=1.6,
                    cpt_size=1.2,
                    scale=1.0,
                    debug=False,
                )
                case["netlist"] = net
                return str(img_path), None
            except Exception as inner_exc:
                last_err = inner_exc
                continue
        return None, str(last_err)
    except Exception as exc:
        return None, str(exc)


def _source_value(src, invert_sources=False):
    val = src["value"]
    if invert_sources and src.get("type") == "I":
        return -val
    return val



def _invert_vsource_arrow_for_draw(netlist):
    # Invert only source voltage arrows: v^>=$...V_1...$ -> v^<=$...V_1...$
    # Keep target resistor arrows (V_Rx) unchanged.
    return re.sub(
        r"v\^>=(\$[^$\n]*\\mathrm\{V\}_\{\d+\}[^$\n]*\$)",
        r"v^<=\1",
        netlist,
    )

def _set_element_values(cct, case, invert_sources=False):
    for src in case["sources"]:
        if src["id"] in cct.elements:
            cct[src["id"]].value = _source_value(src, invert_sources=invert_sources)
    for rid, r in _resistor_pairs(case):
        if rid in cct.elements:
            cct[rid].value = r


def render_netlist_png(case, netlist, filename_suffix, out_dir="schematics/superposition"):
    out_path = Path(out_dir)
    out_path.mkdir(parents=True, exist_ok=True)
    img_path = out_path / f"superposition_{case['seed']}_{filename_suffix}.png"

    try:
        import shutil
        if not (shutil.which("latex") or shutil.which("pdflatex")):
            raise RuntimeError("TeX not available")
        from lcapy import Circuit

        net_draw = _invert_vsource_arrow_for_draw(netlist)
        cct = Circuit(net_draw)
        _set_element_values(cct, case)
        cct.draw(
            str(img_path),
            style="european",
            label_values=True,
            label_nodes=False,
            draw_nodes="none",
            node_spacing=1.6,
            cpt_size=1.2,
            scale=1.0,
            debug=False,
        )
        return str(img_path), None
    except Exception as exc:
        return None, str(exc)


def _complex_from_lcapy(value):
    try:
        return complex(value)
    except Exception:
        pass
    try:
        return complex(value.evalf())
    except Exception:
        pass
    try:
        cval = value.cval
        return complex(cval)
    except Exception:
        pass
    try:
        sym = value.sympy
        return complex(sym.evalf())
    except Exception:
        pass
    return complex(float(value), 0.0)


def solve_case_values(case):
    from lcapy import Circuit

    cct = Circuit(case["netlist"])
    _set_element_values(cct, case, invert_sources=False)

    subs = {}
    for src in case["sources"]:
        subs[src["id"]] = _source_value(src, invert_sources=False)
    for rid, r in _resistor_pairs(case):
        subs[rid] = r

    source_ids = [src["id"] for src in case["sources"]]
    resistor_ids = [rid for rid, _ in _resistor_pairs(case)]
    ids = source_ids + resistor_ids

    result = {}
    for name in ids:
        elem = cct[name]
        v_expr = elem.V.time().subs(subs)
        i_expr = elem.I.time().subs(subs)
        v = _complex_from_lcapy(v_expr)
        i = _complex_from_lcapy(i_expr)
        result[name] = {"V": v, "I": i}

    return result


def solve_values_for_netlist(case, netlist):
    from lcapy import Circuit

    cct = Circuit(netlist)
    _set_element_values(cct, case, invert_sources=False)

    subs = {}
    for src in case["sources"]:
        subs[src["id"]] = _source_value(src, invert_sources=False)
    for rid, r in _resistor_pairs(case):
        subs[rid] = r

    ids = [name for name in cct.elements.keys() if name.startswith(("V", "I", "R"))]
    result = {}
    for name in ids:
        elem = cct[name]
        v_expr = elem.V.time().subs(subs)
        i_expr = elem.I.time().subs(subs)
        result[name] = {"V": _complex_from_lcapy(v_expr), "I": _complex_from_lcapy(i_expr)}
    return result


def build_superposition_netlist(case, active_source_id, hint_mode="full"):
    source_types = {s["id"]: s["type"] for s in case["sources"]}

    def _v_lbl(idx):
        return f"\\color{{blue}}{{\\mathrm{{V}}_{{{idx}}}}}"

    def _i_lbl(idx):
        return f"\\color{{red}}{{\\mathrm{{I}}_{{{idx}}}}}"

    def _vr_lbl(idx):
        return f"\\color{{blue}}{{\\mathrm{{V}}_{{\\mathrm{{R}}{idx}}}}}"

    def _ir_lbl(idx):
        return f"\\color{{red}}{{\\mathrm{{I}}_{{\\mathrm{{R}}{idx}}}}}"

    def _idx(name):
        digits = "".join(ch for ch in name if ch.isdigit())
        return digits if digits else "?"
    ground_node = None
    all_nodes = set()
    for ek in case["component_map"].keys():
        all_nodes.add(ek[0])
        all_nodes.add(ek[1])
    for a, b in case["wire_edges"]:
        all_nodes.add(a)
        all_nodes.add(b)
    if all_nodes:
        ground_node = sorted(all_nodes)[0]

    lines = []
    k_short = 1
    k_open = 1
    for ek, cid in case["component_map"].items():
        if cid in source_types and cid != active_source_id:
            st = source_types[cid]
            if st == "V":
                # Deactivate voltage source by short circuit.
                lines.append(
                    _line(
                        f"Wz{k_short}",
                        ek[0],
                        ek[1],
                        hint_mode=hint_mode,
                        ground_node=ground_node,
                    )
                )
                k_short += 1
            else:
                # Deactivate current source by open circuit.
                lines.append(
                    _line(
                        f"Oz{k_open}",
                        ek[0],
                        ek[1],
                        hint_mode=hint_mode,
                        ground_node=ground_node,
                    )
                )
                k_open += 1
            continue

        extra = []
        if cid in source_types:
            if source_types[cid] == "V":
                i = _idx(cid)
                extra.append(f"v^>=${_v_lbl(i)}$")
            else:
                i = _idx(cid)
                extra.append(f"i_>=${_i_lbl(i)}$")
        elif cid == case.get("target_resistor_id"):
            i = _idx(cid)
            if case.get("target_mode", "V") == "I":
                extra.append(f"i_>=${_ir_lbl(i)}$")
            else:
                extra.append(f"v^>=${_vr_lbl(i)}$")
        if cid.startswith("R"):
            i = _idx(cid)
            extra.append(f"l=$\\mathrm{{R}}_{{{i}}}$")
        lines.append(
            _line(
                cid,
                ek[0],
                ek[1],
                hint_mode=hint_mode,
                extra_opts=extra,
                ground_node=ground_node,
            )
        )

    for i, e in enumerate(case["wire_edges"], start=1):
        lines.append(_line(f"W{i}", e[0], e[1], hint_mode=hint_mode, ground_node=ground_node))

    return "\n".join(lines)


def solve_superposition(case, target_resistor=None):
    default_target = (case.get("resistor_ids") or ["R3"])[0]
    target = target_resistor or case.get("target_resistor_id") or default_target
    parts = []
    for src in case["sources"]:
        net = build_superposition_netlist(case, active_source_id=src["id"], hint_mode="full")
        vals = solve_values_for_netlist(case, net)
        parts.append(
            {
                "active_source": src["id"],
                "netlist": net,
                "values": vals,
                "target_voltage": vals.get(target, {}).get("V"),
                "target_current": vals.get(target, {}).get("I"),
            }
        )
    return {"target_resistor": target, "parts": parts}
