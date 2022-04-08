const baseURL = "http://localhost:5500";

async function onLoad() {
  const cars = await getRequest("car");

  const amountCars = cars.length;

  document.querySelector(".cars .header-content p").innerHTML = `Total ${amountCars} carros`;

  cars.forEach((car) => {
    document.getElementById("list").innerHTML += `
      <div class="car">
        <div class="car-content">
          <a href="./show-car.html?carId=${car.id}">
            <div class="car-image">
              <img src=${car.images === null ? "./assets/images/RS5Coupe.png" : car.images[0]} alt=${car.name}>
            </div>

            <hr>

            <div class="info">
              <span>${car.brand.name}</span>

              <div class="info-content">
                <div class="group-info">
                  <h3>${car.name}</h3>
                  <span>R$ ${car.price}</span>
                  <img src="./assets/icons/energy.svg" alt="Elétrico">
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    `;
  });
}

async function getRequest(url) {
  const response = await axios.get(`${baseURL}/${url}`);

  return response.data;
}

onLoad();