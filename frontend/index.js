var cards = document.getElementById("cards");
var input = document.getElementById("inputValue");

const getValue = async () => {
  console.log(input.value);
  const url = `http://localhost:8000/model=${input.value}`;

  const data = await fetch(url)
    .then((res) => res.json())
    .then((payload) => {
      console.log(payload);
      return payload;
    })
    .catch((err) => console.log(err));

  console.log("Data : ", data);
};

const getData = async () => {
  const url = "http://localhost:8000/";

  const data = await fetch(url)
    .then((res) => res.json())
    .then((payload) => {
      console.log(payload);
      return payload;
    })
    .catch((err) => console.log(err));

  console.log("Data : ", data);
  cards.innerHTML = `<div class="col">
          <div class="card h-100">
            <img
              src="https://consumer-img.huawei.com/content/dam/huawei-cbg-site/en/mkt/plp/new-phones/product-list/p40-pro-plus-black.png"
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <a href='https://www.google.com'>For further click here</a>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <img
              src="https://consumer-img.huawei.com/content/dam/huawei-cbg-site/en/mkt/plp/new-phones/product-list/p40-pro-plus-black.png"
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">This is a short card.</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <img
              src="https://consumer-img.huawei.com/content/dam/huawei-cbg-site/en/mkt/plp/new-phones/product-list/p40-pro-plus-black.png"
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content.
              </p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <img
              src="https://consumer-img.huawei.com/content/dam/huawei-cbg-site/en/mkt/plp/new-phones/product-list/p40-pro-plus-black.png"
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
          </div>
        </div>
              `;
};

getData();

const galleryItems = document.querySelector("#cards").children;
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const page = document.querySelector(".page-num");
const maxItem = 2;
let index = 1;

const pagination = Math.ceil(galleryItems.length / maxItem);
console.log("pagination : ", pagination);

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
  for (let i = 0; i < galleryItems.length; i++) {
    galleryItems[i].classList.remove("show");
    galleryItems[i].classList.add("hide");

    if (i >= index * maxItem - maxItem && i < index * maxItem) {
      // if i greater than and equal to (index*maxItem)-maxItem;
      // means  (1*8)-8=0 if index=2 then (2*8)-8=8
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
