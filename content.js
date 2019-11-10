let itemPrice;
let plainItemPrice;
let closestGuess;
let priceDifference;
let productAction = document.getElementsByClassName("product-action")[0];
let productTitle = document.getElementsByClassName("product-title")[0];
let productPrice = document.getElementsByClassName("product-price-value")[0];
let body = document.getElementsByTagName("body");
let guesses = [];
let itemPriceArray = [];

console.log(body[0].className);

if (body[0].className !== "glo-detail-page") {
  productPrice.innerText = "This extension does not work in your country.";
} else {

// Hiding entire page until all changes to the page are made
  body[0].style.display = "none";

// Removing unnecessary or price revealing elements
  window.onload = function () {
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
        // Removing element twice because of may-like sidebar
        if (els[i]) {
          els[i].remove();
        }
      }
    });

    // Removing event listeners
    let actionWrapper = productAction.cloneNode(true);
    productAction.parentNode.replaceChild(actionWrapper, productAction);

    let buynow = actionWrapper.getElementsByClassName("buynow")[0];
    let addcart = actionWrapper.getElementsByClassName("addcart")[0];

    // Changing button contents and adding id attributes
    addcart.classList.remove("coin");
    buynow.setAttribute("id", "reveal-button");
    addcart.setAttribute("id", "add-price-guess");
    buynow.innerText = "Reveal Price";
    addcart.innerText = "Add Price Guess";

    // Make the title of the item bigger so it's easier to read
    let itemTitle = productTitle.innerText;
    productTitle.innerHTML = "<h1>" + itemTitle + "</h1>";

    // Formatting and storing actual item price, then
    itemPriceArray = productPrice.innerText.split(" ");
    itemPrice = itemPriceArray[1];
    plainItemPrice = itemPrice.split("$")[1];
    productPrice.setAttribute("id", "item-price");
    productPrice.innerText = "Item Price Hidden";

    // Revealing fully changed and loaded page
    body[0].style.display = "";

    // Reveal button logic
    document.getElementById("reveal-button").onclick = function () {
      // Remove reveal and add guess buttons
      document.getElementById("add-price-guess").remove();
      document.getElementById("reveal-button").remove();
      // Check if any guesses have been made
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

    // Add price guess button logic
    document.getElementById("add-price-guess").onclick = function () {
      let guess = prompt("Please enter your guess:");
      if (parseFloat(guess, 10) > 0) {
        guesses.push(parseFloat(guess, 10));
      } else {
        alert("Please enter a valid guess.");
      }
    };
  };

}

// Finding the closest guess in the array
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
