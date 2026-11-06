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
    `${nom}, ta créativité et ton énergie sont vraiment inspirantes !`
  ];

  const hasard = Math.floor(Math.random() * messages.length);
  zoneTexte.textContent = messages[hasard];
});
