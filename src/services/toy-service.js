import { storageService } from './storage-service.js';
import { utilService } from './util-service.js';
import axios from 'axios';

// const KEY = 'toys_db';
const URL = '//localhost:3030/api/toy/';
// _createToys();

function _getUrl(id = '') {
  const BASE_URL =
    process.env.NODE_ENV !== 'development'
      ? '/api/toy'
      : '//localhost:3030/api/toy';

  return `${BASE_URL}/${id}`;
}

export const toyService = {
  query,
  getById,
  remove,
  save,
  getEmptyToy,
};

function query(filterBy) {
  return axios.get(_getUrl(), { params: filterBy }).then(res => res.data);
  // return storageService.query(KEY);
}

function getById(toyId) {
  return axios.get(_getUrl(toyId)).then(res => res.data);

  return storageService.get(KEY, toyId);
}

function remove(toyId) {
  return axios.delete(_getUrl(toyId));

  return storageService.remove(KEY, toyId);
}

function save(toy) {
  if (toy._id) return axios.put(_getUrl(toy._id), toy).then(res => res.data);
  else return axios.post(_getUrl(), toy).then(res => res.data);

  // if (toy.id) return storageService.put(KEY, toy);
  // return storageService.post(KEY, car);
}

function getEmptyToy() {
  return {
    name: '',
    price: 0,
    labels: [],
    createdAt: Date.now(),
    inStock: true,
    labels: ['Doll', 'Battery Powered', 'Baby'],
    reviews: ['Good', 'Nice', 'Fun'],
  };
}

function _createToys() {
  let toys = utilService.loadFromStorage(KEY);
  if (!toys || !toys.length) {
    toys = [
      {
        id: utilService.makeId(),
        name: 'Talking Doll',
        price: 30,
        labels: ['Doll', 'Battery Powered', 'Baby'],
        createdAt: 1631031801011,
        inStock: true,
      },
      {
        id: utilService.makeId(),
        name: 'Rabitosh',
        price: 65,
        labels: ['Pet', 'Battery Powered', 'Child'],
        createdAt: 1631061801011,
        inStock: true,
      },
      {
        id: utilService.makeId(),
        name: 'Walking Hash',
        price: 65,
        labels: ['Robot', 'Tech'],
        createdAt: 1631091801011,
        inStock: true,
      },
      {
        id: utilService.makeId(),
        name: 'Meet My Pony',
        price: 125,
        labels: ['Pet', 'Child', 'Baby'],
        createdAt: 1631021801011,
        inStock: true,
      },
    ];
    utilService.saveToStorage(KEY, toys);
  }
  return toys;
}
