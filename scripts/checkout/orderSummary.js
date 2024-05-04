import { cart, deleteItemFromCart, updateCartQuantity, updateQuantityInThePage } from "../../data/cart.js"
import { getMatchProduct } from "../../data/products.js";
import formatCurrency from "../utils/formatCurrency.js";

export const rednerOrderSummary = () => {
  updateQuantityInThePage("js-quantity");
  let orderSummaryHTML = '';
  cart.forEach(item => {
    const [matchingProduct] = getMatchProduct(item.id);
    orderSummaryHTML += `
    <div class="cart-item-container js-container-${matchingProduct.id}">
        <div class="delivery-date">Delivery date: Tuesday, June 21</div>
        <div class="cart-item-details-grid">
          <img
            class="product-image"
            src=${matchingProduct.image}
          />

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">$${formatCurrency(matchingProduct.priceCents)}</div>
            <div class="product-quantity ">
              <span> Quantity: <span class="quantity-label">${item.quantity}</span> </span>
              <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                Update
              </span>
              <span class="delete-quantity-link link-primary js-delete-link " data-product-id="${matchingProduct.id}">
                Delete
              </span>
              <div class="update-form">
                <input class="js-update-input-${matchingProduct.id}" />
                <button class="link-primary js-update-btn" data-product-id="${matchingProduct.id}">Update</button>
                <button class="link-primary js-cancel-btn" data-product-id="${matchingProduct.id}">Cancel</button>
              </div>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            <div class="delivery-option">
              <input
                type="radio"
                checked
                class="delivery-option-input"
                name="delivery-option-1-${item.id}"
              />
              <div>
                <div class="delivery-option-date">Tuesday, June 21</div>
                <div class="delivery-option-price">FREE Shipping</div>
              </div>
            </div>
            <div class="delivery-option">
              <input
                type="radio"
                class="delivery-option-input"
                name="delivery-option-1-${item.id}"
              />
              <div>
                <div class="delivery-option-date">Wednesday, June 15</div>
                <div class="delivery-option-price">$4.99 - Shipping</div>
              </div>
            </div>
            <div class="delivery-option">
              <input
                type="radio"
                class="delivery-option-input"
                name="delivery-option-1-${item.id}"
              />
              <div>
                <div class="delivery-option-date">Monday, June 13</div>
                <div class="delivery-option-price">$9.99 - Shipping</div>
              </div>
            </div>
          </div>
        </div>
      </div>`;
  });

  document.querySelector(".js-order-summary").innerHTML = orderSummaryHTML;


  // delete item from cart
  document.querySelectorAll('.js-delete-link').forEach(deleteLink => {
    deleteLink.addEventListener('click' , () => {
      const { productId } = deleteLink.dataset;
      deleteItemFromCart(productId);
      rednerOrderSummary();
    })
  })


  // open update item in the cart
  document.querySelectorAll('.js-update-link').forEach(updateLink => {
    updateLink.addEventListener('click', () => {
      const { productId } = updateLink.dataset;
      const cartItemContainer = document.querySelector(`.js-container-${productId}`);
      cartItemContainer.classList.add("is-updating")
    })
  })


  // cancle updating cart item
  document.querySelectorAll('.js-cancel-btn').forEach(calcelBtn => {
    calcelBtn.addEventListener('click', () => {
      const { productId } = calcelBtn.dataset;
      const cartItemContainer = document.querySelector(`.js-container-${productId}`);
      cartItemContainer.classList.remove("is-updating")
    })
  })


  // update item in the cart
  document.querySelectorAll('.js-update-btn').forEach(updateBtn => {
    updateBtn.addEventListener('click', () => {
      const { productId } = updateBtn.dataset;
      const cartItemContainer = document.querySelector(`.js-container-${productId}`);
      const quantityUpdateValue = +document.querySelector(`.js-update-input-${productId}`).value;
      if((typeof quantityUpdateValue === "number") && quantityUpdateValue < 1000){
        updateCartQuantity(productId, quantityUpdateValue);
        cartItemContainer.classList.remove("is-updating");
        rednerOrderSummary();
      }
    })
  })
};