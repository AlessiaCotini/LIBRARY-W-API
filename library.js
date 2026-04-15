const libraryUrl = "https://striveschool-api.herokuapp.com/books";
const getLibrary = function () {
  fetch(libraryUrl)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
    .then((data) => {
      const book = document.getElementById("container");
      book.innerHTML = "";
      data.forEach((card) => {
        const col = document.createElement("div");
        col.classList.add("col-6", "col-md-4", "col-lg-3", "p-3");
        col.innerHTML = `<div class="card h-100 d-flex bg-dark bg-opacity-10 p-1">
            <img src="${card.img}" class="card-img-top img-fluid h-50">
            <div class="card-body d-flex flex-column justify-content-between">
            <h5 class="card-title">${card.title}</h5>
            <p class="card-text ">${card.category}</p>
            <p class="card-text">${card.price}£</p>
            <div class="d-flex justify-content-between">
            <a href="#" class="btn btn-dark opacity-75 add-btn w-25"><i class="bi bi-plus-circle"></i></a>
            <a href="#" class="btn btn-dark opacity-75 del-btn w-25"><i class="bi bi-trash3-fill"></i></a>
            </div></div></div>`;
        book.appendChild(col);
      });
    })
    .catch((err) => {
      console.log("fetch error", err);
    });
};
getLibrary();
