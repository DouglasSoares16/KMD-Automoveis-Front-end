
const token = window.localStorage.getItem("@kmd_auto:token");

if (!token) {
  window.location.href = "./list-cars.html";
}

try {
  axios.get(`http://localhost:5500/user/verify/authenticate/${token}`).then((response) => {
    if (!response.data.isAdmin) {
      window.location.href = "./list-cars.html";
    }
  });
} catch (error) {
  window.location.href = "./list-cars.html";
}