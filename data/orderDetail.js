import { carts } from "./carts.js";
import { getDate } from "../jsCode/utils/date.js";
import { orderSummary } from "./orderSummary.js";

export let orderDetails = JSON.parse(localStorage.getItem("orderDetails"));

if (!orderDetails) {
    orderDetails = [
        {
            orderID: "A0001",
            datePlaced: "August 12",
            totalAmount: 3506,
            products: [
                {
                    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    arrivingDate: "August 15",
                    quantity: 1
                },
                {
                    id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
                    arrivingDate: "August 19",
                    quantity: 2
                }
            ]
        },
        {
            orderID: "A0120",
            datePlaced: "August 19",
            totalAmount: 3506,
            products: [
                {
                    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    arrivingDate: "August 20",
                    quantity: 1
                },
                {
                    id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
                    arrivingDate: "August 22",
                    quantity: 2
                }
            ]
        }
    ];
}

function saveToStorage() {
    localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
}

export function updateOrderDetail() {
    let products = [];

    carts.forEach((cart) => {
        products.push(
            {
                id: cart.productID,
                arrivingDate: cart.deliveryDate,
                quantity: cart.quantity
            }
        );
    });

    orderDetails.push({
        orderID: `AW${Math.floor(Math.random() * 10000 + 1)}`,
        datePlaced: getDate(0),
        totalAmount: orderSummary().orderTotal,
        products: products,
    });

    saveToStorage();
}