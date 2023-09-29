import { orderDetails, cancelOrder } from "../data/orderDetail.js";
import { products } from "../data/products.js";
import { formatPrice } from "../jsCode/utils/money.js";
import { updateCartQuantity, addToCart } from "../data/carts.js"
import { searchFunction } from "./utils/searchFunction.js";

updateCartQuantity();
searchFunction();

let htmlCreator = "";

orderDetails.forEach((orderDetail) => {
    let orderContainer = "";
    let productContainer = "";

    products.forEach((product) => {
        orderDetail.products.forEach((orderedProduct) => {
            if (product.id === orderedProduct.productID) {
                productContainer += `

                 <div class="order-details-grid js-${orderDetail.orderID}-${product.id}">
                    <div class="product-image-container">
                        <img src=${product.image} />
                    </div>

                    <div class="product-details">
                        <div class="product-name">
                            ${product.name}
                        </div>
                        <div class="product-delivery-date">Arriving on: ${orderedProduct.deliveryDate}</div>
                        <div class="product-quantity">Quantity: ${orderedProduct.quantity}</div>
                        <button class="buy-again-button button-primary" data-product-id = "${orderedProduct.productID}" data-quantity="${orderedProduct.quantity}">
                            <img class="buy-again-icon" src="images/icons/buy-again.png" />
                            <span class="buy-again-message">Buy it again</span>
                        </button>
                    </div>

                    <div class="product-actions">
                        <a class="track-link" href="tracking.html?orderID=${orderDetail.orderID}&productID=${orderedProduct.productID}">
                            <button class="track-package-button button-secondary">
                                Track package
                            </button>
                        </a>
                        
                        <button class="cancel-order-button button-secondary" data-order-id="${orderDetail.orderID}" data-product-id = "${orderedProduct.productID}">
                            Cancel Order
                        </button>

                    </div>
                </div> 
                `
            }
        });
    });

    orderContainer += `
        <div class="order-container js-order-container-${orderDetail.orderID}">
            <div class="order-header">
                <div class="order-header-left-section">
                    <div class="order-date">
                        <div class="order-header-label">Order Placed:</div>
                        <div>${orderDetail.datePlaced}</div>
                    </div>
                    <div class="order-total">
                        <div class="order-header-label">Total:</div>
                        <div class="js-order-total-${orderDetail.orderID}">$${formatPrice(orderDetail.totalAmount)}</div>
                    </div>
                </div>

                <div class="order-header-right-section">
                    <div class="order-header-label">Order ID:</div>
                    <div>${orderDetail.orderID}</div>
                </div>
            </div>

            ${productContainer}
               
        </div>
        
    `
    htmlCreator += orderContainer;
    document.querySelector(".orders-grid").innerHTML = htmlCreator;
});

// add the purchased item to cart
document.querySelectorAll(".buy-again-button").forEach((buyAgainBtn) => {
    buyAgainBtn.addEventListener("click", () => {
        const productID = buyAgainBtn.dataset.productId;
        let quantity = buyAgainBtn.dataset.quantity;
        quantity = Number(quantity);

        addToCart(productID, quantity);
        updateCartQuantity();
        alert("Added To Your Cart!");
    });
});

// cancel the order
document.querySelectorAll(".cancel-order-button").forEach((cancelOrderBtn) => {
    cancelOrderBtn.addEventListener("click", () => {

        const orderID = cancelOrderBtn.dataset.orderId;
        const productID = cancelOrderBtn.dataset.productId;

        cancelOrder(orderID, productID);
    });
});
