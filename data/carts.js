import { getDate } from "../jsCode/utils/date.js";
import { products } from "./products.js";

// cart's database
export let carts = JSON.parse(localStorage.getItem("carts"));

if (!carts) {
    carts = [{
        productID: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        shippingFee: 0,
        subtotal: 1090,
        deliveryDate: "Wednesday, 04/10/2023",
    },
    {
        productID: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
        quantity: 2,
        shippingFee: 0,
        subtotal: 1598,
        deliveryDate: "Wednesday, 04/10/2023",
    }];
}


function saveToStorage() {
    localStorage.setItem("carts", JSON.stringify(carts));
}

// add to cart 
export function addToCart(productID, quantity) {

    let matchingItem;
    let productPrice;

    products.forEach((product) => {
        if (product.id === productID) {
            productPrice = product.priceCents;
        }
    })

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
            quantity: quantity,
            shippingFee: 0,
            deliveryDate: getDate(7),
            subtotal: productPrice * quantity
        });
    }

    saveToStorage();
}

// delete cart
export function deleteCart(productId) {
    let newCarts = [];
    carts.forEach(cart => {
        if (cart.productID !== productId) {
            newCarts.push(cart);
        }
    });

    carts = newCarts;
    saveToStorage();
}

//calculate cart items
export const calculateCartItems = () => {

    let quantity = 0;

    carts.forEach((cart) => {
        quantity += cart.quantity;
    });

    return quantity;
}

// update cart's items quantity
export const updateQuantity = (productID) => {

    const quantityInput = document.querySelector(`.quantity-input-${productID}`);
    const newQuantity = Number(quantityInput.value);

    const quantityLabel = document.querySelector(`.quantity-label-${productID}`);
    quantityLabel.innerHTML = newQuantity;

    let newSubtotal;
    products.forEach((product) => {
        if (product.id === productID) {
            newSubtotal = product.priceCents * newQuantity;
        }
    });

    carts.forEach((cartItem) => {
        if (productID === cartItem.productID) {
            newSubtotal += cartItem.shippingFee;
            cartItem.quantity = newQuantity;
            cartItem.subtotal = newSubtotal;
        }
    });

    const container = document.querySelector(`.js-cart-item-container-${productID}`);
    container.classList.remove("is-editing-quantity");

    saveToStorage();
}

//update the shipping fee when clicked the input radio
export const updateShippingFee = (productID, selectedFee) => {
    carts.forEach((cart) => {
        let newSubtotal;
        if (cart.productID === productID) {
            newSubtotal = cart.subtotal - cart.shippingFee;
            cart.shippingFee = selectedFee;
            cart.subtotal = newSubtotal + cart.shippingFee;
        }
    });
}

//update the delivery date of specified product
export const updateDeliveryDate = (productID, deliveryDate) => {
    carts.forEach((cart) => {
        if (cart.productID === productID) {
            cart.deliveryDate = deliveryDate;
            document.querySelector(`.js-delivery-date-${productID}`).innerHTML = `Delivery date: ${cart.deliveryDate}`;
        }
    });
}

export function updateCartQuantity() {
    const quantity = calculateCartItems();
    document.querySelector(".js-cart-quantity").innerHTML = quantity === 0 ? "" : quantity;
}

// clear cart
export function clearCarts() {
    carts = [];
    saveToStorage();
}

// update header cart items quantity
export function updateHeaderCartItems() {
    const quantity = calculateCartItems();
    document.querySelector(".cart-items").innerHTML = `${quantity} items`
}

//update the delivery date for next day
export function cartUpToDate() {
    carts.forEach((cart) => {
        cart.deliveryDate = getDate(7);
    });
}