import { utilService } from './util-service.js';
import axios from 'axios';

const URL =
  process.env.NODE_ENV !== 'development'
    ? '/api/auth/'
    : '//localhost:3030/api/auth/';

const USER_URL = '/api/user/';

export const userService = {
  login,
  logout,
  signup,
  getLoggedinUser,
  getById,
  query,
  remove,
};

async function query() {
  // return axios.get(USER_URL).then(res => res.data);
  const res = await axios.get(USER_URL);
  return res.data;
}

function remove(userId) {
  return axios.delete(USER_URL + userId);
}

async function getById(id) {
  // return axios.get(USER_URL + id).then(res => res.data);
  const res = await axios.get(USER_URL + id);
  return res.data;
}

async function login(username, password) {
  const res = await axios.post('//localhost:3030/api/auth/login', {
    username,
    password,
  });
  utilService.saveToStorage('loggedinUser', res.data);
  return res.data;
}

async function signup(fullname, username, password) {
  return axios
    .post('http://127.0.0.1:3030/api/auth/signup', {
      fullname,
      username,
      password,
    })
    .then(res => res.data)
    .then(user => {
      utilService.saveToStorage('loggedinUser', user);
      return user;
    });
  // const res = await axios.post('http://127.0.0.1:3030/api/auth/signup', {
  //   fullname,
  //   username,
  //   password,
  // });
  // utilService.saveToStorage('loggedinUser', res.data);
  // return res.data;
}
async function logout() {
  return axios.post('/api/auth/logout').then(() => {
    utilService.saveToStorage('loggedinUser', '');
  });
  await axios.post('/api/auth/logout');
  utilService.saveToStorage('loggedinUser', '');
}

function getLoggedinUser() {
  return utilService.loadFromStorage('loggedinUser');
}
