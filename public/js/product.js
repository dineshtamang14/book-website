// add to cart features
let products = [
  {
    "id": 1,
    "name": "Empire's Daughter",
   "price": 1099,
    "imgName": "../images/book-1.png"
  },
  {
    "id": 2,
    "name": "sign of the Concave",
    "price": 499,
    "imgName": "../images/book-2.png"
  },
  {
    "id": 3,
    "name": "Built for vice",
    "price": 699,
    "imgName": "../images/book-3.png"
  },
    {
    "id": 4,
    "name": "The Serpent in the Air",
    "price": 1299,
    "imgName": "../images/book-4.png"
  },
    {
    "id": 5,
    "name": "The Holiday Bride",
    "price": 699,
    "imgName": "../images/book-5.png"
  },
      {
    "id": 6,
    "name": "The Shadow in the Dark City",
    "price": 599,
    "imgName": "../images/book-6.png"
  },
      {
    "id": 7,
    "name": "Mercury's Gold",
    "price": 699,
    "imgName": "../images/book-7.png"
  },
      {
    "id": 8,
    "name": "Case of the Invisible Corgi",
    "price": 399,
    "imgName": "../images/book-8.png"
  },
        {
    "id": 9,
    "name": "The Crimson Rose",
    "price": 399,
    "imgName": "../images/book-9.png"
  },
        {
    "id": 10,
    "name": "Inferno Hearts",
    "price": 499,
    "imgName": "../images/book-10.png"
  }
];

const productshere = document.querySelector(".products-here");
const cartItems = document.querySelector(".products");

function renderProducts(){
  products.forEach((product)=>{
    productshere.innerHTML += `
    <div class="swiper-slide box" data-item-id="${product.id}">
      <div class="icons">
        <a href="#" class="fas fa-search"></a>
        <a href="#" class="fas fa-heart"></a>
        <a href="#" class="fas fa-eye"></a>
      </div>
      <div class="image">
        <img src="${product.imgName}" alt="">
      </div>
      <div class="content">
        <h3>${product.name}</h3>
        <div class="price">${product.price} <span>$10.99</span></div>
        <div class="btn add-cart" onclick="addToCart(${product.id})">add to cart</div>
      </div>
    </div>
    `
  })
}

renderProducts();

let cart = [];

function addToCart(id){
  if (cart.some((item) => item.id === id)){
    alert("product already in cart!");
  } else {
    const item = products.find((product)=> product.id === id);
    cart.push({
      ...item,
      numberOfUnits: 1,
    });
  }
  updateCart();
}


function updateCart(){
  // renderCartItems();
  // renderSubtotal();
}

function renderCartItems(){
  cart.forEach((item)=>{
    cartItems.innerHTML += `
    <div class="cart-item">
    <div class="item-info" onclick="removeItemFromCart(${item.id})">
        <img src="${item.imgName}" alt="${item.name}">
        <h4>${item.name}</h4>
    </div>
    <div class="unit-price">
        <small>$</small>${item.price}
    </div>
    <div class="units">
        <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
        <div class="number">${item.numberOfUnits}</div>
        <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>           
    </div>
  </div>
     `
  })
}
