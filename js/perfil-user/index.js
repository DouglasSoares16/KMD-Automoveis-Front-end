

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

				<input name="name" id="name" type="text" placeholder=${response.data.user.name}>
			</div>

			<div class="input-block">
				<div class="icon-input">
					<img src="./assets/icons/E-mail.svg" alt="Email">
				</div>

				<input name="email" id="email" type="email" placeholder=${response.data.user.email}>
			</div>

			<div class="input-block">
				<div class="icon-input">
					<img src="./assets/icons/car.svg" alt="Car">
				</div>

				<input name="cnh" id="cnh" type="text" placeholder=${response.data.user.cnh}>
			</div>
		`;

		if (response.data.cars === null) {
			document.querySelector(".wrapper-history").innerHTML = `
				<br>
				<p>Você não possui nenhuma compra, compre um carro na loja clicando <a href="./list-cars.html">Aqui</a></p>
			`;
		}

	} catch (error) {
		window.location.href = "login-user.html";
	}
}

const Form = {
	name: document.querySelector("input#name"),
	email: document.querySelector("input#email"),
	cnh: document.querySelector("input#cnh"),

	getValues() {
		return {
			name: Form.name.value,
			email: Form.email.value,
			cnh: Form.cnh.value,
		}
	},

	validateFields() {
		const { email, cnh, name} = Form.getValues();

		if (
			name.trim() === "" ||
			email.trim() === "" ||
			cnh.trim() === ""
		) {
			throw new Error("Preencha todos os campos")
		}
	},

	clearFields() {
		Form.name.value = "";
		Form.email.value = "";
		Form.cnh.value = "";
	},

	async updateUser(event) {
		event.preventDefault();

		try {
			Form.validateFields();

			const data = Form.getValues();

			// await postRequest("user/session", data);

			window.location.href = "perfil-user.html";
		} catch (error) {
			alert(error.message);
		}
	},
};

onLoad().then();