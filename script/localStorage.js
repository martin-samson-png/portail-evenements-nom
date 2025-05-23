const sectionFav = document.getElementById("favoris");
const favTemplate = document.getElementById("favTemplate");
const modale = document.getElementById("modale");

let storedData = JSON.parse(localStorage.getItem("favData")) || [];

storedData.forEach((data, index) => {
  const favClone = favTemplate.content.cloneNode(true);
  favClone.querySelector(".favTitle").textContent = data.title;
  favClone.querySelector(".favDesc").textContent = data.description;
  favClone.querySelector(".favDate").textContent = `Date: ${data.date}`;
  favClone.querySelector(".favPlace").textContent = `Lieu: ${data.place}`;
  favClone.querySelector(".favUrl").href = data.url;

  // Bouton Détails
  const favDetailBtn = favClone.querySelector(".favDetailBtn");
  const divModale = document.getElementById("divModale");
  favDetailBtn.addEventListener("click", () => {
    const favModale = favTemplate.content.cloneNode(true);
    favModale.querySelector(".favTitle").textContent = data.title;
    favModale.querySelector(".favDesc").style.display = "flex";
    favModale.querySelector(".favDesc").textContent = data.description;
    favModale.querySelector(".favDate").textContent = `Date: ${data.date}`;
    favModale.querySelector(".favPlace").textContent = `Lieu: ${data.place}`;
    favModale.querySelector(".favUrl").style.display = "flex";
    favModale.querySelector(".favUrl").href = data.url;
    favModale.querySelector(".favUrl").textContent = "Lien vers l'événement";
    favModale.querySelector(".favDetailBtn").style.display = "none";
    favModale.querySelector(".favSuppBtn").style.display = "none";
    favModale.querySelector(".favCloseBtn").style.display = "flex";
    const favCloseBtn = favModale.querySelector(".favCloseBtn");
    modale.style.display = "flex";
    divModale.appendChild(favModale);

    favCloseBtn.addEventListener("click", () => {
      modale.style.display = "none";
      favCloseBtn.closest(".favCard").remove();
    });
  });

  // Bouton Supprimer
  const favSuppBtn = favClone.querySelector(".favSuppBtn");
  favSuppBtn.addEventListener("click", () => {
    storedData.splice(index, 1);
    localStorage.setItem("favData", JSON.stringify(storedData));
    sectionFav?.removeChild(favClone);
  });

  sectionFav.appendChild(favClone);
});
