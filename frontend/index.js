var cards = document.getElementById("cards");
var input = document.getElementById("inputValue");

const getValue = async () => {
  const url = `http://localhost:8000/api/price_comparison/model=${input.value}`;

  const data = await fetch(url)
    .then((res) => res.json())
    .then((payload) => {
      return payload;
    })
    .catch((err) => console.log(err));

  const { payload } = data;

  cards.innerHTML = payload.map((pay, index) => {
    return `<div class="col">
          <div class="card h-100">
            <img
              src=${pay.mobile_image}
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title">${pay.mobile_model}</h5>
              <p class="card-text">
                ${pay.mobile_price}
              </p>
              <a href=${pay.site_url}>For further click here</a>
            </div>
          </div>
        </div>`;
  });
};

const getData = async () => {
  const url = "http://localhost:8000/api/price_comparison";

  const data = await fetch(url)
    .then((res) => res.json())
    .then((payload) => {
      return payload;
    })
    .catch((err) => console.error(err));

  const { payload } = data;

  cards.innerHTML = payload.map((pay, index) => {
    return `<div class="col">
          <div class="card h-100">
            <img
              src=${pay.mobile_image}
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title">${pay.mobile_model}</h5>
              <p class="card-text">
                ${pay.mobile_price}
              </p>
              <a href=${pay.site_url}>For further click here</a>
            </div>
          </div>
        </div>`;
  });
};

getData();

const galleryItems = document.querySelector("#cards").children;
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const page = document.querySelector(".page-num");
const maxItem = 5;
let index = 1;

const pagination = Math.ceil(25 / maxItem);

prev.addEventListener("click", function () {
  index--;
  check();
  showItems();
});
next.addEventListener("click", function () {
  index++;
  check();
  showItems();
});

function check() {
  if (index == pagination) {
    next.classList.add("disabled");
  } else {
    next.classList.remove("disabled");
  }

  if (index == 1) {
    prev.classList.add("disabled");
  } else {
    prev.classList.remove("disabled");
  }
}

function showItems() {
  for (let i = 0; i < 25; i++) {
    galleryItems[i].classList.remove("show");
    galleryItems[i].classList.add("hide");

    if (i >= index * maxItem - maxItem && i < index * maxItem) {
      galleryItems[i].classList.remove("hide");
      galleryItems[i].classList.add("show");
    }
    page.innerHTML = index;
  }
}

window.onload = function () {
  showItems();
  check();
};
