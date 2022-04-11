const baseURL = "http://localhost:5500";
let car_id;

async function onLoad() {
  const url = window.location.href;

  const [, carID] = url.split("?carId=");

  car_id = carID;

  const car = await getRequest(`car/${carID}`);

  document.querySelector(".wrapper-title").innerHTML = `
    <span>${car.brand.name}</span>
    <h3>${car.name}<span>R$ ${car.price}</span></h3>
  `;

  document.querySelector(".wrapper-car .image").innerHTML = `
    <img src=${car.images === null ? "./assets/images/RS5Coupe.png" : car.images[0]} alt="imagem de ${car.name}">
  `;

  document.querySelector(".wrapper-car main").innerHTML = `
    <div class="car-information">
      <div class="info-block">
        <div class="icon">
          <img src="./assets/icons/speed.svg" alt="Speed">
        </div>

        <p>${car.speed}</p>
      </div>

      <div class="info-block">
        <div class="icon">
          <img src="./assets/icons/up.svg" alt="Up">
        </div>

        <p>${car.acceleration}</p>
      </div>

      <div class="info-block">
        <div class="icon">
          <img class="opc" src="./assets/icons/gasoline.svg" alt="Fuel">
        </div>

        <p>${car.fuel.name}</p>
      </div>

      <div class="info-block">
        <div class="icon">
          <img src="./assets/icons/transmission.svg" alt="Transmission">
        </div>

        <p>${car.transmission.name}</p>
      </div>

      <div class="info-block">
        <div class="icon">
          <img src="./assets/icons/perfil.svg" alt="People">
        </div>

        <p>${car.amount_people} pessoas</p>
      </div>

      <div class="info-block">
        <div class="icon">
          <img src="./assets/icons/hp.svg" alt="HP">
        </div>

        <p>${car.horse_power} HP</p>
      </div>
    </div>

    <div class="text">
      <h4>SOBRE O CARRO</h4>

      <p>${car.description}</p>
    </div>

    <button type="button" onclick="buyCar()">Comprar carro</button>
  `;
}

async function buyCar() {
  const token = window.localStorage.getItem("@kmd_auto:token");

  try {
    axios.defaults.headers.common.authorization = `Bearer ${token}`;

    await axios.post(baseURL + "/user/buy", { car_id });

    window.location.href = "car-bought.html";
  } catch (error) {
    const { data } = error.response;

    alert(data.message);
  }
}

async function getRequest(url) {
  const response = await axios.get(`${baseURL}/${url}`);

  return response.data;
}

onLoad();