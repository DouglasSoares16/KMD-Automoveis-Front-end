const token = window.localStorage.getItem("@kmd_auto:token");

try {
  if (token) {
    axios.get(`http://localhost:5500/user/verify/authenticate/${token}`).then(() => {
      window.location.href = "list-cars.html";
    });
  }
} catch(error) {}