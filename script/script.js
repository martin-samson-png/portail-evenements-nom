document.addEventListener("DOMContentLoaded", () => {
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
        clone.querySelector(".dateTemplate").textContent = dateEvent;
        clone.querySelector(".placeTemplate").textContent = placeEvent;
        clone.querySelector(".urlTemplate").textContent = urlEvent;

        // création des boutons dans le DOM
        const detailBtn = clone.querySelector(".detailBtn");
        const addBtn = clone.querySelector(".addBtn");
        const modale = document.getElementById("modale");

        addBtn?.addEventListener("click", () => {
          if (addBtn.textContent === "Ajouter") {
            const planedClone = template.content.cloneNode(true);
            planedClone.querySelector(".titleTemplate").textContent =
              titleEvent;
            planedClone.querySelector(".dateTemplate").textContent = dateEvent;
            planedClone.querySelector(".placeTemplate").textContent =
              placeEvent;

            const deleteBtn = planedClone.querySelector(".addBtn");
            deleteBtn.textContent = "Supprimer";

            myPlanning?.appendChild(planedClone);

            // Ajout de l'écouteur d'événement pour le bouton "Supprimer"
            deleteBtn.addEventListener("click", () => {
              deleteBtn.closest(".eventCard").remove();
            });
          }
        });

        detailBtn.addEventListener("click", () => {
          modale.style.display = "flex";
        });

        eventList.appendChild(clone);
      });
    })
    .catch((error) => {
      console.error("Erreur :", error);
    });
});
