 class Cart{
  #localStoragekey;
  cartItem;

  constructor(localStorageKey){
    this.#localStoragekey = localStorageKey;
    this.loadFromStorage()
  }

  // load data from local storage
  loadFromStorage() { 
    this.cartItem = JSON.parse(localStorage.getItem(this.#localStoragekey)) || []
  }

  // save to local storage
  saveToStorage() {
    localStorage.setItem(this.#localStoragekey, JSON.stringify(this.cartItem));
  }

  // get matching product
  getMatchCartItem(id) {
    return this.cartItem.filter(item => item.id === id);
  }

  // add to cart
  addToCart(id, numberOfItem = 1) {
    const [matchingItem] = this.getMatchCartItem(id);
    if(!matchingItem){
      this.cartItem.push({id, quantity: numberOfItem, deliveryOptionId: "1"});
    }else{
      this.cartItem.forEach(item => {
        id === item.id && (item.quantity += numberOfItem);
      })
    }
    this.saveToStorage();
  };

  // remove item from cart
  deleteItemFromCart = (id) => {
    const newCart = this.cartItem.filter(item => id !== item.id);
    this.cartItem = newCart;
    this.saveToStorage();
    this.updateQuantityInThePage("js-quantity");
  };

  // update item quantity in the cart
  updateCartQuantity(id, quantity) {
    this.cartItem.forEach(item => {
      if(item.id === id){
        item.quantity = quantity;
      }
    });
    this.saveToStorage();
    this.updateQuantityInThePage("js-quantity");
  };

  // update delivery date of items in the cart
  updateDeliveryOption(productId, deliveryOptionId){
    this.cartItem.forEach(item => {
      if(productId === item.id){
        item.deliveryOptionId = deliveryOptionId;
      }
    })
    this.saveToStorage();
  };


  // get total products in the cart
  getTotalProductCart()  {
    let totalQuantity = 0;
    this.cartItem.forEach(item => {
      totalQuantity += item.quantity;
    });
    return totalQuantity;
  };

  // update cart quantity in the page
  updateQuantityInThePage (className) {
    const quantityEl = document.querySelectorAll('.' + className);
    const totalQuantity = this.getTotalProductCart();
    quantityEl.forEach(quantity => {
      quantity.textContent = totalQuantity;
    })
  };

};

export const cart = new Cart("cart");



