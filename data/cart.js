 export const cart = [];

 export function addToCart(productId) {

    let matchingItem;

    const valueSelection = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

    cart.forEach((item) => {
        if (productId === item.productId) {
            matchingItem = item;
        }
    });
    if (matchingItem) {
        matchingItem.quantity += valueSelection;
    }
    else {
        cart.push({
            productId : productId,
            quantity : valueSelection
        })
    }
}
