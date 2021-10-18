// add to cart features
let products = [
  {
    name: "Empire's Daughter",
    tag: "book-1",
    price: 10.99,
    inCart: 0,
  },
  {
    name: "sign of the Concave Staircase",
    tag: "book-2",
    price: 4.99,
    inCart: 0,
  },
  {
    name: "Built for vice",
    tag: "book-3",
    price: 6.99,
    inCart: 0,
  },
  {
    name: "The Serpent in the Air",
    tag: "book-4",
    price: 12.99,
    inCart: 0,
  },
  {
    name: "The Holiday Bride",
    tag: "book-5",
    price: 5.99,
    inCart: 0,
  },
  {
    name: "The Shadow in the Dark City",
    tag: "book-6",
    price: 5.99,
    inCart: 0,
  },
  {
    name: "Mercury's Gold",
    tag: "book-7",
    price: 1.99,
    inCart: 0,
  },
  {
    name: "Case of the Invisible Corgi",
    tag: "book-8",
    price: 3.99,
    inCart: 0,
  },
  {
    name: "The Crimson Rose",
    tag: "book-9",
    price: 3.99,
    inCart: 0,
  },
  {
    name: "Inferno Hearts",
    tag: "book-10",
    price: 3.99,
    inCart: 0,
  },
];

const oncartLoad = () => {
  let productNumbers = parseInt(localStorage.getItem("cartNumber"));
  if (productNumbers) {
    document.querySelector(".cart-no").textContent = productNumbers;
  }
};

let carts = document.querySelectorAll(".add-cart");
for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  });
}

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
            <i class="ion-icon fas fa-times-circle"></i>
            <img src="../images/${item.tag}.png" />
            <span>${item.name}</span>
          </div>
            <div class="price">$${item.price}</div>
            <div class="quantity">
                <i class="ion-icon fas fa-arrow-alt-circle-left"></i>
                <span>${item.inCart}</span>
                <i class="ion-icon fas fa-arrow-alt-circle-right"></i>
            </div>
            <div class="total">
                $${item.inCart * item.price}
            </div>
        `;
    });

    productsContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">Total Price</h4>
                <h4 class="basketTotal">$${Math.round(cartCost)},00</h4>
            </div>
        `;
  }
};

oncartLoad();
displayCart();
