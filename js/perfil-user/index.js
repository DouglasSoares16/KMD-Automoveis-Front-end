

async function onLoad() {
  const token = window.localStorage.getItem("@kmd_auto:token");

  axios.defaults.headers.common.authorization = `Bearer ${token}`;

  try {
    const response = await axios.get("http://localhost:5500/user/profile");

    document.querySelector(".wrapper-image").innerHTML = `
			<img src="./assets/icons/perfil.svg" alt=${response.data.user.name}>
			<img src="./assets/icons/changed-photo.svg" alt="Alterar" class="change-img">
		`;

    document.getElementById("update-user").innerHTML = `
			<div class="input-block">
				<div class="icon-input">
					<img src="./assets/icons/perfil.svg" alt="Perfil">
				</div>

				<input name="name" id="name" type="text" value=${response.data.user.name}>
			</div>

			<div class="input-block">
				<div class="icon-input">
					<img src="./assets/icons/E-mail.svg" alt="Email">
				</div>

				<input name="email" id="email" type="email" value=${response.data.user.email}>
			</div>

			<div class="input-block">
				<div class="icon-input">
					<img src="./assets/icons/car.svg" alt="Car">
				</div>

				<input name="cnh" id="cnh" type="text" value=${response.data.user.cnh}>
			</div>
		`;

    if (response.data.cars === null) {
      document.querySelector(".wrapper-history").innerHTML = `
				<br>
				<p>Você não possui nenhuma compra, compre um carro na loja clicando <a href="./list-cars.html">Aqui</a></p>
			`;
    }
    else {
      response.data.cars.forEach((car) => {
        document.querySelector(".wrapper-history").innerHTML += `
          <div class="car">
            <div class="car-content">
              <a href="./show-car.html?carId=${car.id}">
                <div class="car-image">
                  <img src=${car.images === null ? "./assets/images/RS5Coupe.png" : car.images[0]} alt=${car.name}>
                </div>
                <div class="info">
                  <span>${car.category.name}</span>
                  <div class="info-content">
                    <div class="group-info">
                      <h3>${car.name}</h3>
                      <div class="group-price">
                        <span>R$ ${car.price}</span>
                        <img src="./assets/icons/energy.svg" alt="Elétrico">
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        `;
      });
    }

  } catch (error) {
    window.location.href = "login-user.html";
  }
}

const Form = {
  getValues() {
    return {
      name: document.querySelector("input#name").value,
      email: document.querySelector("input#email").value,
      cnh: document.querySelector("input#cnh").value,
    }
  },

  validateFields() {
    const { email, cnh, name } = Form.getValues();

    if (
      name.trim() === "" ||
      email.trim() === "" ||
      cnh.trim() === ""
    ) {
      swal({
        title: "Error",
        text: "Preencha todos os campos",
        icon: "error"
      });
    }
  },

  async updateUser(event) {
    event.preventDefault();

    Form.validateFields();

    try {
      const data = Form.getValues();

      await axios.put("http://localhost:5500/user", data);

      window.location.href = "perfil-user.html";
    } catch (error) {
      const { data } = error.response;

      swal({
        title: "Error",
        text: data.message,
        icon: "error"
      });
    }
  },
};

onLoad().then();