const myPlanning = document.getElementById("myPlanning");
const eventList = document.getElementById("eventList");
const template = document.getElementById("eventTemplate");

const fetchData = fetch(
  "https://demo.theeventscalendar.com/wp-json/tribe/events/v1/events"
)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Erreur réseau");
    }
    return response.json();
  })
  .then((data) => {
    console.log(data.events);

    data.events.forEach((event) => {
      // récupération des données
      const titleEvent = event.title;
      const descriptionEvent = event.description;
      const dateEvent = event.start_date;
      let placeEvent;
      if (event.venue && event.venue.address) {
        placeEvent = `Adresse : ${event.venue.address}, ${event.venue.city}`;
      } else {
        placeEvent = `Pas d'adresse disponible`;
      }
      const urlEvent = event.url;

      // clonage des données
      const clone = template.content.cloneNode(true);
      clone.querySelector(".titleTemplate").textContent = titleEvent;
      clone.querySelector(".descriptionTemplate").textContent =
        descriptionEvent;
      clone.querySelector(".dateTemplate").textContent = `Date : ${dateEvent}`;
      clone.querySelector(
        ".placeTemplate"
      ).textContent = `Lieu : ${placeEvent}`;
      clone.querySelector(".urlTemplate").textContent = `Lien : ${urlEvent}`;

      //Stockage des éléments dans le localStorage
      const addBtn = clone.querySelector(".addBtn");
      addBtn.addEventListener("click", () => {
        let setStoredData = JSON.parse(localStorage.getItem("favData")) || [];
        setStoredData.push({
          title: titleEvent,
          description: descriptionEvent,
          date: dateEvent,
          lieux: placeEvent,
          url: urlEvent,
        });
        localStorage.setItem("favData", JSON.stringify(setStoredData));
      });

      // Récuperation du localStorage pour les Favoris

      //reclonage des éléments dans la modale
      const detailBtn = clone.querySelector(".detailBtn");
      const modale = document.getElementById("modale");
      const divModale = document.getElementById("divModale");
      detailBtn.addEventListener("click", () => {
        const modaleClone = template.content.cloneNode(true);
        modaleClone.querySelector(".titleTemplate").textContent = titleEvent;
        modaleClone.querySelector(".descriptionTemplate").style.display =
          "flex";
        modaleClone.querySelector(".descriptionTemplate").textContent =
          descriptionEvent;
        modaleClone.querySelector(".dateTemplate").textContent = dateEvent;
        modaleClone.querySelector(".placeTemplate").textContent = placeEvent;
        modaleClone.querySelector(".urlTemplate").style.display = "flex";
        modaleClone.querySelector(".urlTemplate").href = urlEvent;
        modaleClone.querySelector(".urlTemplate").textContent =
          "Lien vers l'évenement";
        modaleClone.querySelector(".closeBtn").style.display = "flex";
        modaleClone.querySelector(".detailBtn").style.display = "none";
        modaleClone.querySelector(".addBtn").style.display = "none";

        const closeBtn = modaleClone.querySelector(".closeBtn");
        modale.style.display = "flex";
        divModale.appendChild(modaleClone);

        closeBtn.addEventListener("click", () => {
          closeBtn.closest(".eventCard").remove();
          modale.style.display = "none";
        });
      });
      eventList.appendChild(clone);
    });
  })
  .catch((error) => {
    console.error("Erreur :", error);
  });
