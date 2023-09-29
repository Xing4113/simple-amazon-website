import { products } from '../data/products.js';
import { addToCart, updateCartQuantity } from '../data/carts.js';
import { formatPrice } from "../jsCode/utils/money.js";
import { searchFunction } from "./utils/searchFunction.js";

let htmlCreator = "";

// received the input text from URL
const urlParams = new URLSearchParams(window.location.search);
const inputText = urlParams.get("inputText").toUpperCase();

searchFunction();
updateCartQuantity();
let searchRecord = 0;

products.forEach(product => {

    let matchingItem;

    if (product.name.toUpperCase().includes(inputText)) {
        matchingItem = product;
        searchRecord++;
    }

    if (matchingItem) {
        htmlCreator += `
            <div class="product-container">
            <div class="product-image-container">
                <img
                class="product-image"
                src="${matchingItem.image}"
                alt=""
                />
            </div>
            <div class="product-name limit-text-to-2-lines">
                ${matchingItem.name}
            </div>
            <div class="product-rating-container">
                <img
                class="product-rating-stars"
                src="images/ratings/rating-${matchingItem.rating.stars * 10}.png"
                alt=""
                />
                <div class="product-rating-count">${matchingItem.rating.count}</div>
            </div>
            <div class="product-price">$${formatPrice(matchingItem.priceCents)}</div>
            <div class="product-quantity-container" >
                <select class = "js-quantity-selector-${matchingItem.id}">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                </select>
            </div>

            <div class="product-spacer"></div>
            <div class="added-to-cart js-added-to-cart-${matchingItem.id}">
                <img src="images/icons/checkmark.png" />
                Added
            </div>
            <button class="add-to-cart-button button-primary js-add-to-cart-btn" data-product-id = "${matchingItem.id}" >Add to Cart</button>
            </div>
        `;

        document.querySelector(".js-products-grid").innerHTML = htmlCreator;

    }

    document.querySelector(".js-search-record").innerHTML = searchRecord;
}
);

const addToCarts = document.querySelectorAll(".js-add-to-cart-btn");

addToCarts.forEach(button => {

    button.addEventListener("click", () => {

        const productID = button.dataset.productId;
        let quantity = document.querySelector(".js-quantity-selector-" + productID).value;

        quantity = Number(quantity);

        addedIcon(productID);
        addToCart(productID, quantity);
        updateCartQuantity();
    });

});

function addedIcon(productID) {
    const addedToCart = document.querySelector(".js-added-to-cart-" + productID);
    addedToCart.style.opacity = 1;
    setTimeout(() => addedToCart.style.opacity = 0, 2000);
}




