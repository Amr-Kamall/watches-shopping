let close = document.querySelector(".close-icon");
let bar = document.querySelector(".bar-icon");
let navbar = document.querySelector(".navbar-list");
let links = document.querySelectorAll(".navbar-list .nav-link");
let shoppingContainer = document.querySelector(".shopping-container");
let shoppingCartIcon = document.querySelector(".shopping-cart-icon");
let shoppingCart = document.querySelector(".shopping-cart");
let closeShoppingCart = document.querySelector(".close-icon-cart");
let label = document.querySelector(".label");
let shoppingTitle = document.querySelector(".shopping-title");
let moreDetails = document.querySelector(".more-details");
let header = document.querySelector("header");
let basket = JSON.parse(localStorage.getItem("basket")) || [];
let icons = document.querySelectorAll(".shopping-icons span i");

document.addEventListener("scroll", function () {
  if (window.scrollY >= 48) {
    header.style.background = "#1f1f1f";
    icons.forEach((icon) => (icon.style.color = "#f2f2f2"));
  } else {
    icons.forEach((icon) => (icon.style.color = "#1f1f1f"));
    header.style.background = "none";
  }
});

shoppingCartIcon.addEventListener("click", function () {
  shoppingCart.style.left = "0%";
  document.body.style.overflow = "hidden";
});
closeShoppingCart.addEventListener("click", function () {
  shoppingCart.style.left = "100%";
  document.body.style.overflow = "auto"; //here
});

bar.addEventListener("click", function () {
  navbar.style.top = "0%";
});

close.addEventListener("click", function () {
  navbar.style.top = "-110%";
});

links.forEach((link) =>
  link.addEventListener("click", function () {
    links.forEach((link) => link.classList.remove("active"));
    link.classList.add("active");
  })
);

function handleClicked(e) {
  if (navbar && navbar.contains(e.target)) {
    navbar.style.top = "-110%";
  } else {
    return;
  }
}
window.addEventListener("click", handleClicked, true);

// featured data
let featuredContainer = document.querySelector(".featured-container");
featuredContainer.innerHTML = featuredData
  .map((ele) => {
    let { img, name, price, id } = ele;
    return `
    <div class="watching-box" id=${id}>
        <span class="sale">sale</span>
        <img src=${img} />
        <h3 class="watching-name">${name}</h3>
        <p class="watching-price">${price}</p>
        <button class="btn-add" onclick="addToCart(${id})" >add to cart</button>
    </div>
  `;
  })
  .join("");

// end featured data

//product-data
let productedContainer = document.querySelector(".product-container");

productedContainer.innerHTML = productsData
  .map((ele) => {
    const { img, name, price, id } = ele;
    return `
    <div class="watching-box" id=${id}>
        <span class="bag"><i class="bi bi-bag" onclick="addToCart(${id})"></i></span>
        <img src=${img} />
        <h3 class="watching-name">${name}</h3>
        <p class="watching-price">${price}</p>
    </div>
  `;
  })
  .join("");
//end product data

//new data

let newContainer = document.querySelector(".new-container");
newContainer.innerHTML = newsData
  .map((ele) => {
    const { img, name, price, id } = ele;
    return `
    <div class="watching-box" id=${id} >
        <span class="new-icon">New</span>
        <img src=${img} />
        <h3 class="watching-name">${name}</h3>
        <p class="watching-price">${price}</p>
        <button class="btn-add" onclick="addToCart(${id})" >add to cart</button>
    </div>
  `;
  })
  .join("");

//end new data

// slider
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  navigation: {
    nextEl: ".right-arrow",
    prevEl: ".left-arrow",
  },
});
// Custom button click handlers
document.querySelector(".left-arrow").addEventListener("click", function () {
  swiper.slidePrev();
});

document.querySelector(".right-arrow").addEventListener("click", function () {
  swiper.slideNext();
});
// end slider

function addToCart(id) {
  const selectedItem = id;
  const search = basket.find((x) => x.id === selectedItem.id);
  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    return;
  }
  localStorage.setItem("basket", JSON.stringify(basket));
  // console.log(basket);
  generateWatchingCarts();
  calcItems();
}

//content of my cart 😍⚡

function generateWatchingCarts() {
  if (basket.length !== 0) {
    label.innerHTML = "";
    moreDetails.innerHTML = `
        <p class="num-items">${calcItems()} <span>items</span></p>
        <p class="total-price">$${totalPrice()}</p>
        `;
    shoppingTitle.innerHTML = `<h1 class="shopping-title">My Cart</h1>`;
    shoppingContainer.innerHTML = basket
      .map((ele) => {
        let { id, item } = ele;
        const search = allData.find((x) => x.id === id) || [];
        // console.log(search);
        let { img, name, price } = search;
        return `
            <div class="cart-box" class=${id} >
              <div class="cart-img-content">
                <img src=${img} alt=${name} />
              </div>
              <div class="cart-data">
                <p class="cart-name">${name}</p>
                <p class="cart-price">$${price * item}</p> 
                <div class="cart-buttons">
                  <div class="plus-minus-btns"> 
                  <i class="bi bi-dash-lg" onclick="decreaseItem(${id})" ></i>
                  <span class=${id}>${item ? item : 0}</span>
                  <i class="bi bi-plus-lg" onclick="increaseItem(${id})" ></i>
                  </div>              
                    <i class="fa-regular fa-trash-can" onclick="removeItem(${id})" ></i>
                </div>
              </div>
            </div>
        `;
      })
      .join("");
  } else {
    label.innerHTML = `<h1>cart is empty</h1>`;
    shoppingTitle.innerHTML = "";
    moreDetails.innerHTML = "";
    shoppingContainer.innerHTML = "";
  }
  // localStorage.setItem("basket", JSON.stringify(basket));
  updateCartNumber();
}

generateWatchingCarts();

function increaseItem(id) {
  const selectedItem = id;
  const search = basket.find((x) => x.id === selectedItem.id);
  if (search) {
    search.item += 1; //update item of the basket
  } else {
    return;
  }
  localStorage.setItem("basket", JSON.stringify(basket));
  updateItem(id);
  generateWatchingCarts();
}

function decreaseItem(id) {
  const selectedItem = id;
  const search = basket.find((x) => x.id === selectedItem.id);
  const filteredIndex = basket.findIndex((x) => x.id === selectedItem.id);

  if (search.item > 1) {
    search.item -= 1;
  } else {
    basket.splice(filteredIndex, 1);
  }

  localStorage.setItem("basket", JSON.stringify(basket));
  updateItem(selectedItem);
  generateWatchingCarts();
}

function updateItem(selectedItem) {
  const search = basket.find((x) => x.id === selectedItem.id);
  if (search) {
    document.querySelector(`.${search.id}`).innerHTML = search.item;
  } else {
    return;
  }
  // calcItems();
  // updateCartNumber();
}

function removeItem(id) {
  const selectedItem = id;
  const searchIndex = basket.findIndex((x) => x.id === selectedItem.id);
  // console.log(searchIndex);
  // basket = basket.filter((ele) => ele.id !== selectedItem.id);
  basket.splice(searchIndex, 1);
  localStorage.setItem("basket", JSON.stringify(basket));
  generateWatchingCarts();
}

function calcItems() {
  let calcItems = basket
    .map((ele) => ele.item)
    .reduce((acc, cur) => acc + cur, 0);
  return calcItems;
}

function totalPrice() {
  const total = basket
    .map((ele) => {
      let { item, id } = ele;
      const search = allData.find((x) => x.id === id);
      return search.price * item;
    })
    .reduce((x, y) => x + y);
  return total;
}

function updateCartNumber() {
  const cartNums = document.querySelector(".cart-nums");
  cartNums.innerHTML = calcItems() || "";
}
