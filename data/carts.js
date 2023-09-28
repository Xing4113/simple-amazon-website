import { getDate } from "../jsCode/utils/date.js";

export let carts = JSON.parse(localStorage.getItem("carts"));

if (!carts) {
    carts = [{
        productID: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        shippingFee: 0,
        deliveryDate: "Wednesday, 04/10/2023",
    },
    {
        productID: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
        quantity: 2,
        shippingFee: 0,
        deliveryDate: "Wednesday, 04/10/2023",
    }];
}


function saveToStorage() {
    localStorage.setItem("carts", JSON.stringify(carts));
}

export function addToCart(productID, quantity) {

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
            quantity: quantity,
            shippingFee: 0,
            deliveryDate: getDate(7),
        });
    }

    saveToStorage();
}

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

export const calculateCartItems = () => {

    let quantity = 0;

    carts.forEach((cart) => {
        quantity += cart.quantity;
    });

    return quantity;
}

export const updateQuantity = (productID) => {

    const quantityInput = document.querySelector(`.quantity-input-${productID}`);
    const newQuantity = Number(quantityInput.value);

    const quantityLabel = document.querySelector(`.quantity-label-${productID}`);
    quantityLabel.innerHTML = newQuantity;

    carts.forEach((cartItem) => {
        if (productID === cartItem.productID) {
            cartItem.quantity = newQuantity;
        }
    });

    const container = document.querySelector(`.js-cart-item-container-${productID}`);
    container.classList.remove("is-editing-quantity");

    saveToStorage();
}

export const updateShippingFee = (productID, selectedFee) => {
    carts.forEach((cart) => {
        if (cart.productID === productID) {
            cart.shippingFee = selectedFee;
        }
    });
}

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

export function clearCarts() {
    carts = [];
    saveToStorage();
}

export function updateHeaderCartItems() {
    const quantity = calculateCartItems();
    document.querySelector(".cart-items").innerHTML = `${quantity} items`
}

export function cartUpToDate() {
    carts.forEach((cart) => {
        cart.deliveryDate = getDate(7);
    });
}