import { cart ,addToCart } from "./data/cart.js";
import { products } from "./data/products.js";
import { currencyfunc } from "./utils/money.js";


let productHtml = '';

products.forEach((product) => {
    productHtml += `

    <div class="product-container">
        <div class="image-area">
            <img class="container-image" src="${product.image}" alt="">
        </div>
        <div class="product-para">
            ${product.name}
        </div>
        <div class="rating">
            <img src="rating-images/rating-${product.rating.stars*10}.png" alt="">
            <span>${product.rating.count}</span>
        </div>
        <div class="product-price">
            $${currencyfunc(product.priceCents)}
        </div>
        <div class="quantity">
            <select class="selection-item js-quantity-selector-${product.id}" name="" id="">
                <option selected value="1">1</option>
                <option  value="2">2</option>
                <option  value="3">3</option>
                <option  value="4">4</option>
                <option  value="5">5</option>
                <option  value="6">6</option>
                <option  value="7">7</option>
                <option  value="8">8</option>
                <option  value="9">9</option>
                <option  value="10">10</option>
            </select>
        </div>


        <div class="product-spacer"></div>
        <div class="added-message js-added-${product.id}">
            <img src="/icons/checkmark.png/" alt="">
            Added
        </div>
        <button class="add-btn js-add-to-cart" data-product-id="${product.id}">Add to cart</button>
    </div>
    `
})

document.querySelector('.js-html-space').innerHTML = productHtml;


function updateCartQuantity() {
    let cartQuantity = 0;

    cart.forEach((item) => {
        cartQuantity += item.quantity
    });
    document.querySelector('.js-quantity-add').innerHTML = cartQuantity;
}

function addMessage(productId) {
    let addedMessageTimeoutId;
    document.querySelector(`.js-added-${productId}`).classList.add('msg-added')
    setTimeout(() => {
        if (addedMessageTimeoutId) {
            clearTimeout(addedMessageTimeoutId);
        }
        const timeid = setTimeout(() => {
            document.querySelector(`.js-added-${productId}`).classList.remove('msg-added')
        }, 2000);
        addedMessageTimeoutId = timeid;
    });
}


/Add to cart button intractive using foreach to traverse through buttons/ 


document.querySelectorAll('.js-add-to-cart').forEach((buttons) => {
    
    buttons.addEventListener('click', () => {

        const {productId} = buttons.dataset;
        
        addMessage(productId);

        addToCart(productId);
        updateCartQuantity();
    });
});

