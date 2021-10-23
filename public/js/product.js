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
        <div class="btn add-cart" onClick="${product.id}">add to cart</div>
      </div>
    </div>
    `
  })
}

renderProducts();

const cartNumbers = (product) => {
  let productNumbers = parseInt(localStorage.getItem("cartNumber"));

  if (productNumbers) {
    localStorage.setItem("cartNumber", productNumbers + 1);
    document.querySelector(".cart-no").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumber", 1);
    document.querySelector(".cart-no").textContent = 1;
  }
  setItems(product);
};

const setItems = (product) => {
  let cartItems = localStorage.getItem("productInCart");
  cartItems = JSON.parse(cartItems);
  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product, //using rest operator
      };
    }
    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product,
    };
  }

  localStorage.setItem("productInCart", JSON.stringify(cartItems));
};

const totalCost = (product) => {
  let cartCost = localStorage.getItem("totalCost");
  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
};

// add to cart js
const displayCart = () => {
  let cartItems = localStorage.getItem("productInCart");
  cartItems = JSON.parse(cartItems);
  console.log(cartItems);
  let productsContainer = document.querySelector(".products");
  let cartCost = localStorage.getItem("totalCost");
  console.log(cartCost);
  if (cartItems && productsContainer) {
    productsContainer.innerHTML = " ";
    console.log(cartItems);
    Object.values(cartItems).map((item) => {
      productsContainer.innerHTML += `
          <div class="product">
            <i class="ion-icon fas fa-times-circle delete-item delete-product"></i>
            <img src="../images/${item.tag}.png" />
            <span>${item.name}</span>
          </div>
            <div class="price">$${item.price}</div>
            <div class="quantity">
                <i class="ion-icon fas fa-arrow-alt-circle-left decrease"></i>
                <span>${item.inCart}</span>
                <i class="ion-icon fas fa-arrow-alt-circle-right increase"></i>
            </div>
            <div class="total">
                $${item.inCart * item.price}
            </div>
        `;
    });

    productsContainer.innerHTML += `
            <div class="basketTotalContainer">
              <h4 class="basketTotalTitle">Total Price</h4>
              <h4 name="totalPay" class="basketTotal">$${Math.round(
                cartCost
              )},00</h4>
            </div>
        `;
  }
};

oncartLoad();
displayCart();

var deleteProducts = document.querySelectorAll(".delete-product");
console.log(deleteProducts);
for(var i = 0; i<deleteProducts.length; i++){
  deleteProducts[i].addEventListener("click", (event)=>{
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    let productNumbers = parseInt(localStorage.getItem("cartNumber"));
    localStorage.setItem("cartNumber", productNumbers - 1);
  })
}

