import { carts, calculateCartItems, clearCarts, updateHeaderCartItems } from "../data/carts.js";
import { products } from "../data/products.js";
import { formatPrice } from "../jsCode/utils/money.js";
import { orderDetails, updateOrderDetail } from "../data/orderDetail.js";

function calculateShippingFee() {
  let totalShippingFee = 0;

  carts.forEach((cart) => {
    totalShippingFee += cart.shippingFee;
  });

  return totalShippingFee;
}

export function orderSummary() {

  const totalShippingFee = calculateShippingFee();
  let subTotal = 0;
  let tax;
  let priceBeforeTax;
  let orderTotal = 0;

  carts.forEach((cart) => {
    products.forEach((product) => {
      if (product.id === cart.productID) {
        subTotal += product.priceCents * cart.quantity;
      }
    });
  });

  priceBeforeTax = subTotal + totalShippingFee;
  tax = Math.round(priceBeforeTax * 0.1);
  orderTotal = priceBeforeTax + tax;

  return { subTotal: subTotal, shippingFee: totalShippingFee, priceBeforeTax: priceBeforeTax, tax: tax, orderTotal: orderTotal };
}

export function updateSummary() {
  const summary = orderSummary();
  const quantityItems = calculateCartItems();

  document.querySelector(".payment-summary").innerHTML = `
            <div class="payment-summary-title">Order Summary</div>
          
            <div class="payment-summary-row">
              <div>Items (${quantityItems}):</div>
              <div class="payment-summary-money">$${formatPrice(summary.subTotal)}</div>
            </div>
  
            <div class="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div class="payment-summary-money">$${formatPrice(summary.shippingFee)}</div>
            </div>
  
            <div class="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div class="payment-summary-money">$${formatPrice(summary.priceBeforeTax)}</div>
            </div>
  
            <div class="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div class="payment-summary-money">$${formatPrice(summary.tax)}</div>
            </div>
  
            <div class="payment-summary-row total-row">
              <div>Order total:</div>
              <div class="payment-summary-money">$${formatPrice(summary.orderTotal)}</div>
            </div>
  
            <button class="place-order-button button-primary js-place-order-button">
              Place your order
            </button>
    `

  document.querySelector(".js-place-order-button").addEventListener("click", () => {

    if (carts.length !== 0) {
      updateOrderDetail();
      clearCarts();

      const container = document.querySelector(`.order-summary`);
      container.innerHTML = '';
      updateSummary();
      updateHeaderCartItems();

      alert("Payment Successful! Your Order have been placed.");
    }

  });
}