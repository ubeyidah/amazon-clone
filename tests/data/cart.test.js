import {cart} from "../../data/cart.js";

describe("test suite: addToCart" , ( ) => {
  beforeEach(() => {
    spyOn(localStorage, "setItem");
  })
  it("adds an existing product to the cart" , ( ) => {
    spyOn(localStorage, "getItem").and.callFake(() => JSON.stringify([
      {
        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        deliveryOptionId: "1"
      }
    ]));

    cart;

    cart.addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");

    expect(cart.cartItem.length).toEqual(1);
    expect(cart[0].cartItem.quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].cartItem.id).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6")

  });

  it("adds a new product to the cart" , () => {
    spyOn(localStorage, "getItem").and.callFake(() => JSON.stringify([]));

    cart;
    cart.addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    
    expect(cart.cartItem.length).toEqual(1)
    expect(cart[0].cartItem.id).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6")
    expect(cart[0].cartItem.quantity).toEqual(1)
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  })
});

describe("test suite: cart functionality", () => {
  it("remove product from cart", () => {
     
    spyOn(localStorage, "getItem").and.callFake(() => JSON.stringify([{
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 1,
      deliveryOptionId: "1"
    }]));
    cart;
    cart.deleteItemFromCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.cartItem.length).toEqual(0);
  });
});