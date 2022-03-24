const baseURL = "http://localhost:5500";

const Form = {
  name: document.querySelector("input#name"),
  email: document.querySelector("input#email"),
  password: document.querySelector("input#password"),
  cnh: document.querySelector("input#cnh"),

  getValues() {
    return {
      name: Form.name.value,
      email: Form.email.value,
      password: Form.password.value,
      cnh: Form.cnh.value
    }
  },

  validateFields() {
    const { name, email, cnh, password } = Form.getValues();

    if (
      name.trim() === "" ||
      email.trim() === "" ||
      cnh.trim() === "" ||
      password.trim() === ""
    ) {
      throw new Error("Preencha todos os campos")
    }
  },

  clearFields() {
    Form.name.value = "";
    Form.email.value = "";
    Form.password.value = "";
    Form.cnh.value = "";
  },

  async createUser(event) {
    event.preventDefault();

    try {
      Form.validateFields();

      const data = {
        name: Form.name.value,
        email: Form.email.value,
        password: Form.password.value,
        cnh: Form.cnh.value,
      };

      await postRequest("user", data);

      Form.clearFields();

      window.location.href = "list-cars.html";

    } catch (error) {
      alert(error.message);
    }
  },
};

async function postRequest(url, data) {
  const response = await axios.post(`${baseURL}/${url}`, data);

  if (response.data) {
    return response.data;
  }
}
