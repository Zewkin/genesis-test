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
      item.editMode = false
    })
    state.rows = rows
  },
  setColumns (state, columns) {
    state.columns = columns
  },
  editCell (state, { id, column, value }) {
    console.log({ id, column, value })
    const row = state.rows.find(row => row._id == id)
    console.log(row)
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