import axios from 'axios';

const userList = document.querySelector('#users');
const restList = document.querySelector('#resturants');
const reservList = document.querySelector('#reservations');
let users = [];
let resturants = [];
let resList = [];

const userView = (users) =>
  `${users.map((u) => `<li> <a href="#${u.id}">${u.name}</a></li>`).join('')}`;
const resturantView = (resturants) =>
  `${resturants.map((rest) => `<li>${rest.name}</li>`).join('')}`;

function reservationView(reservations) {
  if (reservations.length) {
    const html = reservations
      .map(
        (reservation) => `
      <li data-id='${reservation.id}'>
        ${reservation.id}
        <br />
        (
        ${new Date(reservation.createdAt).toLocaleDateString()}
        ${new Date(reservation.createdAt).toLocaleTimeString()}
        )<button data-id='${reservation.id}'>X</button>
      </li>
    `
      )
      .join('');
    return html;
  } else {
    return '<li>no reservations</li>';
  }
}

const init = async () => {
  try {
    [users, resturants] = await Promise.all([
      axios.get('/api/users'),
      axios.get('/api/restaurants'),
    ]);
    // const users = (await axios.get("/api/users")).data;
    userList.innerHTML = userView(users.data);
    restList.innerHTML = resturantView(resturants.data);
    reservList.innerHTML = reservationView(resList.data);
  } catch (error) {
    console.log(error);
  }
};

init();

window.addEventListener('hashchange', async (e) => {
  const id = window.location.hash.slice(1) * 1;
  resList = await axios.get(`/api/users/${id}/reservations`);
  init();
  // reservList.innerHTML = reservationView(resList.data);
});

reservList.addEventListener('click', async (ev) => {
  // console.log(ev.target);
  if (ev.target.tagName === 'BUTTON') {
    ev.preventDefault();
    // console.log('clicked button');
    const dataID = ev.target.getAttribute('data-id');
    const todestroy = await axios.delete(`/api/reservations/${dataID}`);
  }
});
