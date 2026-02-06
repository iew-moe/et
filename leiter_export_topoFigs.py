import sys
from pathlib import Path


NETLIST_TEMPLATES = {
    "V_no_load": r"""V1 n1 0; down=2, v^<={$V_0$}, i_>={$I_0$}
R1 n1 n2; right=3, l={$R_L$}, v^>={$V_{R_L}$}
W1 n2 n3; down=2
W2 n3 0; left=3
""",
    "V_with_load": r"""V1 n1 0; down=2, v^<={$V_0$}, i_>={$I_0$}
R1 n1 n2; right=3, l={$R_L$}, v^>={$V_{R_L}$}
R2 n2 n3; down=2, l={$R_V$}, v^>={$V_{R_V}$}
W1 n3 0; left=3
""",
    "I_no_load": r"""I1 n1 0; down=2, i_>={$I_0$}
R1 n1 n2; right=3, l={$R_L$}, v^>={$V_{R_L}$}
W1 n2 n3; down=2
W2 n3 0; left=3
""",
    "I_with_load": r"""I1 n1 0; down=2, i_>={$I_0$}
R1 n1 n2; right=3, l={$R_L$}, v^>={$V_{R_L}$}
R2 n2 n3; down=2, l={$R_V$}, v^>={$V_{R_V}$}
W1 n3 0; left=3
""",
}


def render_all(out_dir: Path) -> None:
    try:
        from lcapy import Circuit
    except Exception as exc:
        raise SystemExit(f"lcapy/LaTeX nicht verfügbar: {exc}")

    out_dir.mkdir(parents=True, exist_ok=True)

    for key, netlist in NETLIST_TEMPLATES.items():
        cct = Circuit(netlist)
        if "V_" in key:
            cct["V1"].value = 10
        else:
            cct["I1"].value = 2
        cct["R1"].value = 10
        if "with_load" in key:
            cct["R2"].value = 20

        out_path = out_dir / f"leiter_{key}.png"
        # Draw to PNG; then clean LaTeX byproducts with the same basename.
        base_path = out_dir / f"leiter_{key}"
        cct.draw(
            str(base_path) + ".png",
            style="european",
            label_ids=False,
            label_values=False,
            label_nodes=False,
            draw_nodes=False,
            node_spacing=1.2,
            cpt_size=1.1,
            debug=1,
        )
        # Keep only the PNG for online use; delete LaTeX byproducts.
        for ext in (".tex", ".aux", ".log", ".pdf"):
            try:
                (out_dir / f"leiter_{key}{ext}").unlink()
            except (FileNotFoundError, PermissionError):
                pass
        print(f"ok: {base_path}.png")


def main() -> None:
    out_dir = Path("schematics/leiter_topologies_clean")
    if len(sys.argv) > 1:
        out_dir = Path(sys.argv[1])
    render_all(out_dir)


if __name__ == "__main__":
    main()
