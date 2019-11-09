let itemPrice;
let plainItemPrice;
let closestGuess;
let priceDifference;
let productAction = document.getElementsByClassName("product-action")[0];
let productTitle = document.getElementsByClassName("product-title")[0];
let productPrice = document.getElementsByClassName("product-price-value")[0];
let body = document.getElementsByClassName("glo-detail-page");
let guesses = [];

body[0].style.display = "none";

window.onload = function() {
  [
    "may-like",
    "product-reviewer",
    "banner-wrap",
    "banner-count-down",
    "product-coupon-inner",
    "product-sku",
    "product-quantity-info",
    "product-quantity-title",
    "buyer-pretection",
    "product-price-original",
    "add-wishlist-wrap",
    "product-coupon",
    "banner-big-sale-wrap"
  ].forEach(c => {
    const els = document.getElementsByClassName(c);
    for (let i = 0; i < els.length; i++) {
      els[i].remove();
      // Removing twice because of may-like sidebar
      if (els[i]) {
        els[i].remove();
      }
    }
  });

  let actionWrapper = productAction.cloneNode(true);
  productAction.parentNode.replaceChild(actionWrapper, productAction);

  let buynow = actionWrapper.getElementsByClassName("buynow")[0];
  let addcart = actionWrapper.getElementsByClassName("addcart")[0];

  addcart.classList.remove("coin");
  buynow.setAttribute("id", "reveal-button");
  addcart.setAttribute("id", "add-price-guess");
  buynow.innerText = "Reveal Price";
  addcart.innerText = "Add Price Guess";

  let itemTitle = productTitle.innerText;
  productTitle.innerHTML = "<h1>" + itemTitle + "</h1>";

  itemPriceArray = productPrice.innerText.split(" ");
  itemPrice = itemPriceArray[1];
  plainItemPrice = itemPrice.split("$")[1];
  productPrice.setAttribute("id", "item-price");
  productPrice.innerText = "Item Price Hidden";

  body[0].style.display = "";

  document.getElementById("reveal-button").onclick = function() {
    document.getElementById("add-price-guess").remove();
    document.getElementById("reveal-button").remove();
    if (guesses.length < 1) {
      document.getElementById("item-price").innerText = itemPrice;
    } else {
      closestGuess = closest(plainItemPrice, guesses);

      if (closestGuess === Math.round(100 * plainItemPrice) / 100) {
        document.getElementById(
          "item-price"
        ).innerText = `The exact price of ${itemPrice} was guessed!`;
      } else {
        if (closestGuess > plainItemPrice) {
          priceDifference =
            Math.round(100 * (closestGuess - plainItemPrice)) / 100;
        } else if (closestGuess < plainItemPrice) {
          priceDifference =
            Math.round(100 * (plainItemPrice - closestGuess)) / 100;
        }
        document.getElementById(
          "item-price"
        ).innerText = `$${closestGuess} was the closest. The real price is ${itemPrice}. That's $${priceDifference} off.`;
      }
    }
  };

  document.getElementById("add-price-guess").onclick = function() {
    var guess = prompt("Please enter your guess:");
    if (parseFloat(guess, 10) > 0) {
      guesses.push(parseFloat(guess, 10));
    } else {
      alert("Please enter a valid guess.");
    }
  };
};

function revealPrice() {
  document.getElementsByClassName("product-price-value").innerText =
    '"' + itemPrice + '"';
}

function isFloat(n) {
  return Number(n) === n && n % 1 !== 0;
}

function closest(num, arr) {
  var curr = arr[0];
  var diff = Math.abs(num - curr);
  for (var val = 0; val < arr.length; val++) {
    var newdiff = Math.abs(num - arr[val]);
    if (newdiff < diff) {
      diff = newdiff;
      curr = arr[val];
    }
  }
  return curr;
}
