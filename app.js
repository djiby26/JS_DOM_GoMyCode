let articles = [
  {
    id: 0,
    price: 100,
    quantity: 1,
    title: "Iphone 12",
    description: "",
    imageUrl: "",
    isLiked: false,
    increaseQuantity: function () {
      this.quantity < 5 ? this.quantity++ : this.quantity;
    },
    decreaseQuantity: function () {
      this.quantity >= 2 ? this.quantity-- : this.quantity;
    },
    toggleLike: function () {
      return !this.isLiked;
    },
    getTotal: function () {
      return Number(this.price) * Number(this.quantity);
    },
  },
  {
    id: 1,
    price: 100,
    quantity: 1,
    title: "Dell laptop",
    description: "",
    imageUrl: "",
    isLiked: false,
    increaseQuantity: function () {
      this.quantity < 5 ? this.quantity++ : this.quantity;
    },
    decreaseQuantity: function () {
      this.quantity >= 2 ? this.quantity-- : this.quantity;
    },
    toggleLike: function () {
      return !this.isLiked;
    },
    getTotal: function () {
      return Number(this.price) * Number(this.quantity);
    },
  },
  {
    id: 2,
    price: 100,
    quantity: 1,
    increaseQuantity: function () {
      this.quantity < 5 ? this.quantity++ : this.quantity;
    },
    decreaseQuantity: function () {
      this.quantity >= 2 ? this.quantity-- : this.quantity;
    },
    toggleLike: function () {
      return !this.isLiked;
    },
    getTotal: function () {
      return Number(this.price) * Number(this.quantity);
    },
    title: "SSD nvme 500 gb",
    description: "",
    imageUrl: "",
    isLiked: false,
  },
  {
    id: 3,
    price: 100,
    quantity: 1,
    increaseQuantity: function () {
      this.quantity < 5 ? this.quantity++ : this.quantity;
    },
    decreaseQuantity: function () {
      this.quantity >= 2 ? this.quantity-- : this.quantity;
    },
    toggleLike: function () {
      return !this.isLiked;
    },
    getTotal: function () {
      return Number(this.price) * Number(this.quantity);
    },
    title: "8 gb ram crucial",
    description: "",
    imageUrl: "",
    isLiked: false,
  },
];

const tableBody = document.querySelector(".table-body");

const deleteItem = (id) => {
  let results = articles.filter((article) => article.id !== id);
  tableBody.innerHTML = "";
  articles = [...results];
  loadView();
};

const loadView = () => {
  let htmlArticles = articles.map((article) => {
    let newArticle = `
        <tr>
          <th class="like-button" data-id="${article.id}" scope="row">
            <svg class="item-${
              article.id
            }" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="${
      article.isLiked ? "red" : "gray"
    }" class="bi bi-heart-fill" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
            </svg>
          </th>
          <td>${article.title}</td>
          <td>${article.price}</td>
          <td class="quantity-controls">
            <button type="button" data-id="${
              article.id
            }" class="increaseQuantity btn btn-sm btn-secondary">+</button>
            <input class="form-control w-25 quantity-number" type="text" value="${
              article.quantity
            }" readonly>
            <button type="button" data-id="${
              article.id
            }" class="decreaseQuantity btn btn-sm btn-secondary">-</button>
          </td>
            <td class="total">${article.getTotal()}</td>
            <td>
              <img onclick="deleteItem(${
                article.id
              })" class="delete-button" src="./img/x-square-fill.svg">
            </td>
        </tr>`;
    return newArticle;
  });
  htmlArticles.forEach((element) => {
    tableBody.innerHTML += element;
  });
};
loadView();

//liste des Boutons permettant d'aimer un article
const likeButtons = document.querySelectorAll(".like-button");
//Bouton qui augmente la quantite de l'article commande
const increaseQuantityButtons = document.querySelectorAll(".increaseQuantity");
//Bouton qui diminue la quantite de l'article commande
const decreaseQuantityButtons = document.querySelectorAll(".decreaseQuantity");
//Affiche le quantite de l'artcle
const quantityNumberDisplays = document.querySelectorAll(".quantity-number");
//Prix total dependant de la quantite de l'article
const totalDisplays = document.querySelectorAll(".total");

function findIndice(itemId) {
  let indice = articles.findIndex((article) => article.id === Number(itemId));
  return indice;
}

likeButtons.forEach((element) => {
  element.addEventListener("click", (e) => {
    let indice = findIndice(element.dataset.id);
    const likeButtonSvg = document.querySelector(`.item-${element.dataset.id}`);

    articles[indice].isLiked = articles[indice].toggleLike();
    likeButtonSvg.style.fill = articles[indice].isLiked ? "red" : "gray";
  });
});

increaseQuantityButtons.forEach((element) => {
  element.addEventListener("click", () => {
    let indice = findIndice(element.dataset.id);
    let modifiedArticle = articles[element.dataset.id];
    modifiedArticle.increaseQuantity();
    quantityNumberDisplays[indice].value = modifiedArticle.quantity;
    totalDisplays[indice].textContent = modifiedArticle.getTotal();
  });
});

decreaseQuantityButtons.forEach((element) => {
  element.addEventListener("click", () => {
    let indice = findIndice(element.dataset.id);
    let modifiedArticle = articles[element.dataset.id];
    modifiedArticle.decreaseQuantity();
    quantityNumberDisplays[indice].value = modifiedArticle.quantity;
    totalDisplays[indice].textContent = modifiedArticle.getTotal();
  });
});
