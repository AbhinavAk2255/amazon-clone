import { CalculateCartQuantity, cart , removeFromCart,changeQuantity} from "./data/cart.js";
import { products } from "./data/products.js";
import { currencyfunc } from "./utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions } from "./data/deliveryOption.js";

const today = dayjs();
const deliveryDate = today.add(7, 'days');
deliveryDate.format('dddd, mmmm D');


let cartSummaryHtml = '';

cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    let matchingProduct;

    products.forEach((product) => {
        if (product.id === productId) {
            matchingProduct = product;
            
        }
    });
    
    const deliveryOptionId = cartItem.deliveryOptionId;
    let deliveryOption;

    deliveryOptions.forEach((prodt) => {
        if (prodt.id === deliveryOptionId) {
            deliveryOption = prodt;
        }
    });
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd ,MMMM D');

    cartSummaryHtml += `
    <section class="cart-area-main js-cart-area-main-${matchingProduct.id}">
        <div class="cart-area">
            <div class="delivery-date">Delivery date: ${dateString}</div>
        </div>
        <div class="cart-item-grid-area">
            <img class="image-item" src="${matchingProduct.image}" alt="">
            <div class="cart-item-details">
                <div class="cart-item-name">${matchingProduct.name}</div>
                <div class="cart-item-price">$${currencyfunc(matchingProduct.priceCents)}</div>
                <div>Quantity
                    <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                    <span class="cart-item-update js-update-link" data-product-id ="${matchingProduct.id}">Update</span>
                    <input type="number" class="quantity-input js-quantity-input-${matchingProduct.id}">
                    <span class="save-quantity-link" data-product-id = "${matchingProduct.id}">Save</span>
                    <span class="cart-item-delete js-delete-link" data-product-id ="${matchingProduct.id}">Delete</span>
                </div>
            </div>
            <div class="decivery-details">
                <div class="decivery-details-time">Choose a delivery option:</div>
                ${deliveryOptionHtml(matchingProduct,cartItem)}
            </div>
        </div>
    </section>
    `;
});


function deliveryOptionHtml(matchingProduct,cartItem) {
    let html = '';
    deliveryOptions.forEach((option) => {
        const today = dayjs();
        const deliveryDate = today.add(option.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd ,MMMM D');
        const priceCal = option.priceCents === 0 ? 'FREE ' : `$${currencyfunc(option.priceCents)} - `;
        const isChecked = option.id === cartItem.deliveryOptionId;
        html += `
            <div class="delivery-grid">
                <input type="radio" ${isChecked ? 'checked' : ''} name="delivery-option-${matchingProduct.id}">
                <div>
                    <div class="date-green">${dateString}</div>
                    <div class="shipping">${priceCal}Shipping</div>
                </div>

            </div>
        `; 
    });
    return html;
}

document.querySelector('.js-cart-item-summary').innerHTML = cartSummaryHtml;

document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        // console.log(productId);
        removeFromCart(productId);

        const container = document.querySelector(`.js-cart-area-main-${productId}`);
        container.remove();
        updateCartQuantity();
    });
})

document.querySelectorAll('.js-update-link').forEach((link1) => {
    link1.addEventListener('click', () => {
        const productId = link1.dataset.productId;
        const container = document.querySelector(`.js-cart-area-main-${productId}`);
        container.classList.add('is-editing-quantity');
    })
})

document.querySelectorAll('.save-quantity-link').forEach((link3) => {
    link3.addEventListener('click', () => {
        const productId = link3.dataset.productId;

        const quantityInput = Number(document.querySelector(`.js-quantity-input-${productId}`).value);

        if (quantityInput<0 || quantityInput>1000) {
            alert('Quantity must be at least 0 and less than 1000');
            return;
        }

        changeQuantity(productId,quantityInput);
        const container = document.querySelector(`.js-cart-area-main-${productId}`);
        container.classList.remove('is-editing-quantity');

        const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
        quantityLabel.innerHTML = quantityInput;


        updateCartQuantity();

    });
});

updateCartQuantity();

function updateCartQuantity() {
    const cartQuantity = CalculateCartQuantity();
    document.querySelector('.js-cart-item-quantity')
        .innerHTML = `${cartQuantity} items`;
}