import { orderDetails } from "../data/orderDetail.js";
import { products } from "../data/products.js";
import { updateCartQuantity } from "../data/carts.js";
import { searchFunction } from "./utils/searchFunction.js";

updateCartQuantity();
searchFunction();

// received the input text from URL
const urlParams = new URLSearchParams(window.location.search);

const orderID = urlParams.get("orderID");
const productID = urlParams.get("productID");

let matchingOrder;

orderDetails.forEach(orderDetail => {
  if (orderDetail.orderID === orderID) {
    orderDetail.products.forEach((product) => {
      if (product.productID === productID) {
        matchingOrder = product;
      }
    });
  }
});

let matchingItem;

products.forEach((product) => {
  if (product.id === matchingOrder.productID) {
    matchingItem = product;
  }
});

document.querySelector(".order-tracking").innerHTML = `

        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">Arriving on ${matchingOrder.arrivingDate}</div>

        <div class="product-info">
          ${matchingItem.name}
        </div>

        <div class="product-info">Quantity: ${matchingOrder.quantity}</div>

        <img
          class="product-image"
          src=${matchingItem.image}
        />

        <div class="progress-labels-container">
          <div class="progress-label">Preparing</div>
          <div class="progress-label current-status">Shipped</div>
          <div class="progress-label">Delivered</div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
`;


