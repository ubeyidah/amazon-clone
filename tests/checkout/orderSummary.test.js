import { rednerOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { cart } from "../../data/cart.js"
import { loadProducts } from "../../data/products.js";

describe("test suite: renderOrderSummary", () => {
  beforeAll((done) => {
    loadProducts(() => {
      done();
    });  
  });

  beforeEach(() => {
    spyOn(localStorage, "setItem");
    spyOn(localStorage, 'getItem').and.callFake(() => JSON.stringify([{
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 1,
      deliveryOptionId: "1"
    },{
      id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 3,
      deliveryOptionId: "2"
    }]));
    cart.loadFromStorage();
    
    rednerOrderSummary();
  });

  afterEach(() => {
    document.querySelector(".js-order-summary").innerHTML = "";
  });


  it('display the cart', () => {
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(2);
    expect(document.querySelector(".js-product-quantity-e43638ce-6aa0-4b85-b27f-e1d07eb678c6").innerText).toContain("Quantity: 1");
    expect(document.querySelector(".js-product-quantity-15b6fc6f-327a-4ec4-896f-486349e85a3d").innerText).toContain("Quantity: 3");

  });
  
  
  it("remove product from the cart", () => {
    document.querySelector(".js-delete-link-15b6fc6f-327a-4ec4-896f-486349e85a3d").click();

    expect(cart.cartItem.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });
});