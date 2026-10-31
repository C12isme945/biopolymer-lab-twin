// EXAMPLE placeholder data only. asset: null = EMPTY / UNVERIFIED slot.
const stations = [
  {id:"reactor",name:"Reactor",icon:"⚗️",slot:"asset-reactor",asset:null,params:{"Volume":"5 L (example)","Temperature":"60 °C (example)","Stir rate":"300 rpm (example)","Batch":"EX-001"}},
  {id:"rheometer",name:"Rheometer",icon:"🌀",slot:"asset-rheometer",asset:null,params:{"Geometry":"Cone-plate 40 mm (example)","Shear rate":"0.1–100 s⁻¹ (example)","Viscosity":"— mPa·s (placeholder)","Temp":"25 °C (example)"}},
  {id:"hplc",name:"HPLC",icon:"📈",slot:"asset-hplc",asset:null,params:{"Column":"SEC column (example)","Flow":"1.0 mL/min (example)","Mw estimate":"— kDa (placeholder)","Run time":"30 min (example)"}},
  {id:"bench",name:"Formulation bench",icon:"🧪",slot:"asset-bench",asset:null,params:{"Target conc.":"1.0 % w/v (example)","pH":"7.0 (example)","Buffer":"PBS (example)","Status":"Draft"}},
  {id:"cmc",name:"Vial: CMC",icon:"🧫",slot:"asset-vial-cmc",asset:"assets/cmc-serum-bottle.glb",assetLabel:"CMC Lab Bottle (Lux3D)",params:{"Polymer":"Carboxymethyl cellulose","MW":"~250 kDa (example)","Concentration":"2 % w/v (example)","Viscosity":"— mPa·s (placeholder)"}},
  {id:"chitosan",name:"Vial: Chitosan",icon:"🧫",slot:"asset-vial-chitosan",asset:null,params:{"Polymer":"Chitosan","MW":"~150 kDa (example)","Concentration":"1 % w/v in 1% acetic acid (example)","Viscosity":"— mPa·s (placeholder)"}},
  {id:"ha",name:"Vial: HA",icon:"🧫",slot:"asset-vial-ha",asset:"assets/ha-serum-bottle.glb",assetLabel:"HA Serum Bottle (Lux3D)",params:{"Polymer":"Hyaluronic acid","MW":"~1 MDa (example)","Concentration":"0.5 % w/v (example)","Viscosity":"— mPa·s (placeholder)"}}
];
const lab=document.getElementById("lab"),panel=document.getElementById("panel");
stations.forEach(s=>{
  const b=document.createElement("button");b.className="station";b.dataset.id=s.id;
  const status=s.asset?"Lux3D ready":"EMPTY";
  b.innerHTML=`<div class="icon">${s.icon}</div><div>${s.name}</div><div class="slot">${s.slot}: ${status}</div>`;
  b.onclick=()=>select(s);lab.appendChild(b);
});
function select(s){
  document.querySelectorAll(".station").forEach(e=>e.classList.toggle("active",e.dataset.id===s.id));
  const rows=Object.entries(s.params).map(([k,v])=>`<tr><td>${k}</td><td>${v}</td></tr>`).join("");
  let assetHtml;
  if(s.asset && String(s.asset).endsWith(".glb")){
    assetHtml=`<model-viewer src="${s.asset}" alt="${s.assetLabel||s.name}" camera-controls touch-action="pan-y" auto-rotate style="width:100%;height:280px;background:#111;border-radius:8px"></model-viewer>
      <p><a href="${s.asset}" download>${s.assetLabel||"Download GLB"}</a></p>`;
  }else if(s.asset){
    assetHtml=`<a href="${s.asset}" target="_blank" rel="noopener">Open 3D asset</a>`;
  }else{
    assetHtml=`3D slot <b>${s.slot}</b><br>EMPTY / UNVERIFIED — Lux3D asset pending`;
  }
  panel.innerHTML=`<h2>${s.icon} ${s.name}</h2><span class="badge">EXAMPLE</span><table>${rows}</table><div class="asset-box">${assetHtml}</div>`;
}
document.querySelector('.station[data-id="ha"]')?.click();
