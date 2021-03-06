import API from '../../api/grid'

const state = () => ({
  columns: {},
  rows: []
})

const getters = {

}

const actions = {
  getData ({ commit }) {
    API.getData().then(data => {
      commit('setRows', data.items)
      commit('setColumns', data.titles)
    })
  },
  editCell ({ commit }, payload) {
    commit('editCell', payload)
  }
}

const mutations = {
  setRows (state, rows) {
    rows.forEach((item, i) => {
      if (!item._id) {
        item._id = i + 1
      }
    })
    state.rows = rows
  },
  setColumns (state, columns) {
    state.columns = columns
  },
  editCell (state, { id, column, value }) {
    const row = state.rows.find(row => row._id == id)
    row[column] = value
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}