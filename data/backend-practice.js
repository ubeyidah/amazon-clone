let products = [];
let cart = [];


function logProduct(){
  console.log(products);
}
function logCart() {
  console.log(cart);
}


function getProduct(fun){
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("load", () => {
    products = JSON.parse(xhr.response);
    fun();
  });
  xhr.open("GET", "https://supersimplebackend.dev/products");
  xhr.send();
}

function getCart(fun) {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("load", () => {
    cart = xhr.response;
    fun();
  });
  xhr.open("GET", "https://supersimplebackend.dev/cart");
  xhr.send();
}

console.log('loding....');
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

Promise.all([
  new Promise(res => {
    getProduct(() => {
      res("product");
    })
  }),
  new Promise(res => {
    getCart(() => {
      res("cart");
    })
  })
]).then((value) => {
  logProduct();
  logCart()
  console.log(value);
})