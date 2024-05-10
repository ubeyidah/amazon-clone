import { cart, getTotalProductCart } from "../../data/cart.js";
import { getMatchDeliveryOption } from "../../data/deliveryOptions.js";
import { getMatchProduct } from "../../data/products.js";
import formatCurrency from "../utils/formatCurrency.js";

export const renderPaymentSummary = () => {
  const { 
    totalItemPriceCents,
    totalShippingPriceCents,
    totalBeforeTaxCents,
    taxCents,
    totalCents
  } = paymentCalculation();

  let paymentSummaryHTML = `
  <div class="payment-summary-title">Order Summary</div>
  <div class="payment-summary-row">
    <div>Items (${getTotalProductCart()}):</div>
    <div class="payment-summary-money">$${formatCurrency(totalItemPriceCents)}</div>
  </div>

  <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money">$${formatCurrency(totalShippingPriceCents)}</div>
  </div>

  <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
  </div>

  <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
  </div>

  <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
  </div>

  <button class="place-order-button button-primary">
    Place your order
  </button>`;


  document.querySelector(".js-payment-summary") && (document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML);
  paymentCalculation()
}


// calculation
function paymentCalculation(){
  // calculate total price
  let totalItemPriceCents = 0;
  let totalShippingPriceCents = 0;
  
  cart.forEach(item => {
    const [matchingProduct] = getMatchProduct(item.id);
    const priceCents = item.quantity * matchingProduct.priceCents;
    totalItemPriceCents += priceCents;
    // calculate shipping & handling
    const [matchingDeliveryOption] = getMatchDeliveryOption(item.deliveryOptionId);
    totalShippingPriceCents += matchingDeliveryOption.priceCents;
  });

  // calculate total berfore tax
  const totalBeforeTaxCents = totalItemPriceCents + totalShippingPriceCents;

  // calculate tax 
  const taxCents = totalBeforeTaxCents * 0.10;

  // calculate total 
  const totalCents = totalBeforeTaxCents + taxCents;

  return {
    totalItemPriceCents,
    totalShippingPriceCents,
    totalBeforeTaxCents,
    taxCents,
    totalCents
  }
};