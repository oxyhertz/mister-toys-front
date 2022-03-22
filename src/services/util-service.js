export const utilService = {
  saveToStorage,
  loadFromStorage,
  makeId,
  delay,
  getRandomInt,
};

function saveToStorage(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value) || null);
}

function loadFromStorage(key) {
  let data = sessionStorage.getItem(key);
  return data ? JSON.parse(data) : undefined;
}

function makeId(length = 8) {
  var txt = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}

function delay(ms = 1500) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
