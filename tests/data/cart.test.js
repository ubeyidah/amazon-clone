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

    cart.loadFromStorage();

    cart.addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");

    expect(cart.cartItem.length).toEqual(1);
    expect(cart.cartItem[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItem[0].id).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6")

  });

  it("adds a new product to the cart" , () => {
    spyOn(localStorage, "getItem").and.callFake(() => JSON.stringify([]));

    cart.loadFromStorage();
    cart.addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    
    expect(cart.cartItem.length).toEqual(1)
    expect(cart.cartItem[0].id).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6")
    expect(cart.cartItem[0].quantity).toEqual(1)
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
    cart.loadFromStorage()
    cart.deleteItemFromCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.cartItem.length).toEqual(0);
  });
  it("update items quantity from cart", () => {
     
    spyOn(localStorage, "getItem").and.callFake(() => JSON.stringify([{
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 1,
      deliveryOptionId: "1"
    }]));
    cart.loadFromStorage()
    cart.updateCartQuantity("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 7);
    expect(cart.cartItem[0].quantity).toEqual(7);
  });
  it("update delivery optioin of cart items", () => {
     
    spyOn(localStorage, "getItem").and.callFake(() => JSON.stringify([{
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 1,
      deliveryOptionId: "1"
    }]));
    cart.loadFromStorage()
    cart.updateDeliveryOption("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", "3");
    expect(cart.cartItem[0].deliveryOptionId).toEqual("3");
  });
  it("get total items in the cart", () => {
     
    spyOn(localStorage, "getItem").and.callFake(() => JSON.stringify([{
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 1,
      deliveryOptionId: "1"
    },
    {
      id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
      quantity: 4,
      deliveryOptionId: "2"
    }]));
    cart.loadFromStorage()
    expect(cart.getTotalProductCart()).toEqual(5);
  });
});