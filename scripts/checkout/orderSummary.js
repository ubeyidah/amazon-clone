import { cart } from "../../data/cart.js"
import { getMatchProduct } from "../../data/products.js";
import formatCurrency from "../utils/formatCurrency.js";
import { deliveryOptions, getMatchDeliveryOption } from "../../data/deliveryOptions.js";
import deliveryDateStr from "../utils/deliveryDateStr.js";
import { renderPaymentSummary } from "./paymentSummary.js";

export const rednerOrderSummary = () => {
  cart.updateQuantityInThePage("js-quantity");
  let orderSummaryHTML = '';
  cart.cartItem.forEach(item => {
    const [matchingProduct] = getMatchProduct(item.id);
    const [matchingDeliveryOption] = getMatchDeliveryOption(item.deliveryOptionId);
    const deliveryDayString = deliveryDateStr(matchingDeliveryOption.deliveryDay)

    orderSummaryHTML += `
    <div class="cart-item-container js-cart-item-container js-container-${matchingProduct.id}">
        <div class="delivery-date">Delivery date: ${deliveryDayString}</div>
        <div class="cart-item-details-grid">
          <img
            class="product-image"
            src=${matchingProduct.image}
          />

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">$${matchingProduct.getPrice()}</div>
            <div class="product-quantity js-product-quantity-${matchingProduct.id}">
              <span> Quantity: <span class="quantity-label">${item.quantity}</span> </span>
              <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                Update
              </span>
              <span 
              class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id} " data-product-id="${matchingProduct.id}">
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
              ${deliveryOptionHTML(matchingProduct.id, item)}
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
      cart.deleteItemFromCart(productId);
      rednerOrderSummary();
    })
  })


  // open update item in the cart
  document.querySelectorAll('.js-update-link').forEach(updateLink => {
    updateLink.addEventListener('click', () => {
      const { productId } = updateLink.dataset;
      const cartItemContainer = document.querySelector(`.js-container-${productId}`);
      cartItemContainer.classList.add("is-updating");
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
      if((typeof quantityUpdateValue === "number") && quantityUpdateValue < 1000 && quantityUpdateValue){
        cart.updateCartQuantity(productId, quantityUpdateValue);
        cartItemContainer.classList.remove("is-updating");
        rednerOrderSummary();
      }
    });
  });

  // update delivery option
  document.querySelectorAll(".js-delivery-option").forEach(deliveryOption => {
    deliveryOption.addEventListener("click" , () => {
      const { productId } = deliveryOption.dataset;
      const { deliveryOptionId  } = deliveryOption.dataset;
      cart.updateDeliveryOption(productId, deliveryOptionId);
      rednerOrderSummary();
    });
  });

  renderPaymentSummary();
};

// render delivery options
function deliveryOptionHTML(productId, item){
  let deliveryHTML = '';
  deliveryOptions.forEach(deliveryOption => {
    const priceString = deliveryOption.priceCents ? `$${formatCurrency(deliveryOption.priceCents)}` : "Free Shipping";
    const isChecked = item.deliveryOptionId === deliveryOption.deliveryId ? "checked" : "";
    const deliveryDayString = deliveryDateStr(deliveryOption.deliveryDay);
    deliveryHTML += `
      <div class="delivery-option js-delivery-option" data-product-id="${productId}" data-delivery-option-id="${deliveryOption.deliveryId}">
      <input
        type="radio"
        ${isChecked}
        class="delivery-option-input"
        name="delivery-option-1-${productId}"
      />
      <div>
        <div class="delivery-option-date">${deliveryDayString}</div>
        <div class="delivery-option-price">${priceString}</div>
      </div>
    </div>`;
  })

  return deliveryHTML;
}