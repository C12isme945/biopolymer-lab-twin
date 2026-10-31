# BioPolymer Lab Twin — Aholo Hackathon (solo: Yansong Li)

Static, interactive "digital lab twin" demo for a biopolymer lab. Click stations
(Reactor, Rheometer, HPLC, Formulation bench, Sample vials CMC / Chitosan / HA)
to see parameter panels. The HA station embeds a Lux3D GLB via `model-viewer`.

**ALL DATA IS EXAMPLE PLACEHOLDER DATA** — not real or proprietary formulations.

## Run
```bash
cd /workspace/aholo-lab-twin
python3 -m http.server 8000
# open http://localhost:8000
```
No build step and no paid APIs. The page loads Google’s `model-viewer` script
once over the network to display GLB files; offline, the rest of the UI still works.

## Lux3D assets
| Slot | Status |
| --- | --- |
| asset-vial-ha | FILLED — `assets/ha-serum-bottle.glb` (Lux3D “HA Serum Bottle”) |
| asset-vial-cmc | FILLED — `assets/cmc-serum-bottle.glb` |
| asset-vial-chitosan / reactor / rheometer / hplc / bench / lab-room | EMPTY / UNVERIFIED |

See `PLACEHOLDERS.md`. Project report draft: `report/report.pdf`.

## Deadline
Submission deadline: **2026-11-19 19:00 SGT** (My Submission: https://www.aholo.ai/hackathon/my).
Optional later: share with #Manycorehackathon (needs your OK before posting).
