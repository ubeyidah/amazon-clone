const orders = JSON.parse(localStorage.getItem("orders")) || [];

export const createOrder = (order) => {
  orders.unshift(order);
  saveToStorage();
}

const saveToStorage = ( ) => {
  localStorage.setItem("orders", JSON.stringify(orders))
}