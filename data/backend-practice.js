let products ;
let cart;


function logProduct(){
  console.log(products, 'pr');
}
function logCart() {
  console.log(cart, "pr");
}


// function getProduct(fun){
//   const xhr = new XMLHttpRequest();
//   xhr.addEventListener("load", () => {
//     products = JSON.parse(xhr.response);
//     fun();
//   });
//   xhr.open("GET", "https://supersimplebackend.dev/products");
//   xhr.send();
// }

// function getCart(fun) {
//   const xhr = new XMLHttpRequest();
//   xhr.addEventListener("load", () => {
//     cart = xhr.response;
//     fun();
//   });
//   xhr.open("GET", "https://supersimplebackend.dev/cart");
//   xhr.send();
// }

// console.log('loding....');
// new Promise((resolve) => {
//   getProduct(() => {
//     resolve();
//   })
// }).then(() => {
//   return new Promise((resolve)=> {
//     getCart(()=>{
//       resolve();
//     })
//   })
// }).then(() => {
//   logProduct();
//   logCart();
// })

// Promise.all([
//   new Promise(res => {
//     getProduct(() => {
//       res("product");
//     })
//   }),
//   new Promise(res => {
//     getCart(() => {
//       res("cart");
//     })
//   })
// ]).then((value) => {
//   logProduct();
//   logCart()
//   console.log(value);
// })


function getProduct(){
  const url = "https://supersimplebackend.dev/products";
  const promise = fetch(url)
  .then((res) => res.json())
  .then((data) => {
    products = data
  });
  return promise;
}

function getCart() {
  const url = "https://supersimplebackend.dev/cart";
  const promise = fetch(url)
  .then((res) => res.json())
  .then((data) => {
    cart = data
  });
  return promise;
}


getProduct().then(()=> logProduct());
getCart().then(() => logCart())