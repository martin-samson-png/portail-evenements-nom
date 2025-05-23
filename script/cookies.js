const main = document.querySelector("main");

// Fonction pour définir un cookie
function setCookie(nom, valeur, jours) {
  let date = new Date();
  date.setTime(date.getTime() + jours * 24 * 60 * 60 * 1000);
  let expires = "expires=" + date.toUTCString();
  document.cookie = nom + "=" + valeur + ";" + expires + ";path=/";
}

// Fonction pour obtenir un cookie
function getCookie(nom) {
  let name = nom + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// Fonction pour appliquer le mode sombre
function appliquerModeSombre(actif) {
  if (actif) {
    main.classList.add("dark-mode");
  } else {
    main.classList.remove("dark-mode");
  }
}

// Vérifier le cookie au chargement de la page
document.addEventListener("DOMContentLoaded", function () {
  let modeSombre = getCookie("modeSombre");
  if (modeSombre === "true") {
    appliquerModeSombre(true);
  }
});

// Ajouter un écouteur d'événement pour le bouton de basculement du mode sombre
document
  .getElementById("buttonDarkMode")
  .addEventListener("click", function () {
    let modeSombre = getCookie("modeSombre");
    if (modeSombre === "true") {
      setCookie("modeSombre", "false", 365);
      appliquerModeSombre(false);
    } else {
      setCookie("modeSombre", "true", 365);
      appliquerModeSombre(true);
    }
  });
