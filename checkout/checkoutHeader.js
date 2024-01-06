import { cart } from "../data/cart.js";

export function renderCheckoutHeader() {
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });

    const checkoutHeaderHtml = `
    
        <div class="header-main">
            <section class="left-section">
                <img class="logo-checkout" src="icons/amazon-logo-checkout.png" alt="">
                <img class="mobile-black-logo" src="icons/amazon-mobile-logo.png" alt="">
            </section>

            <section class="middle-section">
                <div class="cartitem">
                    Checkout ( <a href="main.html" class="js-cart-item-quantity">${cartQuantity}-Items</a> )
                </div>
            </section>

            <section class="right-section">
                <img src="icons/checkout-lock-icon.png" alt="">
            </section>
            
        </div>

    `;
    document.querySelector('.js-checkout-header').innerHTML = checkoutHeaderHtml;
}