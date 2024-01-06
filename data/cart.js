export let cart = JSON.parse(localStorage.getItem('cart'));

 
if (!cart) {
    cart =  [{
        productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity : 2,
        deliveryOptionId : '1'
     },{
        productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity : 1,
        deliveryOptionId : '2'
    }];
    
}
 

function addStorage() {
    localStorage.setItem('cart',JSON.stringify(cart));
}

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
            quantity : valueSelection,
            deliveryOptionId : '1'
        })
    }

    addStorage();
}

export function removeFromCart(productId) {
    const newCart = [];
    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });

    cart = newCart;
    addStorage();
}

export function CalculateCartQuantity() {
    let cartQuantity = 0;
    
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    return cartQuantity;
}

export function changeQuantity(productId,newQuantity) {
    let matchingItem;
    cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            matchingItem = cartItem;
        }
    });
    matchingItem.quantity = newQuantity;

    addStorage();
}


export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
    cart.forEach((item) => {
        if (productId === item.productId) {
            matchingItem = item;
            
        }
    });
    matchingItem.deliveryOptionId = deliveryOptionId;

    addStorage();
}

// export function emptyCheck() {
//     cart.forEach((item) => {
//         if (!item) {
//             document.querySelector('.js-empty').classList.add('js-empty-area');
//         }
//     })
// }
