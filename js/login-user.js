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
      swal({
        title: "Error",
        text: "Preencha todos os campos",
        icon: "error"
      });
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

      const tokenExists = window.localStorage.getItem("@kmd_auto:token");

      if (tokenExists) {
        window.localStorage.removeItem("@kmd_auto:token");
      }

      window.localStorage.setItem("@kmd_auto:token", response.token);

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

async function postRequest(url, data) {
  const response = await axios.post(`${baseURL}/${url}`, data);

  if (response.data) {
    return response.data;
  }
}
