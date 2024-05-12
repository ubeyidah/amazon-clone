import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { rednerOrderSummary } from "./checkout/orderSummary.js";
import { loadProductsFetch } from "../data/products.js";
import "../data/backend-practice.js";
// init



loadProductsFetch().then(() => {
  renderPaymentSummary();
  rednerOrderSummary();
})