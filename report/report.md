# BioPolymer Lab Twin

**An interactive web-based digital twin of a biopolymer formulation lab, built with Lux3D 3D assets**

*Aholo Hackathon — Project Report (DRAFT, 2026-10-31 SGT)*

> **EXAMPLE-DATA NOTICE:** Every formulation, process, or instrument number in this report and in the demo is **EXAMPLE** placeholder data. None of it is a real, measured, or proprietary formulation.

---

## 1. Team

| Role | Name | Location |
|---|---|---|
| Solo builder (concept, 3D assets, web build, report) | **Yansong Li** | Singapore |

Team type: **Solo**.

---

## 2. Concept

Biopolymer labs work with materials such as **CMC (carboxymethyl cellulose)**, **chitosan**, and **hyaluronic acid (HA)**. The work runs across several stations: a reactor, a rheometer, HPLC/SEC, a formulation bench, and sample vials. The context for each sample (process conditions, concentration, molecular weight, viscosity) usually ends up scattered across notebooks and spreadsheets.

**BioPolymer Lab Twin** is a lightweight, browser-based "digital lab twin":

- Each lab station and sample vial is a clickable tile in the web page.
- Clicking a station opens a parameter panel that shows its (EXAMPLE) process and material data.
- Each station has a 3D asset slot. When a slot is filled with a Lux3D-generated GLB model, the model renders in the page with orbit/rotate controls.
- The goal is a lab that is easy to understand at a glance for onboarding, teaching, outreach, and planning experiments, without CAD skills or a 3D artist.

---

## 3. Why Lux3D

- **Text/image → 3D, fast.** Each lab object (vial, reactor, rheometer, HPLC stack, bench, lab room) can be described in one prompt, or started from a reference photo. Hand-modelling every piece of equipment isn't practical for a solo hackathon build.
- **Web-ready output.** Lux3D exports **GLB**, which goes straight into a standard web viewer (`<model-viewer>`) without conversion.
- **Consistent asset pipeline.** The same prompt-to-GLB-to-slot workflow works for every station, so the twin can grow one asset at a time.
- **Low cost to try.** The first asset was generated on the **free trial**. The account's **3,300 credits are untouched**.

---

## 4. Build Process

### 4.1 Idea
- Pick the stations that matter in a biopolymer formulation workflow: Reactor, Rheometer, HPLC, Formulation bench, and sample vials for CMC, Chitosan, and HA.
- Define one **asset slot** per station (`asset-reactor`, `asset-rheometer`, `asset-hplc`, `asset-bench`, `asset-vial-cmc`, `asset-vial-chitosan`, `asset-vial-ha`) plus an environment slot (`asset-lab-room`).
- Write a Lux3D prompt for each slot (recorded in `PLACEHOLDERS.md`) and collect reference images in `refs/` (vials, reactor, lab glassware).

### 4.2 Lux3D assets
- Generate the first asset in Lux3D: **HA Serum Bottle**, the 3D model for the hyaluronic acid sample vial.
- Export from Lux3D as **GLB** (export id `lux3d_g1_7720`). Raw exports are kept in `assets/lux3d_export/` and `assets/lux3d_model_exports.zip`.
- Copy the GLB to `assets/ha-serum-bottle.glb` (byte-identical to `lux3d_g1_7720.glb`, about 10.9 MB) and wire it into the HA station.

### 4.3 Interactive web twin
- Static site: `index.html` + `style.css` + `app.js`. No build step and no paid APIs.
- `app.js` holds one data list of stations. A station with `asset: null` shows **"EMPTY / UNVERIFIED — Lux3D asset pending"**. A station with a `.glb` path renders the model in Google's `<model-viewer>` web component (v3.5.0, loaded from the Google CDN) with camera controls, auto-rotate, and a download link.
- The HA station opens by default, so the Lux3D model is the first thing a viewer sees.
- To fill a slot: generate in Lux3D → export GLB → drop it into `assets/` → set that station's `asset` field in `app.js`.

---

## 5. Asset Inventory

Status as of **2026-10-31 SGT**.

| Slot ID | Asset | Lux3D asset name | Status | Local path |
|---|---|---|---|---|
| `asset-vial-ha` | Hyaluronic acid sample vial | **HA Serum Bottle** | **FILLED** (Lux3D, free trial; 3,300 credits untouched) | `assets/ha-serum-bottle.glb` (source export `assets/lux3d_export/lux3d_g1_7720.glb`) |
| `asset-vial-cmc` | CMC sample vial | — | EMPTY / UNVERIFIED | — |
| `asset-vial-chitosan` | Chitosan sample vial | — | EMPTY / UNVERIFIED | — |
| `asset-reactor` | Jacketed glass reactor | — | EMPTY / UNVERIFIED | — |
| `asset-rheometer` | Rotational rheometer | — | EMPTY / UNVERIFIED | — |
| `asset-hplc` | HPLC system | — | EMPTY / UNVERIFIED | — |
| `asset-bench` | Formulation bench | — | EMPTY / UNVERIFIED | — |
| `asset-lab-room` | Lab environment | — | EMPTY / UNVERIFIED (not yet wired into the UI) | — |

Notes:
- **No Lux3D public share URLs are included.** The only filled asset is referenced by its local GLB file path. A public link will be added only after it has been created and checked.
- The reference images in `refs/` (`vial-ha.jpg`, `vial-ha-clean.jpg`, `vial-cmc-clean.jpg`, `vial-chitosan-clean.jpg`, `reactor.jpg`, `reactor-clean.jpg`, `lab-glass.jpg`) are inputs for generating the remaining assets.

---

## 6. Demo: How to Run

```bash
cd /workspace/aholo-lab-twin
python3 -m http.server 8000
# then open http://localhost:8000 in a browser
```

What to look at:
1. The page opens with the **Vial: HA** station selected. The **HA Serum Bottle** Lux3D model renders and auto-rotates. Drag to orbit and scroll to zoom.
2. Click the other stations (Reactor, Rheometer, HPLC, Formulation bench, Vial: CMC, Vial: Chitosan). Each one shows its EXAMPLE parameter table and its slot status (`EMPTY / UNVERIFIED — Lux3D asset pending`).
3. Each tile shows its slot ID and status (`Lux3D ready` or `EMPTY`).

Requirements: a modern browser. Internet access is needed once to load the `<model-viewer>` script from the Google CDN. The site has to be served over HTTP (as above), not opened as `file://`, so the GLB can load.

---

## 7. EXAMPLE-Data Disclaimer

All numbers in the demo are **EXAMPLE** placeholders for illustration only. They are **not** real, measured, validated, or proprietary formulation or process data, and must not be used for lab work. Examples as shown in the app:

| Station | Parameter (all EXAMPLE) |
|---|---|
| Reactor | Volume 5 L (EXAMPLE) · Temperature 60 °C (EXAMPLE) · Stir rate 300 rpm (EXAMPLE) · Batch EX-001 (EXAMPLE) |
| Rheometer | Cone-plate 40 mm (EXAMPLE) · Shear rate 0.1–100 s⁻¹ (EXAMPLE) · Temp 25 °C (EXAMPLE) · Viscosity — (placeholder) |
| HPLC | SEC column (EXAMPLE) · Flow 1.0 mL/min (EXAMPLE) · Run time 30 min (EXAMPLE) · Mw — (placeholder) |
| Formulation bench | Target conc. 1.0 % w/v (EXAMPLE) · pH 7.0 (EXAMPLE) · Buffer PBS (EXAMPLE) |
| Vial: CMC | MW ~250 kDa (EXAMPLE) · 2 % w/v (EXAMPLE) · Viscosity — (placeholder) |
| Vial: Chitosan | MW ~150 kDa (EXAMPLE) · 1 % w/v in 1 % acetic acid (EXAMPLE) · Viscosity — (placeholder) |
| Vial: HA | MW ~1 MDa (EXAMPLE) · 0.5 % w/v (EXAMPLE) · Viscosity — (placeholder) |

The UI marks this too: an "EXAMPLE DATA ONLY" header badge, an "EXAMPLE" badge on every panel, and a footer disclaimer.

---

## 8. Timeline (toward the deadline)

**Submission deadline: 2026-11-19 19:00 SGT** (UTC+8).

| Date (SGT) | Milestone | Status |
|---|---|---|
| ≤ 2026-10-31 | Concept, station list, asset slots, Lux3D prompts, reference images, static web twin with EXAMPLE data | Done |
| 2026-10-31 | First Lux3D asset (HA Serum Bottle) exported as GLB and wired into the HA station | Done |
| 2026-11-01 → 11-08 | Generate the remaining vial assets (CMC, Chitosan) and the equipment assets (Reactor, Rheometer, HPLC, Bench) in Lux3D, then wire them in | Planned |
| 2026-11-09 → 11-12 | Optional lab-room environment asset; UI polish; check GLB sizes and load times | Planned |
| 2026-11-13 → 11-16 | Record demo video and screenshots; finalize this report | Planned |
| 2026-11-17 → 11-18 | Buffer for fixes; final review that all data is labelled EXAMPLE | Planned |
| **2026-11-19, before 19:00 SGT** | Submit through **My Submission**: <https://www.aholo.ai/hackathon/my> | Not yet submitted |

---

## 9. Optional: Sharing on X

After submitting, the project can optionally be shared on X with the hashtag **#Manycorehackathon** (for example, a short clip of the rotating HA Serum Bottle in the twin). This is optional and **not done yet**. Nothing has been posted.

---

## 10. Links & Files

- My Submission page: <https://www.aholo.ai/hackathon/my>
- Project folder: `/workspace/aholo-lab-twin` (`index.html`, `style.css`, `app.js`, `README.md`, `PLACEHOLDERS.md`, `assets/`, `refs/`)
- Lux3D public share URLs: **none included** (not yet created or verified)

*Draft prepared 2026-10-31 SGT. Not submitted.*
