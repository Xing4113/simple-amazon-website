import { products } from '../data/products.js';
import { addToCart, updateCartQuantity } from '../data/carts.js';
import { formatPrice } from "../jsCode/utils/money.js";
import { searchFunction } from "./utils/searchFunction.js";

let productsGridContainer = "";

// update the quantity of cart in right-section-header
updateCartQuantity();
// add search function 
searchFunction();

products.forEach(products => {

    productsGridContainer += `
        
            <div class="product-container">
            <div class="product-image-container">
                <img
                class="product-image"
                src="${products.image}"
                alt=""
                />
            </div>
            <div class="product-name limit-text-to-2-lines">
                ${products.name}
            </div>
            <div class="product-rating-container">
                <img
                class="product-rating-stars"
                src="./images/ratings/rating-${products.rating.stars * 10}.png"
                alt=""
                />
                <div class="product-rating-count">${products.rating.count}</div>
            </div>
            <div class="product-price">$${formatPrice(products.priceCents)}</div>
            <div class="product-quantity-container" >
                <select class = "js-quantity-selector-${products.id}">
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
            <div class="added-to-cart js-added-to-cart-${products.id}">
                <img src="/images/icons/checkmark.png" />
                Added
            </div>
            <button class="add-to-cart-button button-primary js-add-to-cart-btn" data-product-id = "${products.id}" >Add to Cart</button>
            </div>
        `;

    document.querySelector(".js-products-grid").innerHTML = productsGridContainer;

}
);

// to add the selected quantity of specified item to cart
document.querySelectorAll(".js-add-to-cart-btn").forEach(button => {

    button.addEventListener("click", () => {

        //get the data from the specified element that have clicked
        const productID = button.dataset.productId;
        let quantity = document.querySelector(".js-quantity-selector-" + productID).value;
        quantity = Number(quantity);

        //display icon
        addedIcon(productID);
        addToCart(productID, quantity);
        updateCartQuantity();
    });

});

function addedIcon(productID) {
    const addedToCart = document.querySelector(".js-added-to-cart-" + productID);
    //set the specified icon appear
    addedToCart.style.opacity = 1;
    //set the specified icon disappear after 2s
    setTimeout(() => addedToCart.style.opacity = 0, 2000);
}




