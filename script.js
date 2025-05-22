//création du DOM
const planningList = document.getElementById("planningList");
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

    data.events.forEach((event, index) => {
      //récuperation des données
      const titleEvent = event.title;
      const descriptionEvent = event.description;
      const dateEvent = event.start_date;
      let placeEvent;
      if (event.venue && event.venue.address) {
        placeEvent = `Adresse ${event.venue.address}`;
      } else {
        placeEvent = `Pas d'adresse disponible`;
      }
      const urlEvent = event.url;

      //clonage des données
      const clone = template.content.cloneNode(true);
      clone.querySelector(".titleTemplate").textContent = titleEvent;
      clone.querySelector(".dateTemplate").textContent = dateEvent;
      clone.querySelector(".placeTemplate").textContent = placeEvent;
      planningList.appendChild(clone);
    });
  })
  .catch((error) => {
    console.error("Erreur :", error);
  });
//eventTitle.textContent = key.title;
