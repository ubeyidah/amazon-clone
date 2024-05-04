export let cart = JSON.parse(localStorage.getItem('cart')) || [{
  id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity: 1,
},
{
  id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity: 3,
}];

export const saveToStorage = () => localStorage.setItem("cart", JSON.stringify(cart));
export const getMatchCartItem = (id) => cart.filter(item => item.id === id);


export const addToCart = (id, numberOfItem = 1) => {
  const [matchingItem] = getMatchCartItem(id);
  if(!matchingItem){
    cart.push({id, quantity: numberOfItem});
  }else{
    cart.forEach(item => {
      id === item.id && (item.quantity += numberOfItem);
    })
  }
  saveToStorage();
};

export const getTotalProductCart = () => {
  let totalQuantity = 0;
  cart.forEach(item => {
    totalQuantity += item.quantity
  });
  return totalQuantity;
}

export const updateQuantityInThePage = (className) => {
  const quantityEl = document.querySelectorAll('.' + className);
  const totalQuantity = getTotalProductCart();
  quantityEl.forEach(quantity => {
    quantity.textContent = totalQuantity;
  })
}
