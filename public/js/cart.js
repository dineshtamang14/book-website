const cartItems = document.querySelector(".products");

function renderCartItems(){
    cartItems.innerHTML = " ";
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

  renderCartItems();