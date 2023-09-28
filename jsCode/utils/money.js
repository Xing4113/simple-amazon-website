// format the decimal point to 2 digits
export function formatPrice(priceCents) {
    return (priceCents / 100).toFixed(2);
}