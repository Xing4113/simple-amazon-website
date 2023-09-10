import { products } from '../data/products.js';
import { carts } from '../data/carts.js';

let htmlCreator = "";

products.forEach(products => {

    htmlCreator += `
        
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
                src="/images/ratings/rating-${products.rating.stars * 10}.png"
                alt=""
                />
                <div class="product-rating-count">${products.rating.count}</div>
            </div>
            <div class="product-price">$${(products.priceCents / 100).toFixed(2)}</div>
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
            <div class="added-to-cart">
                <img src="/images/icons/checkmark.png" />
                Added
            </div>
            <button class="add-to-cart-button button-primary js-add-to-cart-btn" data-product-id = "${products.id}" >Add to Cart</button>
            </div>
        `;

    document.querySelector(".js-products-grid").innerHTML = htmlCreator;
}
);

const addToCart = document.querySelectorAll(".js-add-to-cart-btn");

addToCart.forEach(button => {

    button.addEventListener("click", () => {
        const productID = button.dataset.productId;
        let quantity = document.querySelector(".js-quantity-selector-" + productID).value;
        quantity = Number(quantity);
        let matchingItem;

        carts.forEach(cartItem => {
            if (cartItem.productID === productID) {
                matchingItem = cartItem;
            }
        });

        if (matchingItem) {
            matchingItem.quantity += quantity;

        } else {
            carts.push({
                productID: productID,
                quantity: quantity
            });
        }

        updateCartQuntity();
    });

});

function updateCartQuntity() {
    let totalQuantity = 0;
    carts.forEach(cart => totalQuantity += cart.quantity);
    document.querySelector(".js-cart-quantity").innerHTML = totalQuantity;
}


