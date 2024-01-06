import { CalculateCartQuantity, cart , removeFromCart,changeQuantity,updateDeliveryOption} from "../data/cart.js";
import { products,getProduct } from "../data/products.js";
import { currencyfunc } from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions, getDeliveryOption, calculateDeliveryDate } from "../data/deliveryOption.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";

// const today = dayjs();
// const before = today.subtract(1, 'month');
// const days = today.add(7 , 'dyas');
// const formatday = days.format('dddd');
// console.log(formatday);
// console.log(today.format('dddd'));


// let date = dayjs();
// console.log(date.format('dddd, MMMM D'));
// console.log(isWeekend(date));


export function renderOrderSummary() {
    let cartSummaryHtml = '';

    cart.forEach((cartItem) => {
        const productId = cartItem.productId;

        const matchingProduct = getProduct(productId);

        const deliveryOptionId = cartItem.deliveryOptionId;

        let deliveryOption = getDeliveryOption(deliveryOptionId);

        calculateDeliveryDate(deliveryOption);

        cartSummaryHtml += `
        <section class="cart-area-main js-cart-area-main-${matchingProduct.id}">
            <div class="cart-area">
                <div class="delivery-date">Delivery date: ${calculateDeliveryDate(deliveryOption)}</div>
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
        deliveryOptions.forEach((deliveryOption) => {
            calculateDeliveryDate(deliveryOption);

            const priceCal = deliveryOption.priceCents === 0 ? 'FREE ' : `$${currencyfunc(deliveryOption.priceCents)} - `;
            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
            html += `
                <div class="delivery-grid js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
                    <input type="radio" ${isChecked ? 'checked' : ''} name="delivery-option-${matchingProduct.id}">
                    <div>
                        <div class="date-green">${calculateDeliveryDate(deliveryOption)}</div>
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

            renderOrderSummary();
            renderCheckoutHeader();
            renderPaymentSummary();
        });
    });

    document.querySelectorAll('.js-delivery-option').forEach((element) => {
        element.addEventListener('click', () => {
            const productId = element.dataset.productId;
            const deliveryOptionId = element.dataset.deliveryOptionId;
            updateDeliveryOption(productId, deliveryOptionId);
            renderOrderSummary();
            renderPaymentSummary();
        });
    });

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


            renderCheckoutHeader();
            renderPaymentSummary();
            

        });

    });
    renderCheckoutHeader();
    
    


}




// function updateCartQuantity() {
//     const cartQuantity = CalculateCartQuantity();
//     document.querySelector('.js-cart-item-quantity')
//         .innerHTML = `${cartQuantity} items`;
// }