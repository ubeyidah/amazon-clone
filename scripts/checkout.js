import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { rednerOrderSummary } from "./checkout/orderSummary.js";
import { loadProducts } from "../data/products.js";
// import "../data/backend-practice.js";
// init

loadProducts(() => {
  renderPaymentSummary();
  rednerOrderSummary();
})