import { cart } from "../data/cart.js";
import { getMatchOrder, orders } from "../data/orders.js";
import { loadProductsFetch, getMatchProduct } from "../data/products.js";

function getParams(){
  const url = new URL(window.location.href);
  const orderId = url.searchParams.get("orderId");
  const productId = url.searchParams.get("productId");
  return {orderId, productId}
}

async function renderTracking(){
  await loadProductsFetch();
  const {productId, orderId} = getParams();
  const [matchingProduct] = getMatchProduct(productId);
  const [matchingOrder] = getMatchOrder(orderId);
  let matchingCartItem;
  orders.forEach(order => {
    order.products.forEach(product => {
      if(product.productId === productId){
        matchingCartItem = product;
      }
    })
  });
  const orderPlaced = (matchingCartItem.estimatedDeliveryTime).slice(0,10);



  let trackingHTML = '';
  trackingHTML += `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">Arriving on ${orderPlaced}</div>

    <div class="product-info">
     ${matchingProduct.name}
    </div>

    <div class="product-info">Quantity: ${matchingCartItem.quantity}</div>

    <img
      class="product-image"
      src=${matchingProduct.image}
    />

    <div class="progress-labels-container">
      <div class="progress-label">Preparing</div>
      <div class="progress-label current-status">Shipped</div>
      <div class="progress-label">Delivered</div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar"></div>
    </div>
  `; 

  document.querySelector(".js-order-tracking").innerHTML = trackingHTML;
}


renderTracking();


cart.updateQuantityInThePage("js-cart-quantity");