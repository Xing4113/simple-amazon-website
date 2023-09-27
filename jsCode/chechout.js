import { carts, deleteCart, calculateCartItems, updateQuantity, updateShippingFee } from "../data/carts.js";
import { products } from "../data/products.js";
import { formatPrice } from "../jsCode/utils/money.js";
import { updateSummary } from "../data/orderSummary.js"
let htmlCreator = "";

updateCartItems();

carts.forEach(cart => {

  let matchingProduct;

  products.forEach(product => {
    if (product.id === cart.productID) {
      matchingProduct = product;
    }
  });

  htmlCreator += `
    
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery date: Tuesday, June 21
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-price">
          $${formatPrice(matchingProduct.priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: 
            <span class="quantity-label quantity-label-${matchingProduct.id}">${cart.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary update-btn-${matchingProduct.id}" data-product-id = "${matchingProduct.id}">
            Update
          </span>
         
          <input class="quantity-input quantity-input-${matchingProduct.id}" type="number" min="1" value="${cart.quantity}"/>
          <span class="save-quantity-link link-primary save-link" data-product-id = "${matchingProduct.id}">Save</span>

          <span class="delete-quantity-link link-primary" data-product-id = "${matchingProduct.id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        <div class="delivery-option">
          <input type="radio" checked
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}" data-shipping-fee="${0}" data-product-id="${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Tuesday, June 21
            </div>
            <div class="delivery-option-price">
              FREE Shipping
            </div>
          </div>
        </div>

        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}" data-shipping-fee = "${499}" data-product-id="${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Wednesday, June 15
            </div>
            <div class="delivery-option-price">
              $4.99 - Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}" data-shipping-fee = "${999}" data-product-id="${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Monday, June 13
            </div>
            <div class="delivery-option-price">
              $9.99 - Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  `

  document.querySelector(".order-summary").innerHTML = htmlCreator;
  updateSummary();
});


const deleteBtns = document.querySelectorAll(".delete-quantity-link");

deleteBtns.forEach(deleteBtn => {
  deleteBtn.addEventListener("click", () => {

    const productID = deleteBtn.dataset.productId;
    deleteCart(productID);

    const container = document.querySelector(`.js-cart-item-container-${productID}`);
    container.remove();
    updateCartItems();
    updateSummary();
  });
});

function updateCartItems() {
  const quantity = calculateCartItems();
  document.querySelector(".cart-items").innerHTML = `${quantity} items`
}


document.querySelectorAll(".update-quantity-link").forEach((updateLink) => {

  updateLink.addEventListener("click", () => {

    const productID = updateLink.dataset.productId;
    const container = document.querySelector(`.js-cart-item-container-${productID}`);

    container.classList.add("is-editing-quantity");
  });
});

document.querySelectorAll(".save-link").forEach((saveLink) => {
  saveLink.addEventListener("click", () => {

    const productID = saveLink.dataset.productId;
    const container = document.querySelector(`.js-cart-item-container-${productID}`);
    container.classList.remove("is-editing-quantity");

    const quantityInput = document.querySelector(`.quantity-input-${productID}`);
    const newQuantity = Number(quantityInput.value);

    const quantityLabel = document.querySelector(`.quantity-label-${productID}`);
    quantityLabel.innerHTML = newQuantity;

    updateQuantity(newQuantity, productID);
    updateCartItems();
    updateSummary();
  })
});



document.querySelectorAll(".delivery-option-input").forEach((option) => {
  option.addEventListener("click", () => {

    const productID = option.dataset.productId;
    const selectedFee = Number(option.dataset.shippingFee);
    updateShippingFee(productID, selectedFee);
    updateSummary();
  });
});


document.querySelector(".js-place-order-button").addEventListener("click", () => {
  
  

});