const libraryUrl = "https://striveschool-api.herokuapp.com/books";
const cart = (document.getElementById("cart").innerHTML =
  localStorage.getItem("cart"));
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
        col.classList.add("col-6", "col-md-4", "col-lg-3", "p-5");
        col.innerHTML = `<div class="card h-100 d-flex bg-dark bg-opacity-10 p-1">
            <img src="${card.img}" class="card-img-top img-fluid h-75">
            <div class="card-body d-flex flex-column justify-content-end">
            <h5 class="card-title">${card.title}</h5>
            <p class="card-text ">${card.category}</p>
            <p class="card-text">${card.price}£</p>
            <div class="d-flex justify-content-between">
            <button class="btn btn-success bi bi-plus-circle w-25 mt-auto add-btn"></button>
            <button class="btn btn-danger bi bi-trash w-25 mt-auto" onclick="this.closest('.col-6').remove()"></button>
            </div></div></div>`;
        col.querySelector(".add-btn").addEventListener("click", function () {
          const cart = document.getElementById("cart");
          const mycart = document.createElement("div");
          mycart.classList.add("d-flex", "justify-content-between", "m-1");
          mycart.innerHTML = `
                <div class="d-flex justify-content-between w-75">
                <p>${card.title}</p>
                <p>${card.price}£</p>
                </div>
                <button class="btn btn-danger bi bi-trash remove-cart"></button>`;
          mycart
            .querySelector(".remove-cart")
            .addEventListener("click", function () {
              mycart.remove();
              localStorage.setItem("cart", cart.innerHTML);
            });
          cart.appendChild(mycart);
          localStorage.setItem("cart", cart.innerHTML);
        });
        book.appendChild(col);
      });
    })
    .catch((err) => {
      console.log("fetch error", err);
    });
};
getLibrary();
