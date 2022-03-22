import { utilService } from './util-service.js';
import { httpService } from './http.service.js';

import axios from 'axios';
axios.defaults.withCredentials = true;

// const KEY = 'toys_db';
const URL = '//localhost:3030/api/toy/';
// _createToys();

const instance = axios.create({
  withCredentials: true,
});

function _getUrl(id = '') {
  const BASE_URL =
    process.env.NODE_ENV !== 'development'
      ? '/api/toy'
      : 'http://localhost:3030/api/toy';

  return `${BASE_URL}/${id}`;
}

export const toyService = {
  query,
  getById,
  remove,
  save,
  getEmptyToy,
};

async function query(filterBy) {
  // return axios.get(_getUrl(), { params: filterBy }).then(res => res.data);
  const res = await axios.get(_getUrl(), { params: filterBy });
  return res.data;
}

async function getById(toyId) {
  // return axios.get(_getUrl(toyId)).then(res => res.data);
  const res = await axios.get(_getUrl(toyId));
  return res.data;
}

function remove(toyId) {
  console.log(_getUrl(toyId));
  return axios.delete(_getUrl(toyId));
}

async function save(toy) {
  if (toy._id) {
    const res = await axios.put(_getUrl(toy._id), toy);
    return res.data;
  } else {
    const res = await axios.post(_getUrl(), toy);
    return res.data;
  }
}

function getEmptyToy() {
  return {
    name: '',
    price: 0,
    labels: [],
    createdAt: Date.now(),
    inStock: true,
    reviews: ['Good', 'Nice', 'Fun'],
  };
}

// function _createToys() {
//   let toys = utilService.loadFromStorage(KEY);
//   if (!toys || !toys.length) {
//     toys = [
//       {
//         id: utilService.makeId(),
//         name: 'Talking Doll',
//         price: 30,
//         labels: ['Doll', 'Battery Powered', 'Baby'],
//         createdAt: 1631031801011,
//         inStock: true,
//       },
//       {
//         id: utilService.makeId(),
//         name: 'Rabitosh',
//         price: 65,
//         labels: ['Pet', 'Battery Powered', 'Child'],
//         createdAt: 1631061801011,
//         inStock: true,
//       },
//       {
//         id: utilService.makeId(),
//         name: 'Walking Hash',
//         price: 65,
//         labels: ['Robot', 'Tech'],
//         createdAt: 1631091801011,
//         inStock: true,
//       },
//       {
//         id: utilService.makeId(),
//         name: 'Meet My Pony',
//         price: 125,
//         labels: ['Pet', 'Child', 'Baby'],
//         createdAt: 1631021801011,
//         inStock: true,
//       },
//     ];
//     utilService.saveToStorage(KEY, toys);
//   }
//   return toys;
// }
