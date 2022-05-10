
let myBasket = [];

$(document).ready(function () {
  let inputCount;
  $(".count").prop("disabled", false);
  $(document).on("click", ".plus", function () {
    inputCount = this.parentElement.children[1];
    $(inputCount).val(parseInt($(inputCount).val()) + 1);
  });
  $(document).on("click", ".minus", function () {
    inputCount = this.parentElement.children[1];
    $(inputCount).val(parseInt($(inputCount).val()) - 1);
    if ($(inputCount).val() == 0) {
      $(inputCount).val(1);
    }
  });
});

let popupPizza = document.getElementById("popupPizza");
let itemsInBasket = document.getElementById("itemsInBasket");
let pizzas = document.getElementById("pizzas");
let showLiked = document.getElementById("showLiked");
let closePopup = document.getElementById("closePopup");
let body = document.getElementsByTagName("body")[0];
let countPizza = document.getElementById("countPizza");
let basketIcon = document.getElementById("basketIcon");
let popupBasket = document.getElementById("popupBasket");
let closeBasketPopup = document.getElementById("closeBasketPopup");
let countPizzaInput = document.getElementById("countPizzaInput");

let totalCountPizza = 0;
events();
function events() {
  window.addEventListener("load", loadAllData);
  basketIcon.addEventListener("click", openPopupBasketFunc);
  closeBasketPopup.addEventListener("click", closeBasketPopupFunc);
  closePopup.addEventListener("click", closePopupFunc);
  addToBasket.addEventListener("click", addToBasketFunc);
  showLiked.addEventListener("click", showLikedFunc);
}

function likePizzaFunc(e) {
  let currentPizza = findItem(e.parentElement.dataId, data);
  currentPizza.liked = !currentPizza.liked;
  loadAllData(true);
}
let check = false;
function showLikedFunc(e) {
  if (check) {
    e.target.classList.toggle("fa-home");
  }
  loadAllData(check);
  if (!check) {
    e.target.classList.toggle("fa-home");
  }
  check = !check;
}

function findItem(id, myData) {
  for (eachData of myData) {
    if (eachData.id === id) {
      return eachData;
    }
  }
}

function loadAllData(unlikes) {
  pizzas.innerHTML = "";
  countPizza.innerHTML = totalCountPizza;
  for (eachData of data) {
    if (!unlikes) {
      if (eachData.liked) {
        let card = document.createElement("li");
        card.dataId = eachData.id;
        card.classList = "card m-2";
        card.innerHTML = `<a class="likeBtn" onClick="likePizzaFunc(this)"><i class="fa-solid fa-heart ${
          eachData.liked ? "red" : ""
        }"></i> </a>
            <img src="${eachData.imageUrl}" class="card-img-top" alt="Pizza" />
            <div class="card-body">
              <h5 class="card-title">${eachData.pizzaName}</h5>
              <p class="card-text">${eachData.pizzaInfo}</p>
              <span class="text-danger h4">${
                eachData.pizzaPrice
              }<span>&nbsp;azn</span></span>
              <a class="btn btn-primary selectBtn" onClick="openPizzaPopup(this.parentElement.parentElement)">Select</a>
            </div>`;
        pizzas.append(card);
      }
    } else {
      let card = document.createElement("li");
      card.dataId = eachData.id;
      card.classList = "card m-2";
      card.innerHTML = `<a class="likeBtn" onClick="likePizzaFunc(this)"><i class="fa-solid fa-heart ${
        eachData.liked ? "red" : ""
      }"></i> </a>
            <img src="${eachData.imageUrl}" class="card-img-top" alt="Pizza" />
            <div class="card-body">
              <h5 class="card-title">${eachData.pizzaName}</h5>
              <p class="card-text">${eachData.pizzaInfo}</p>
              <span class="text-danger h4">${
                eachData.pizzaPrice
              }<span>&nbsp;azn</span></span>
              <a class="btn btn-primary selectBtn" onClick="openPizzaPopup(this.parentElement.parentElement)">Select</a>
            </div>`;
      pizzas.append(card);
    }
  }
  totalCountPizzaFunc(myBasket);
}

function closePopupFunc() {
  popupPizza.style.display = "none";
  countPizzaInput.value = 1;
  pizzas.style.opacity = "1";
  body.style.overflowY = "scroll";
}

function closeBasketPopupFunc() {
  popupBasket.style.display = "none";
  document.getElementsByTagName("main")[0].style.opacity = "1";
  body.style.overflowY = "scroll";
}

let clickedPizza;

function openPizzaPopup(e) {
  clickedPizza = findItem(e.dataId, data);
  document.getElementById("popupTittle").innerHTML = clickedPizza.pizzaName;
  document.getElementById("popupInfo").innerHTML = clickedPizza.pizzaInfo;
  document.getElementById("pizzaPrice").innerHTML = clickedPizza.pizzaPrice;
  countPizzaInput.value = clickedPizza.orderCount;
  document.getElementById("popupImg").src = clickedPizza.imageUrl;
  changePriceCurrentFunc();
  $(countPizzaInput).bind("keyup mouseup", function () {
    changePriceCurrentFunc();
  });

  function changePriceCurrentFunc() {
    let hasil = clickedPizza.pizzaPrice * countPizzaInput.value;
    document.getElementById("pizzaPrice").innerHTML = hasil;
    clickedPizza.orderCount = countPizzaInput.value;
  }
  popupPizza.style.display = "block";
  pizzas.style.opacity = "0.5";
  body.style.overflow = "hidden";
}

function addToBasketFunc() {
  let myItem = findItem(clickedPizza.id, myBasket);
  if (!!myItem) {
    myItem.orderCount = Number(clickedPizza.orderCount);
  } else {
    myBasket.push(clickedPizza);
  }
  totalCountPizzaFunc(myBasket);
  closePopupFunc();
}

function removeItemFromBasketFunc(id) {
  myBasket.forEach((element, index) => {
    if (element.id === id) {
      myBasket.splice(index, 1);
    }
  });
  loadDataToBasket();
  totalCountPizzaFunc(myBasket);
}

function openPopupBasketFunc() {
  loadDataToBasket();
  popupBasket.style.display = "block";
  document.getElementsByTagName("main")[0].style.opacity = "0.5";
  body.style.overflowY = "hidden";
}

function loadDataToBasket() {
  let totalAmount = 0;
  itemsInBasket.innerHTML = "";
  for (eachItem of myBasket) {
    let row = document.createElement("div");
    row.className = "row my-2 align-items-center text-light border";
    row.dataId = eachItem.id;

    totalAmount += eachItem.orderCount * eachItem.pizzaPrice;

    row.innerHTML = `<div class="col">
              <div class="h4 col">${eachItem.pizzaName}</div>
              <div class="col text-light price"><p class="text-light">
               <span id="currentItemAmount">${
                 eachItem.orderCount * eachItem.pizzaPrice
               }</span>&nbsp;Azn
            </p></div>
            </div>
            <div class="qty my-2 col">
              <input type="number" class="count" onChange="changingEachInputFunc(this)" name="qty" min="1" value="${
                eachItem.orderCount
              }" />
            </div>
            <div class="col-2">
              <a class="removeItem" onClick="removeItemFromBasketFunc(${
                eachItem.id
              })"> <i class="fa-solid fa-trash-can"></i></a>
            </div>`;
    itemsInBasket.prepend(row);
  }
  if (!myBasket) {
    totalAmount = 0;
  } else {
    document.getElementById("totalAmount").innerHTML = totalAmount;
  }
}

function changingEachInputFunc(e) {
  findItem(e.parentElement.parentElement.dataId, myBasket).orderCount = e.value;
  totalCountPizzaFunc(myBasket);
  loadDataToBasket();
}

function totalCountPizzaFunc(myData) {
  totalCountPizza = 0;
  for (each of myData) {
    totalCountPizza += Number(each.orderCount);
  }
  countPizza.innerHTML = totalCountPizza;
}
