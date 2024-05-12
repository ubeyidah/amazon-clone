import { cart } from "../data/cart.js";
import { orders } from "../data/orders.js";
import {  getMatchProduct, loadProductsFetch } from "../data/products.js";
import formatCurrency from "./utils/formatCurrency.js";


async function renderOrders() {
  await loadProductsFetch();
  let orderHTML = '';
  orders.forEach((order) => {
    const orderPlaced = (order.orderTime).slice(0,10);
    orderHTML += `
      <div class="order-container">
      <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${orderPlaced}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>$${formatCurrency(order.totalConstCents)}</div>
          </div>
        </div>

        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${order.id}</div>
        </div>
      </div>

      <div class="order-details-grid">
        ${ordersHTML(order.products, orderPlaced, order.id)}
      </div>
      </div>
    `;
  })


  document.querySelector(".js-orders-grid").innerHTML = orderHTML;
}

function ordersHTML(orderProducts, orderPlaced, orderId){
  let orderProductsHTML = "";
  orderProducts.forEach(orderProduct => {
    const productId = orderProduct.productId;
    const [matchingProduct] = getMatchProduct(productId);
    orderProductsHTML += `
    <div class="product-image-container">
      <img src=${matchingProduct.image} />
    </div>

    <div class="product-details">
      <div class="product-name">
        ${matchingProduct.name}
      </div>
      <div class="product-delivery-date">Arriving on:${orderPlaced} </div>
      <div class="product-quantity">Quantity: ${orderProduct.quantity}</div>
      <button class="buy-again-button button-primary">
        <img class="buy-again-icon" src="images/icons/buy-again.png" />
        <span class="buy-again-message">Buy it again</span>
      </button>
    </div>

    <div class="product-actions">
      <a href="tracking.html?orderId=${orderId}&productId=${orderProduct.productId}">
        <button class="track-package-button button-secondary">
          Track package
        </button>
      </a>
    </div>`;
  });

  return orderProductsHTML;
}


renderOrders();
cart.updateQuantityInThePage("js-cart-quantity")

