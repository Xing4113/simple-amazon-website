export let carts = JSON.parse(localStorage.getItem("carts"));

if (!carts) {
    carts = [{
        productID: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        shippingFee: 0
    },
    {
        productID: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
        quantity: 2,
        shippingFee: 0
    }];
}


function saveToStorage() {
    localStorage.setItem("carts", JSON.stringify(carts));
}

export function addToCart(productID) {

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
            quantity: quantity,
            shippingFee: 0
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

export const updateQuantity = (newQuantity, productID) => {

    carts.forEach((cartItem) => {
        if (productID === cartItem.productID) {
            cartItem.quantity = newQuantity;
        }
    });

    saveToStorage();
}