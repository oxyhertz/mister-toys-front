import { toyService } from '../../services/toy-service';

export default {
  state: {
    toys: null,
    filterBy: null,
    labels: [
      'On Wheels',
      'Box Game',
      'Art',
      'Baby',
      'Doll',
      'Puzzle',
      'Outdoor',
    ],
  },
  getters: {
    toys(state) {
      return state.toys;
    },
    labels(state) {
      return state.labels;
    },
  },
  mutations: {
    setToys(state, { toys }) {
      state.toys = toys;
    },
    removeToy(state, { id }) {
      console.log(id);
      const idx = state.toys.findIndex(toy => {
        return toy._id === id;
      });
      console.log(idx);
      state.toys.splice(idx, 1);
    },
    saveToy(state, { toy }) {
      const idx = state.toys.findIndex(currtoy => currtoy.id === toy.id);
      if (idx !== -1) state.toys.splice(idx, 1, toy);
      else state.toys.push(toy);
    },
    setFilter(state, { filterBy }) {
      state.filterBy = filterBy;
    },
  },
  actions: {
    loadToys({ commit, state }) {
      console.log('LoadToys');
      return toyService.query(state.filterBy).then(toys => {
        commit({ type: 'setToys', toys });
      });
    },
    removeToy({ commit }, { id }) {
      toyService.remove(id).then(() => {
        commit({ type: 'removeToy', id });
      });
    },
    saveToy({ commit }, { toy }) {
      toyService.save(toy).then(toy => {
        commit({ type: 'saveToy', toy });
      });
    },
    filter({ commit, dispatch }, { filterBy }) {
      commit({ type: 'setFilter', filterBy });
      dispatch({ type: 'loadToys' });
    },
  },
};
