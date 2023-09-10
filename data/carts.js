export const carts = [
    {
        productID : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity : 1
    },
    {
        productID : "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
        quantity : 2
    }
];

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
            quantity: quantity
        });
    }
}