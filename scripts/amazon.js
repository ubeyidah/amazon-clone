import { products,  loadProductsFetch } from "../data/products.js";
import { cart } from "../data/cart.js";



async function renderProducts() {
await loadProductsFetch();
let productsHTML = '';
products.forEach(product => {
  productsHTML += `
  <div class="product-container">
    <div class="product-image-container">
        <img
          class="product-image"
          src=${product.image}
        />
      </div>

      <div class="product-name limit-text-to-2-lines">
       ${product.name}
      </div>

      <div class="product-rating-container">
        <img
          class="product-rating-stars"
          src=${product.getStarURL()}
        />
        <div class="product-rating-count link-primary">${product.rating.count}</div>
      </div>

      <div class="product-price">${product.getPrice()}</div>

      <div class="product-quantity-container">
        <select class="js-quantity-sel-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      ${product.getChartSizeHTML()}
      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png" />
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
  </div>`;
});

document.querySelector('.js-products-container').innerHTML = productsHTML;

// add to card
document.querySelectorAll(".js-add-to-cart-btn").forEach(addBtn => {
  addBtn.addEventListener('click',() => {
    const { productId } = addBtn.dataset;
    const itemQuantity = +document.querySelector(`.js-quantity-sel-${productId}`).value;
    cart.addToCart(productId, itemQuantity);
    cart.updateQuantityInThePage('js-cart-quantity');
  })
})

}


// init
cart.updateQuantityInThePage('js-cart-quantity');
renderProducts();