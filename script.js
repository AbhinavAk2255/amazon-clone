
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
            $${(product.priceCents / 100).toFixed(2)}
        </div>
        <div class="quantity">
            <select class="selection-item" name="" id="">
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
        <div class="added-message">
            <img src="/icons/checkmark.png/" alt="">
            Added
        </div>
        <button class="add-btn">Add to cart</button>
    </div>
    `
})


document.querySelector('.js-html-space').innerHTML = productHtml;