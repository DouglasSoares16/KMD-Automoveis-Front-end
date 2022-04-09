const baseURL = "http://localhost:5500";
let car = {};
let car_id;
let stageNumber = 1;

const formData = new FormData();

async function onLoad() {
  const token = window.localStorage.getItem("@kmd_auto:token");

  axios.defaults.headers.common.authorization = `Bearer ${token}`;

  const { data: brands } = await axios.get(`${baseURL}/brand`);

  brands.forEach((brand) => {
    document.querySelector("select#brand").innerHTML += `
      <option value=${brand.id}>${brand.name}</option>
    `;
  });

  const { data: fuels } = await axios.get(`${baseURL}/fuel`);

  fuels.forEach((fuel) => {
    document.querySelector("select#fuel").innerHTML += `
      <option value=${fuel.id}>${fuel.name}</option>
    `;
  });

  const { data: transmissions } = await axios.get(`${baseURL}/transmission`);

  transmissions.forEach((transmission) => {
    document.querySelector("select#transmission").innerHTML += `
      <option value=${transmission.id}>${transmission.name}</option>
    `;
  });

  const { data: categories } = await axios.get(`${baseURL}/category`);

  categories.forEach((category) => {
    document.querySelector("select#category").innerHTML += `
      <option value=${category.id}>${category.name}</option>
    `;
  });
}

const stageOne = {
  name: document.querySelector("input#name"),
  brand_id: document.querySelector("select#brand"),
  fuel_id: document.querySelector("select#fuel"),
  transmission_id: document.querySelector("select#transmission"),
  category_id: document.querySelector("select#category"),

  getValues() {
    return {
      name: stageOne.name.value,
      brand_id: stageOne.brand_id.value,
      fuel_id: stageOne.fuel_id.value,
      transmission_id: stageOne.transmission_id.value,
      category_id: stageOne.category_id.value,
    }
  },

  validateFields() {
    const { name, brand_id, fuel_id, transmission_id, category_id } = stageOne.getValues();

    if (
      name.trim() === "" ||
      brand_id.trim() === "" ||
      fuel_id.trim() === "" ||
      transmission_id.trim() === "" ||
      category_id.trim() === ""
    ) {
      throw new Error("Preencha todos os campos")
    }
  },

  clearFields() {
    stageOne.name.value = "",
    stageOne.brand_id.value = "",
    stageOne.fuel_id.value = "",
    stageOne.transmission_id.value = "",
    stageOne.category_id.value = ""
  },

  changedToStage2() {
    stageNumber++;

    document.querySelector("form#create-car").innerHTML = `
      <div class="input-block">
        <input name="speed" id="speed" type="text" placeholder="Velocidade Máxima (KM/H)">
      </div>

      <div class="input-block">
        <input name="amount_people" id="amount_people" type="number" placeholder="Quantidade de pessoas">
      </div>

      <div class="input-block">
        <input name="horse_power" id="horse_power" type="number" placeholder="Caválos de Força">
      </div>

      <div class="input-block">
        <input name="acceleration" id="acceleration" type="text" placeholder="Aceleração (Tempo de 0 a 100km/h)">
      </div>

      <div class="input-block">
        <input name="price" id="price" type="number" step="100" placeholder="Preço (R$)">
      </div>
    `;

    document.querySelector("div.button").innerHTML = `
      <button type="button" onclick="stageTwo.exec()">Próximo</button>
    `;

    document.querySelector("p.stage").innerHTML = `${stageNumber} de 4`;
  },

  exec() {
    try {
      stageOne.validateFields();

      const data = stageOne.getValues();

      car = { ...data };

      stageOne.clearFields();

      stageOne.changedToStage2();
    } catch (error) {
      alert(error.message);
    }
  },
};


const stageTwo = {
  getValues() {
    return {
      speed: document.querySelector("input#speed").value,
      amount_people: document.querySelector("input#amount_people").value,
      horse_power: document.querySelector("input#horse_power").value,
      acceleration: document.querySelector("input#acceleration").value,
      price: document.querySelector("input#price").value,
    }
  },

  validateFields() {
    const { speed, amount_people, horse_power, acceleration, price } = stageTwo.getValues();

    if (
      speed.trim() === "" ||
      amount_people.trim() === "" ||
      horse_power.trim() === "" ||
      acceleration.trim() === "" ||
      price.trim() === ""
    ) {
      throw new Error("Preencha todos os campos")
    }
  },

  changedToStage3() {
    stageNumber++;

    document.querySelector("form#create-car").innerHTML = `
      <div class="input-block">
        <input name="amount_in_storage" id="amount_in_storage" type="number"  step="10" placeholder="Quantidade em Estoque">
      </div>

      <div class="input-block">
        <textarea name="description" id="description" placeholder="Descrição do Carro"></textarea>
      </div>
    `;

    document.querySelector("div.button").innerHTML = `
      <button type="button" onclick="stageThree.exec()">Próximo</button>
    `;

    document.querySelector("p.stage").innerHTML = `${stageNumber} de 4`;
  },

  exec() {
    try {
      stageTwo.validateFields();

      const data = stageTwo.getValues();

      car = { ...data, ...car };

      stageTwo.changedToStage3();
    } catch (error) {
      alert(error.message);
    }
  }
};

const stageThree = {
  getValues() {
    return {
      amount_in_storage: document.querySelector("input#amount_in_storage").value,
      description: document.querySelector("textarea#description").value,
    }
  },

  validateFields() {
    const { amount_in_storage, description } = stageThree.getValues();

    if (
      amount_in_storage.trim() === "" ||
      description.trim() === ""
    ) {
      throw new Error("Preencha todos os campos")
    }
  },

  changedToStage4() {
    stageNumber++;

    document.querySelector(".wrapper-form main").innerHTML = `
      <div class="text">
        <h2 class="title">
          Cadastre um carro
        </h2>

        <p>
          Faça o cadastro de um carro de forma rápida e fácil.
        </p>
      </div>
    
      <form id="create-car">
        <button type="button" class="new-file">
          <img src="./assets/icons/plus.svg" alt="+">
        </button>

        <div class="input-block">
          <div class="icon-input">
            <img src="./assets/icons/up.svg" alt="UP">
          </div>

          <label for="image_main">Imagem principal do Carro</label>
          <input name="image_main" id="image_main" type="file">
        </div>

        <div class="input-block">
          <div class="icon-input">
            <img src="./assets/icons/up.svg" alt="UP">
          </div>

          <label for="image_two">Selecionar uma imagem</label>
          <input name="image_two" id="image_two" type="file">
        </div>
      </form>

      <div class="button space-up">
        <button type="button" onclick="stageFour.exec()">Cadastrar</button>
      </div>

      <p class="stage"></p>
    `;

    document.querySelector("p.stage").innerHTML = `${stageNumber} de 4`;
  },

  exec() {
    try {
      stageThree.validateFields();

      const data = stageThree.getValues();

      car = { ...data, ...car };

      axios.post(`${baseURL}/car`, car).then((response) => car_id = response.data.id);

      stageThree.changedToStage4();
    } catch (error) {
      alert(error.message);
    }
  }
};

const stageFour = {
  exec() {
    try {
      const fileOne = document.querySelector("input#image_main");
      const fileTwo = document.querySelector("input#image_two");

      formData.append("images", fileOne.files[0]);
      formData.append("images", fileTwo.files[0]);

      axios.post(`http://localhost:5500/car/${car_id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }).then(() => {
        window.location.href = "list-cars.html";
      });
    } catch (error) {
      alert(error.message);
    }
  }
};

onLoad().then()
