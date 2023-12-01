import { cart } from "../data/cart.js";
import { getProduct, products } from "../data/products.js";
import { getDeliveryOption } from "../data/deliveryOption.js";
import { currencyfunc } from "../utils/money.js";

export function renderPaymentSummary() {
    let priceTotal = 0;
    let shippingPrice = 0;
    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        priceTotal += product.priceCents * cartItem.quantity;
        

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPrice += deliveryOption.priceCents;
    });
    const totalBeforeTax = priceTotal + shippingPrice;
    const taxAmount = totalBeforeTax * 0.1;
    const totalCents = totalBeforeTax + taxAmount;

    const paymentSummaryHtml = `

        <div class="order-summary">Order Summary</div>
        <div class="item-number">
            <div>Items (2):</div>
            <div>
                $${currencyfunc(priceTotal)}
            </div>
        </div>
        <div class="item-number">
            <div>Shipping & handling:</div>
            <div>$${currencyfunc(shippingPrice)}</div>
        </div>
        <div class="item-number-total">
            <div class="total">Total before tax:</div>
            <div class="total-rate">
                $${currencyfunc(totalBeforeTax)}
            </div>
        </div>
        <div class="item-number">
            <div>Estimated tax (10%):</div>
            <div>$${currencyfunc(taxAmount)}</div>
        </div>

        <div class="oreder-total">
            <div>Order total:</div>
            <div>$${currencyfunc(totalCents)}</div>
        </div>

        <div class="paypal-div">
            <div>Use PayPal</div>
            <input type="checkbox">
        </div>

        <div>
            <button class="order-button">Place your order</button>
        </div>

    `;

    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHtml;
}

