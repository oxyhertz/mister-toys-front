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
      const idx = state.toys.findIndex(toy => {
        return toy._id === id;
      });
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
    async loadToys({ commit, state }) {
      console.log('LoadToys');
      try {
        const toys = await toyService.query(state.filterBy);
        return commit({ type: 'setToys', toys });
      } catch (err) {
        console.log(err);
      }
    },
    async removeToy({ commit }, { id }) {
      try {
        await toyService.remove(id);
        commit({ type: 'removeToy', id });
      } catch (err) {
        console.log(err);
      }
    },
    async saveToy({ commit }, { savedToy }) {
      try {
        console.log(savedToy);
        const toy = await toyService.save(savedToy);
        commit({ type: 'saveToy', toy });
      } catch (err) {
        console.log(err);
      }
    },
    filter({ commit, dispatch }, { filterBy }) {
      commit({ type: 'setFilter', filterBy });
      dispatch({ type: 'loadToys' });
    },
  },
};
