import argparse
import json
import shutil
import tempfile
from pathlib import Path

import superposition_core


def _edge_to_list(edge):
    (x1, y1), (x2, y2) = edge
    return [[x1, y1], [x2, y2]]


def _serialize_component_map(component_map):
    out = []
    for edge, cid in sorted(component_map.items(), key=lambda kv: kv[0]):
        out.append({"edge": _edge_to_list(edge), "id": cid})
    return out


def _serialize_edges(edges):
    return [_edge_to_list(e) for e in sorted(edges)]


def topology_signature(case):
    source_type = {s["id"]: s["type"] for s in case["sources"]}
    items = []

    for edge, cid in case["component_map"].items():
        if cid in source_type:
            kind = f"S:{source_type[cid]}"
        else:
            kind = "R"
        items.append((edge, kind))

    for edge in case["wire_edges"]:
        items.append((tuple(sorted(edge)), "W"))

    items = sorted(items, key=lambda x: (x[0], x[1]))
    return json.dumps(
        [
            {
                "edge": _edge_to_list(e),
                "kind": k,
            }
            for e, k in items
        ],
        sort_keys=True,
        separators=(",", ":"),
    )


def export_topologies(count, seed_start, seed_end, out_dir, clean=True):
    out_path = Path(out_dir)
    if clean and out_path.exists():
        shutil.rmtree(out_path, ignore_errors=True)
    out_path.mkdir(parents=True, exist_ok=True)
    png_dir = out_path / "schematics"
    png_dir.mkdir(parents=True, exist_ok=True)

    seen = set()
    exported = []

    for seed in range(seed_start, seed_end + 1):
        if len(exported) >= count:
            break

        case = superposition_core.generate_case(str(seed))
        sig = topology_signature(case)
        if sig in seen:
            continue

        seen.add(sig)
        topo_id = len(exported) + 1
        target_resistor_id = case.get("target_resistor_id")

        # Build/render both variants (Spannung gesucht / Strom gesucht)
        case_v = dict(case)
        case_v["target_mode"] = "V"
        case_v["netlist"] = superposition_core.rebuild_case_netlist(
            case_v, target_mode="V", target_resistor_id=target_resistor_id
        )
        tmp_v_dir = Path(tempfile.mkdtemp(prefix="superpos_v_"))
        png_v_src, err_v = superposition_core.render_netlist_png(
            case_v,
            case_v["netlist"],
            filename_suffix=f"topo_{topo_id:03d}_V_tmp",
            out_dir=str(tmp_v_dir),
        )
        if not png_v_src:
            shutil.rmtree(tmp_v_dir, ignore_errors=True)
            print(f"[skip] Seed {seed}: render V failed ({err_v})")
            continue

        case_i = dict(case)
        case_i["target_mode"] = "I"
        case_i["netlist"] = superposition_core.rebuild_case_netlist(
            case_i, target_mode="I", target_resistor_id=target_resistor_id
        )
        tmp_i_dir = Path(tempfile.mkdtemp(prefix="superpos_i_"))
        png_i_src, err_i = superposition_core.render_netlist_png(
            case_i,
            case_i["netlist"],
            filename_suffix=f"topo_{topo_id:03d}_I_tmp",
            out_dir=str(tmp_i_dir),
        )
        if not png_i_src:
            shutil.rmtree(tmp_i_dir, ignore_errors=True)
            shutil.rmtree(tmp_v_dir, ignore_errors=True)
            print(f"[skip] Seed {seed}: render I failed ({err_i})")
            continue

        # Pre-render partial schematics for both modes (source 1 active / source 2 active).
        src_ids = [s["id"] for s in case["sources"]]
        if len(src_ids) != 2:
            shutil.rmtree(tmp_i_dir, ignore_errors=True)
            shutil.rmtree(tmp_v_dir, ignore_errors=True)
            print(f"[skip] Seed {seed}: expected 2 sources, got {len(src_ids)}")
            continue

        part_png_v = []
        part_png_i = []
        part_ok = True

        for active in src_ids:
            net_v_part = superposition_core.build_superposition_netlist(case_v, active_source_id=active, hint_mode="full")
            net_i_part = superposition_core.build_superposition_netlist(case_i, active_source_id=active, hint_mode="full")

            tmp_vp_dir = Path(tempfile.mkdtemp(prefix="superpos_vp_"))
            tmp_ip_dir = Path(tempfile.mkdtemp(prefix="superpos_ip_"))

            png_vp_src, err_vp = superposition_core.render_netlist_png(
                case_v,
                net_v_part,
                filename_suffix=f"topo_{topo_id:03d}_V_part_{active}_tmp",
                out_dir=str(tmp_vp_dir),
            )
            if not png_vp_src:
                part_ok = False
                print(f"[skip] Seed {seed}: render V part failed ({err_vp})")
                shutil.rmtree(tmp_vp_dir, ignore_errors=True)
                shutil.rmtree(tmp_ip_dir, ignore_errors=True)
                break

            png_ip_src, err_ip = superposition_core.render_netlist_png(
                case_i,
                net_i_part,
                filename_suffix=f"topo_{topo_id:03d}_I_part_{active}_tmp",
                out_dir=str(tmp_ip_dir),
            )
            if not png_ip_src:
                part_ok = False
                print(f"[skip] Seed {seed}: render I part failed ({err_ip})")
                shutil.rmtree(tmp_vp_dir, ignore_errors=True)
                shutil.rmtree(tmp_ip_dir, ignore_errors=True)
                break

            topo_png_vp = png_dir / f"topo_{topo_id:03d}_V_part_{active}.png"
            topo_png_ip = png_dir / f"topo_{topo_id:03d}_I_part_{active}.png"
            shutil.copy2(png_vp_src, topo_png_vp)
            shutil.copy2(png_ip_src, topo_png_ip)
            part_png_v.append({"active_source": active, "png": f"schematics/{topo_png_vp.name}"})
            part_png_i.append({"active_source": active, "png": f"schematics/{topo_png_ip.name}"})

            shutil.rmtree(tmp_vp_dir, ignore_errors=True)
            shutil.rmtree(tmp_ip_dir, ignore_errors=True)

        if not part_ok:
            shutil.rmtree(tmp_i_dir, ignore_errors=True)
            shutil.rmtree(tmp_v_dir, ignore_errors=True)
            continue

        topo_png_v = png_dir / f"topo_{topo_id:03d}_V.png"
        topo_png_i = png_dir / f"topo_{topo_id:03d}_I.png"
        shutil.copy2(png_v_src, topo_png_v)
        shutil.copy2(png_i_src, topo_png_i)
        shutil.rmtree(tmp_v_dir, ignore_errors=True)
        shutil.rmtree(tmp_i_dir, ignore_errors=True)

        exported.append(
            {
                "topology_id": topo_id,
                "generation_seed": seed,
                "png_v": f"schematics/{topo_png_v.name}",
                "png_i": f"schematics/{topo_png_i.name}",
                "part_png_v": part_png_v,
                "part_png_i": part_png_i,
                "grid": case["grid"],
                "netlist_v": case_v["netlist"],
                "netlist_i": case_i["netlist"],
                "sources": case["sources"],
                "resistors": case["resistors"],
                "target_resistor_id": target_resistor_id,
                "resistor_ids": case.get("resistor_ids"),
                "component_map": _serialize_component_map(case["component_map"]),
                "wire_edges": _serialize_edges(case["wire_edges"]),
            }
        )
        print(f"[ok] topology {topo_id:03d} <- seed {seed}")

    meta = {
        "schema_version": 1,
        "description": "Pre-rendered superposition topologies for web/pyodide.",
        "count": len(exported),
        "items": exported,
    }
    (out_path / "topologies.json").write_text(
        json.dumps(meta, ensure_ascii=False, indent=2), encoding="utf-8"
    )

    # Keep only PNGs in schematics output (circuitikz may leave TeX helper files).
    for f in png_dir.glob("*"):
        if f.is_file() and f.suffix.lower() != ".png":
            try:
                f.unlink()
            except Exception:
                pass

    print(f"\nExported {len(exported)} topology/topologies to: {out_path}")
    print(f"Metadata: {out_path / 'topologies.json'}")


def main():
    parser = argparse.ArgumentParser(
        description="Export pre-rendered unique superposition topologies."
    )
    parser.add_argument("--count", type=int, default=5, help="Number of unique topologies.")
    parser.add_argument("--seed-start", type=int, default=1000, help="Start seed.")
    parser.add_argument("--seed-end", type=int, default=5000, help="End seed.")
    parser.add_argument(
        "--out-dir",
        default="superposition_topologies",
        help="Output directory for JSON + PNG files.",
    )
    parser.add_argument(
        "--no-clean",
        action="store_true",
        help="Do not delete existing output directory before export.",
    )
    args = parser.parse_args()

    export_topologies(
        count=args.count,
        seed_start=args.seed_start,
        seed_end=args.seed_end,
        out_dir=args.out_dir,
        clean=not args.no_clean,
    )


if __name__ == "__main__":
    main()
