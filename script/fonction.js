function createButton(
  button,
  section,
  div,
  title,
  description,
  date,
  place,
  url
) {
  if ((button.textContent = "Ajouter")) {
    button.addEventListener("click", () => {
      div = document.createElement("div");
      div.className = "divPlanning";
      title = document.createElement("h3");
      title.textContent = button
        .closest(".eventCard")
        .querySelector(".titleTemplate").textContent;
      date = document.createElement("div");
      date.textContent = button
        .closest(".eventCard")
        .querySelector(".dateTemplate").textContent;
      place = document.createElement("div");
      place.textContent = button
        .closest(".eventCard")
        .querySelector(".placeTemplate").textContent;
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Supprimer";
      deleteButton.id = "suppButton";

      section.appendChild(div);
      div.appendChild(title);
      div.appendChild(date);
      div.appendChild(place);
      div.appendChild(deleteButton);
    });
  }
}
