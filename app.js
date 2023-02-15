const cardList = document.querySelector(".card-list");
const creatForm = document.querySelector("#create-form");
const filterRange = document.querySelector("#filter-range");
const filterRangeLabel = document.querySelector("#filter-range-label");
const selectBrand = document.querySelector("#select-brand");
const carLists = localStorage.getItem("cars")
  ? JSON.parse(localStorage.getItem("cars"))
  : [];
console.log(carLists);
showCard(carLists);
let id = 1;

creatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const card = {
    id: id,
    brand: creatForm.brand.value,
    name: creatForm.name.value,
    speed: creatForm.speed.value,
    price: creatForm.price.value,
    image: creatForm.url.value,
    color: creatForm.color.value,
  };
  if (card) {
    creatCars(card);
    carLists.push(card);
    id++;
  }
  localStorage.setItem("cars", JSON.stringify(carLists));
});
function creatCars(car) {
  const { brand, name, speed, price, image, color, id } = car;
  const div = document.createElement("div");
  div.style.width = "18rem";
  div.classList.add("card");
  div.innerHTML = `
  <img
      src=${image}
      class="card-img-top object-fit-cover"
      style="width: 100%; height: 200px"
      alt="..."
  />
  <div class="card-body">
      <h5 class="card-title">${name}</h5>
  </div>
  <ul class="list-group list-group-flush">
      <li class="list-group-item">Brand: ${brand}/s</li>
      <li class="list-group-item">Speed: ${speed}/s</li>
      <li class="list-group-item">Price: ${price}$</li>
      <li class="list-group-item">
          Color: ${color}
          <span
              style="
                  height: 20px;
                  width: 20px;
                  background-color: ${color};
                  display: inline-block;
              "
          ></span>
      </li>
  </ul>
  <div class="card-body">
  <button onClick = getId(${id}) type="button" class="btn btn-danger">Delete</button>
  </div>
  `;
  cardList.appendChild(div);
}
function showCard(cards) {
  const carsArray = cards;
  carsArray.forEach((item) => {
    creatCars(item);
  });
}

filterRange.addEventListener("change", () => {
  const userCost = Number(filterRange.value);
  filterRangeLabel.textContent = `${userCost} $`;
  const newArray = carLists.filter((car) => {
    return car.price <= userCost;
  });
  cardList.innerHTML = "";
  showCard(newArray);
});
function getId(key) {
  //   console.log(key);
  //   const newArr = [];
  //   carLists.forEach((item) => {
  //     if (item.id != key) {
  //       newArr.push(item);
  //     }
  //   });
  const newArray = carLists.filter((item) => {
    return item.id != Number(key);
  });
  cardList.innerHTML = "";
  showCard(newArray);
  localStorage.setItem("cars", JSON.stringify(newArray));
}
selectBrand.addEventListener("change", () => {
  const newArray = carLists.filter((item) => {
    return item.brand === selectBrand.value;
  });
  cardList.innerHTML = "";
  showCard(newArray);
});
