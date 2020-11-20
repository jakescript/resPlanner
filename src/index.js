import axios from "axios";

const userList = document.querySelector("#users");
const restList = document.querySelector("#resturants");
const reservList = document.querySelector("#reservations");

const userView = (users) => `${users.map(u => `<li> <a href="#${u.id}">${u.name}</a></li>`).join("")}`;
const resturantView = (resturants) => `${resturants.map(rest => `<li>${rest.name}</li>`).join("")}`;

const reservationView = (reservations) => `
${reservations.map(r => {
  const rest =

}).join("")}`;


const init = async() => {
  try {
    const [users, resturants] = await Promise.all([
      axios.get("/api/users"),
      axios.get("/api/restaurants")
    ]);
    // const users = (await axios.get("/api/users")).data;
    userList.innerHTML = userView(users.data);
    restList.innerHTML = resturantView(resturants.data);
    // reservList.innerHTML = reservationView(users);
  } catch (error) {
    console.log(error)
  }
}

init();

window.addEventListener("hashchange", async(e) => {
  const id = window.location.hash.slice(1) * 1
  const resList = await axios.get(`/api/users/${id}/reservations`)

  reservList.innerHTML = reservationView(resList.data);
})
