

async function isLogged() {
  const token = window.localStorage.getItem("@kmd_auto:token");
  const boxLogin = document.querySelector(".box-login");

  if (!token) {
    boxLogin.innerHTML = `
      <p>
        <a href="./login-user.html">
          Faça Login
        </a>
      </p>

      <div class="user">
        <img src="./assets/icons/perfil.svg" alt="Photo">
      </div>
    `;
  }

  try {
    const { data: user } = await axios.get(`http://localhost:5500/user/verify/authenticate/${token}`);

    boxLogin.innerHTML = `
      <p>
        <a href="./perfil-user.html">
          ${user.name}
        </a>
      </p>

      <div class="user">
        <img src=${user.avatar === undefined ? "./assets/icons/perfil.svg" : user.avatar} alt=${user.name}>
      </div>
    `;

  } catch (error) {
    boxLogin.innerHTML = `
      <p>
        <a href="./login-user.html">
          Faça Login
        </a>
      </p>

      <div class="user">
        <img src="./assets/icons/perfil.svg" alt="Photo">
      </div>
    `;
  }
}

isLogged();