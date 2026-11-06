// ==========================================
// ACTIVITÉ 1 : GÉNÉRATEUR DE MESSAGES
// ==========================================
const bouton = document.getElementById("btn-generer");

bouton.addEventListener("click", function() {
  const nom = document.getElementById("champ-nom").value.trim();
  const zoneTexte = document.getElementById("resultat-message");

  if (nom === "") {
    zoneTexte.textContent = "Oups ! Écris d'abord un prénom.";
    return;
  }

  const messages = [
    `${nom}, tu as un sourire qui illumine la journée des autres !`,
    `Continue comme ça ${nom}, tu es capable d'accomplir de grandes choses.`,
    `Le monde a besoin de plus de personnes bienveillantes comme toi, ${nom}.`,
    `${nom}, ta créativité et ton énergie sont vraiment inspirantes !`,
    `Tu rends les gens autour de toi plus heureux simplement en étant toi-même, ${nom}.`,
    `${nom}, n'oublie jamais à quel point tu es une personne précieuse.`,
    `Ton humour et ta joie de vivre sont contagieux, ${nom} !`,
    `Chaque défi que tu relèves te rend plus fort, ${nom}.`,
    `${nom}, tu as un cœur en or et ça se voit.`,
    `La gentillesse dont tu fais preuve au quotidien fait toute la différence, ${nom}.`,
    `Tu peux être très fier de tout ce que tu as déjà accompli, ${nom} !`,
    `${nom}, ton écoute et ton soutien sont des qualités rares.`,
    `Rien ne peut t'arrêter quand tu décides de te lancer, ${nom} !`,
    `${nom}, tu apportes toujours une belle énergie positive dans le groupe.`,
    `C'est toujours un vrai plaisir de passer du temps avec toi, ${nom}.`,
    `${nom}, tu as le talent de voir le bon côté des choses.`,
    `Crois en tes rêves ${nom}, tu as tout ce qu'il faut pour les réaliser.`,
    `${nom}, ta patience et ta persévérance sont admirables.`,
    `Aujourd'hui est une belle journée parce que tu en fais partie, ${nom} !`,
    `${nom}, tes idées sont toujours originales et intéressantes.`,
    `Tu mérites tout le bonheur et le succès du monde, ${nom}.`,
    `${nom}, merci d'être un ami aussi loyal et authentique.`,
    `Même dans les moments difficiles, tu gardes la tête haute, bravo ${nom} !`,
    `${nom}, ne change rien : tu es génial exactement comme tu es.`
  ];

  const hasard = Math.floor(Math.random() * messages.length);
  zoneTexte.textContent = messages.at(hasard);
});

// ==========================================
// ACTIVITÉ 2 : LE DÉFI DU CERCLE PARFAIT
// ==========================================
const canvas = document.getElementById("zone-cercle");
const ctx = canvas.getContext("2d");
const texteScore = document.getElementById("resultat-cercle");
const btnEffacer = document.getElementById("btn-effacer");

const centreX = canvas.width / 2;
const centreY = canvas.height / 2;

let enTrainDeDessiner = false;
let points = [];

// Dessine le point central bleu
function dessinerCentre() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#4a90e2";
  ctx.beginPath();
  ctx.arc(centreX, centreY, 5, 0, Math.PI * 2);
  ctx.fill();
}

// Position universelle (fonctionne sur PC, tablette et téléphone)
function obtenirPosition(e) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}

function commencerDessin(e) {
  e.preventDefault();
  canvas.setPointerCapture(e.pointerId);
  enTrainDeDessiner = true;
  points = [];
  dessinerCentre();
  texteScore.textContent = "Continue le tour...";
  const pos = obtenirPosition(e);
  points.push(pos);
}

function tracer(e) {
  if (!enTrainDeDessiner) return;
  e.preventDefault();
  const pos = obtenirPosition(e);
  const dernierPoint = points.at(-1);

  ctx.strokeStyle = "#2c7a7b";
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(dernierPoint.x, dernierPoint.y);
  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();

  points.push(pos);
}

function terminerDessin(e) {
  if (!enTrainDeDessiner) return;
  enTrainDeDessiner = false;
  if (canvas.hasPointerCapture(e.pointerId)) {
    canvas.releasePointerCapture(e.pointerId);
  }
  calculerScore();
}

function calculerScore() {
  if (points.length < 20) {
    texteScore.textContent = "Cercle trop petit ou trop court ! Essaie encore.";
    return;
  }

  // 1. Calculer la distance moyenne de chaque point par rapport au centre
  let sommeRayons = 0;
  const rayons = points.map(p => {
    const r = Math.hypot(p.x - centreX, p.y - centreY);
    sommeRayons += r;
    return r;
  });
  const rayonMoyen = sommeRayons / rayons.length;

  // Empêcher un mini-point collé au centre
  if (rayonMoyen < 25) {
    texteScore.textContent = "Fais un cercle un peu plus grand autour du point !";
    return;
  }

  // 2. Calculer l'écart moyen par rapport à un cercle idéal
  let sommeEcarts = 0;
  for (let r of rayons) {
    sommeEcarts += Math.abs(r - rayonMoyen);
  }
  const ecartMoyen = sommeEcarts / rayons.length;

  // 3. Vérifier si le cercle est bien fermé (distance entre début et fin)
  const debut = points.at(0);
  const fin = points.at(-1);
  const distanceFermeture = Math.hypot(fin.x - debut.x, fin.y - debut.y);

  // Calcul final sur 100 %
  let precision = 100 - (ecartMoyen / rayonMoyen) * 140 - (distanceFermeture / rayonMoyen) * 25;
  precision = Math.max(0, Math.min(100, precision)).toFixed(1);

  texteScore.textContent = `Précision : ${precision} % !`;
}

// Événements unifiés PC + Mobile (Pointer Events)
canvas.addEventListener("pointerdown", commencerDessin);
canvas.addEventListener("pointermove", tracer);
canvas.addEventListener("pointerup", terminerDessin);
canvas.addEventListener("pointercancel", terminerDessin);

btnEffacer.addEventListener("click", function() {
  dessinerCentre();
  texteScore.textContent = "Trace ton cercle pour voir ton score";
});

// Initialisation au chargement
dessinerCentre();
