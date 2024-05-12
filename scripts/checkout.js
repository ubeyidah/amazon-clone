import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { rednerOrderSummary } from "./checkout/orderSummary.js";
import { loadProducts } from "../data/products.js";
// import "../data/backend-practice.js";
// init



new Promise((resolve) => {
  loadProducts(() => {
    resolve();
  });
}).then(() => {
  renderPaymentSummary();
  rednerOrderSummary();
})