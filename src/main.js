let close = document.querySelector(".close-icon");
let bar = document.querySelector(".bar-icon");
let navbar = document.querySelector(".navbar-list");
let links = document.querySelectorAll(".navbar-list .nav-link");

bar.addEventListener("click", function () {
  navbar.style.top = "0%";
});

close.addEventListener("click", function () {
  navbar.style.top = "-100%";
});

links.forEach((link) =>
  link.addEventListener("click", function () {
    links.forEach((link) => link.classList.remove("active"));
    link.classList.add("active");
  })
);

function handleClicked(e) {
  if (navbar && navbar.contains(e.target)) {
    navbar.style.top = "-100%";
  } else {
    return;
  }
}
window.addEventListener("click", handleClicked, true);

// featured data
let featuredContainer = document.querySelector(".featured-container");
featuredContainer.innerHTML = featuredData
  .map((ele) => {
    const { img, name, price } = ele;
    return `
    <div class="watching-box">
        <span class="sale">sale</span>
        <img src=${img} />
        <h3 class="watching-name">${name}</h3>
        <p class="watching-price">${price}</p>
        <button class="btn-add">add to cart</button>
    </div>
  `;
  })
  .join("");
// end featured data

//product-data
let productedContainer = document.querySelector(".product-container");

productedContainer.innerHTML = productsData
  .map((ele) => {
    const { img, name, price } = ele;
    return `
    <div class="watching-box">
        <span class="bag"><i class="bi bi-bag"></i></span>
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
    const { img, name, price } = ele;
    return `
    <div class="watching-box">
        <span class="new-icon">New</span>
        <img src=${img} />
        <h3 class="watching-name">${name}</h3>
        <p class="watching-price">${price}</p>
        <button class="btn-add">add to cart</button>
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
