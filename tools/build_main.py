#!/usr/bin/env python3
"""Génère assets/js/main.js depuis tools/main.template.js + tools/logo-paths.json + tools/icons.json."""
import json
from pathlib import Path
T = Path(__file__).resolve().parent
L = json.loads((T / "logo-paths.json").read_text())
I = json.loads((T / "icons.json").read_text())
js = (T / "main.template.js").read_text()
for k, v in {"__TOP__": L["top"], "__LOW__": L["low"], "__WORD__": "".join(L["word"]),
             "__MV__": L["MV"], "__WV__": L["WV"], "__FV__": L["FV"],
             "__WA__": I["WA"], "__LI__": I["LI"], "__FLAGS__": I["FLAGS"]}.items():
    js = js.replace(k, v)
(T.parent / "assets" / "js" / "main.js").write_text(js)
print("main.js OK", js.count("__") - js.count("window.__lang") - js.count("__lang"))
