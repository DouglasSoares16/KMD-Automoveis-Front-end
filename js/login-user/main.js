const baseURL = "http://localhost:5500";

const Form = {
  email: document.querySelector("input#email"),
  password: document.querySelector("input#password"),

  getValues() {
    return {
      email: Form.email.value,
      password: Form.password.value,
    }
  },

  validateFields() {
    const { email, password } = Form.getValues();

    if (
      email.trim() === "" ||
      password.trim() === ""
    ) {
      throw new Error("Preencha todos os campos")
    }
  },

  clearFields() {
    Form.email.value = "";
    Form.password.value = "";
  },

  async loginUser(event) {
    event.preventDefault();

    try {
      Form.validateFields();

      const data = {
        email: Form.email.value,
        password: Form.password.value,
      };

      const response = await postRequest("user/session", data);

      Form.clearFields();

      window.localStorage.setItem("@kmd_auto:token", response.token);

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
