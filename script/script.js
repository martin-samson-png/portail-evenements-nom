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

        //reclonage des éléments dans la section "mon planning"
        const addBtn = clone.querySelector(".addBtn");
        addBtn.addEventListener("click", () => {
          let storedData = JSON.parse(localStorage.getItem("planedData")) || [];
          storedData.push({
            title: titleEvent,
            description: descriptionEvent,
            date: dateEvent,
            place: placeEvent,
            url: urlEvent,
          });
          localStorage.setItem("planedData", JSON.stringify(storedData));
          const planedClone = template.content.cloneNode(true);
          planedClone.querySelector(".titleTemplate").textContent = titleEvent;
          planedClone.querySelector(".dateTemplate").textContent = dateEvent;
          planedClone.querySelector(".placeTemplate").textContent = placeEvent;

          const deleteBtn = planedClone.querySelector(".addBtn");
          deleteBtn.textContent = "Supprimer";

          myPlanning.appendChild(planedClone);

          deleteBtn.addEventListener("click", () => {
            deleteBtn.closest(".eventCard").remove();
          });
        });

        //reclonage des éléments dans la modale
        const detailBtn = clone.querySelector(".detailBtn");
        const modale = document.getElementById("modale");
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
          modaleClone.querySelector(".urlTemplate").textContent = urlEvent;
          modale.style.display = "flex";
          modaleClone.querySelector(".detailBtn").style.display = "none";
          modaleClone.querySelector(".addBtn").style.display = "none";
          modale.appendChild(modaleClone);
        });

        eventList.appendChild(clone);
      });
    })
    .catch((error) => {
      console.error("Erreur :", error);
    });
});
