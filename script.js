const $ = id => document.getElementById(id);

// 1. MESSAGES GENTILS
$("btn-generer").onclick = () => {
  const n = $("champ-nom").value.trim();
  if (!n) return $("resultat-message").textContent = "Oups ! Écris d'abord un prénom.";
  const m = [
    `${n}, tu as un sourire qui illumine la journée !`, `Continue comme ça ${n}, tu vas accomplir de grandes choses.`,
    `Le monde a besoin de personnes bienveillantes comme toi, ${n}.`, `${n}, ta créativité est vraiment inspirante !`,
    `Tu rends les gens heureux simplement en étant toi-même, ${n}.`, `${n}, tu es une personne précieuse.`,
    `Ton humour et ta joie de vivre sont contagieux, ${n} !`, `Chaque défi te rend plus fort, ${n}.`,
    `${n}, tu as un cœur en or.`, `Ta gentillesse au quotidien fait toute la différence, ${n}.`,
    `Tu peux être très fier de toi, ${n} !`, `${n}, ton écoute et ton soutien sont des qualités rares.`,
    `Rien ne peut t'arrêter quand tu te lances, ${n} !`, `${n}, tu apportes toujours une belle énergie positive.`,
    `C'est un vrai plaisir de passer du temps avec toi, ${n}.`, `${n}, tu vois toujours le bon côté des choses.`,
    `Crois en tes rêves ${n}, tu peux les réaliser.`, `${n}, ta patience et ta persévérance sont admirables.`,
    `Aujourd'hui est une belle journée grâce à toi, ${n} !`, `${n}, tes idées sont toujours originales.`,
    `Tu mérites tout le bonheur du monde, ${n}.`, `${n}, merci d'être un ami aussi loyal.`,
    `Tu gardes toujours la tête haute, bravo ${n} !`, `${n}, ne change rien : tu es génial comme tu es.`
  ];
  $("resultat-message").textContent = m.at(Math.floor(Math.random() * m.length));
};

// 2. CERCLE PARFAIT
const c = $("zone-cercle"), ctx = c.getContext("2d"), cx = 150, cy = 150;
let draw = false, pts = [];
const resetC = () => { ctx.clearRect(0, 0, 300, 300); ctx.fillStyle = "#4a90e2"; ctx.beginPath(); ctx.arc(cx, cy, 5, 0, 7); ctx.fill(); };
const pos = e => { const r = c.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };

c.onpointerdown = e => { e.preventDefault(); c.setPointerCapture(e.pointerId); draw = true; pts = [pos(e)]; resetC(); $("resultat-cercle").textContent = "Continue..."; };
c.onpointermove = e => {
  if (!draw) return; e.preventDefault(); const p = pos(e), d = pts.at(-1);
  ctx.strokeStyle = "#2c7a7b"; ctx.lineWidth = 4; ctx.lineCap = "round";
  ctx.beginPath(); ctx.moveTo(d.x, d.y); ctx.lineTo(p.x, p.y); ctx.stroke(); pts.push(p);
};
c.onpointerup = c.onpointercancel = e => {
  if (!draw) return; draw = false; if (c.hasPointerCapture(e.pointerId)) c.releasePointerCapture(e.pointerId);
  if (pts.length < 20) return $("resultat-cercle").textContent = "Cercle trop court ! Essaie encore.";
  const ray = pts.map(p => Math.hypot(p.x - cx, p.y - cy));
  const moy = ray.reduce((a, b) => a + b) / ray.length;
  if (moy < 25) return $("resultat-cercle").textContent = "Fais un cercle plus grand autour du point !";
  const ec = ray.reduce((a, r) => a + Math.abs(r - moy), 0) / ray.length;
  const ferm = Math.hypot(pts.at(-1).x - pts.at(0).x, pts.at(-1).y - pts.at(0).y);
  const prec = Math.max(0, Math.min(100, 100 - (ec / moy) * 140 - (ferm / moy) * 25)).toFixed(1);
  $("resultat-cercle").textContent = `Précision : ${prec} % !`;
};
$("btn-effacer").onclick = () => { resetC(); $("resultat-cercle").textContent = "Trace ton cercle pour voir ton score"; };
resetC();

// 3. MINI-MINECRAFT
let bloc = "herbe";
document.querySelectorAll(".outil").forEach(b => b.onclick = () => {
  document.querySelectorAll(".outil").forEach(x => x.classList.remove("actif"));
  b.classList.add("actif"); bloc = b.dataset.bloc;
});
const mondeMC = () => {
  $("grille-minecraft").innerHTML = "";
  for (let i = 0; i < 80; i++) {
    const d = document.createElement("div");
    d.className = "case-mc bloc-" + (i < 40 ? "vide" : i < 50 ? "herbe" : i < 70 ? "terre" : "pierre");
    d.onclick = () => d.className = "case-mc bloc-" + bloc;
    $("grille-minecraft").appendChild(d);
  }
};
$("btn-reset-mc").onclick = mondeMC; mondeMC();

// 4. MINI-ROBLOX OBBY
const cr = $("jeu-roblox"), rx = cr.getContext("2d");
let rRun = false, rSc = 0, rRec = 0, jy = 120, vy = 0, lx = 460, animR;
const saut = () => { if (rRun && jy >= 120) vy = -11; };
function loopR() {
  if (!rRun) return;
  rx.clearRect(0, 0, 460, 180); rx.fillStyle = "#718096"; rx.fillRect(0, 155, 460, 25);
  jy += vy; vy += 0.6; if (jy > 120) { jy = 120; vy = 0; }
  rx.fillStyle = "#ecc94b"; rx.fillRect(55, jy - 12, 16, 12);
  rx.fillStyle = "#3182ce"; rx.fillRect(50, jy, 26, 20);
  rx.fillStyle = "#48bb78"; rx.fillRect(52, jy + 20, 22, 15);
  lx -= 5 + Math.min(rSc * 0.2, 5);
  if (lx < -30) { lx = 460; rSc++; rRec = Math.max(rSc, rRec); $("score-roblox").textContent = `Score : ${rSc} | Record : ${rRec}`; }
  rx.fillStyle = "#f56565"; rx.fillRect(lx, 130, 28, 25);
  if (lx < 74 && lx + 28 > 52 && jy + 35 > 130) {
    rRun = false; rx.fillStyle = "rgba(0,0,0,0.6)"; rx.fillRect(0, 0, 460, 180);
    rx.fillStyle = "#fff"; rx.font = "bold 22px Arial"; return rx.fillText("OOF ! Touche la lave !", 125, 95);
  }
  animR = requestAnimationFrame(loopR);
}
$("btn-start-roblox").onclick = () => { cancelAnimationFrame(animR); rRun = true; rSc = 0; jy = 120; vy = 0; lx = 460; $("score-roblox").textContent = `Score : 0 | Record : ${rRec}`; loopR(); };
cr.onpointerdown = saut; window.onkeydown = e => { if (e.code === "Space" && rRun) { e.preventDefault(); saut(); } };

// 5. MINI-FORTNITE
let fSc = 0, fT = 15, fRun = false, tFn;
const moveFn = () => { $("cible-fn").style.left = Math.random() * ($("arene-fortnite").clientWidth - 45) + "px"; $("cible-fn").style.top = Math.random() * 195 + "px"; };
$("cible-fn").onpointerdown = e => { e.stopPropagation(); if (fRun) { fSc++; $("score-fortnite").textContent = `Éliminations : ${fSc} | Temps : ${fT}s`; moveFn(); } };
$("btn-start-fn").onclick = () => {
  clearInterval(tFn); fSc = 0; fT = 15; fRun = true; $("cible-fn").style.display = "block"; moveFn();
  $("score-fortnite").textContent = `Éliminations : 0 | Temps : 15s`;
  tFn = setInterval(() => {
    if (--fT <= 0) { clearInterval(tFn); fRun = false; $("cible-fn").style.display = "none"; $("score-fortnite").textContent = fSc >= 15 ? "🏆 VICTOIRE ROYALE (Top 1) !" : `Terminé ! Score : ${fSc} éliminations`; }
    else $("score-fortnite").textContent = `Éliminations : ${fSc} | Temps : ${fT}s`;
  }, 1000);
};

// 6. BOÎTE À SUGGESTIONS (ENVOI FORMSPREE SANS QUITTER LA PAGE)
const formSugg = $("form-suggestion");
if (formSugg) {
  formSugg.onsubmit = async e => {
    e.preventDefault();
    const btn = $("btn-envoyer-sugg");
    const msg = $("confirmation-sugg");
    btn.disabled = true;
    btn.textContent = "Envoi en cours...";

    try {
      const rep = await fetch(formSugg.action, {
        method: "POST",
        body: new FormData(formSugg),
        headers: { "Accept": "application/json" }
      });

      if (rep.ok) {
        msg.textContent = "✅ Merci ! Ta suggestion a bien été envoyée.";
        formSugg.reset();
      } else {
        msg.textContent = "❌ Oups ! Une erreur s'est produite lors de l'envoi.";
      }
    } catch {
      msg.textContent = "❌ Impossible de se connecter au serveur.";
    } finally {
      btn.disabled = false;
      btn.textContent = "Envoyer ma suggestion";
    }
  };
}
