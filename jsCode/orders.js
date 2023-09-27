import { orderDetails } from "../data/orderDetail.js";
import { products } from "../data/products.js";
import { formatPrice } from "../jsCode/utils/money.js";
import { updateCartQuantity } from "../data/carts.js"

updateCartQuantity();


let htmlCreator = "";

orderDetails.forEach((orderDetail) => {

    let orderContainer = "";
    let productContainer = "";


    products.forEach((product) => {
        orderDetail.products.forEach((orderedProduct) => {
            if (product.id === orderedProduct.id) {
                productContainer += `
                <div class="product-image-container">
                    <img src=${product.image} />
                </div>

                <div class="product-details">
                    <div class="product-name">
                        ${product.name}
                    </div>
                    <div class="product-delivery-date">Arriving on: ${orderedProduct.arrivingDate}</div>
                    <div class="product-quantity">Quantity: ${orderedProduct.quantity}</div>
                    <button class="buy-again-button button-primary">
                        <img class="buy-again-icon" src="images/icons/buy-again.png" />
                        <span class="buy-again-message">Buy it again</span>
                    </button>
                </div>

                <div class="product-actions">
                    <a href="tracking.html">
                        <button class="track-package-button button-secondary">
                            Track package
                        </button>
                    </a>
                </div>

                `
            }
        });
    });

    orderContainer += `
        <div class="order-container">
            <div class="order-header">
                <div class="order-header-left-section">
                    <div class="order-date">
                        <div class="order-header-label">Order Placed:</div>
                        <div>${orderDetail.datePlaced}</div>
                    </div>
                    <div class="order-total">
                        <div class="order-header-label">Total:</div>
                        <div>$${formatPrice(orderDetail.totalAmount)}</div>
                    </div>
                </div>

                <div class="order-header-right-section">
                    <div class="order-header-label">Order ID:</div>
                    <div>${orderDetail.orderID}</div>
                </div>
            </div>

            <div class="order-details-grid">
                ${productContainer}
            </div>    
        </div>
        
    `
    htmlCreator += orderContainer;
    document.querySelector(".orders-grid").innerHTML = htmlCreator;
});


