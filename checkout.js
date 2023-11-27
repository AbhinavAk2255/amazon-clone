import { cart , removeFromCart } from "./data/cart.js";
import { products } from "./data/products.js";
import { currencyfunc } from "./utils/money.js";


let cartSummaryHtml = '';

cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    let matchingProduct;

    products.forEach((product) => {
        if (product.id === productId) {
            matchingProduct = product;
            
        }
    });
    console.log(matchingProduct);

    cartSummaryHtml += `
    <section class="cart-area-main js-cart-area-main-${matchingProduct.id}">
        <div class="cart-area">
            <div class="delivery-date">Delivery date: Tuesday, December 5</div>
        </div>
        <div class="cart-item-grid-area">
            <img class="image-item" src="${matchingProduct.image}" alt="">
            <div class="cart-item-details">
                <div class="cart-item-name">${matchingProduct.name}</div>
                <div class="cart-item-price">$${currencyfunc(matchingProduct.priceCents)}</div>
                <div>Quantity
                    <span>${cartItem.quantity}</span>
                    <span class="cart-item-update">Update</span>
                    <span class="cart-item-delete js-delete-link" data-product-id ="${matchingProduct.id}">Delete</span>
                </div>
            </div>
            <div class="decivery-details">
                <div class="decivery-details-time">Choose a delivery option:</div>
                <div class="delivery-grid">
                    <input type="radio" name="delivery-option-${matchingProduct.id}">
                    <div>
                        <div class="date-green">Tuesday, December 5
                        </div>
                        <div class="shipping">FREE Shipping</div>
                    </div>

                </div>
                <div class="delivery-grid">
                    <input type="radio" name="delivery-option-${matchingProduct.id}">
                    <div>
                        <div class="date-green">Wednesday, November 29
                        </div>
                        <div class="shipping">$4.99 - Shipping</div>
                    </div>

                </div>
                <div class="delivery-grid">
                    <input type="radio" name="delivery-option-${matchingProduct.id}">
                    <div>
                        <div class="date-green">Monday, November 27
                        </div>
                        <div class="shipping">$9.99 - Shipping</div>
                    </div>

                </div>
            </div>
        </div>
    </section>
    `;
});

document.querySelector('.js-cart-item-summary').innerHTML = cartSummaryHtml;

document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        // console.log(productId);
        removeFromCart(productId);

        const container = document.querySelector(`.js-cart-area-main-${productId}`);
        container.remove();
    })
})