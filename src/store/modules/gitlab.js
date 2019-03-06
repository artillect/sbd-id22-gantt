
const state = {
}

const mutations = {
}

const getters = {
  projectFullName (state, getters, rootState) {
    const project = rootState.repo.project
    return project
      ? project.path_with_namespace
      : null
  },
  projectLabel () {
    return 'path_with_namespace'
  },
  getProjectParams: () => (search) => {
    // check if search has form of 'group/[subgroup/]project
    // and return only the project name
    const project = search && search.split('/').pop()
    return {
      per_page: 10,
      search: project
    }
  },
  getProjectURL: () => (search) => {
    // check if search has form of 'group/[subgroup/]project
    // and return proper url
    let gp = search && search.split('/')
    gp.pop()
    const group = encodeURIComponent(gp.join('/'))
    return gp && gp.length === 0
      ? 'projects'
      : `groups/${group}/projects`
  },
  getIssuesParams: () => (search) => {
    return {
      per_page: 20,
      state: 'opened'
    }
  },
  issuesURL (state, getters, rootState) {
    const project = rootState.repo.project
    return project
      ? `/projects/${project.id}/issues`
      : null
  },
  getResponseItems: (statestate, getters, rootState) => (data) => {
    return data
  },
  baseURL (statestate, getters, rootState) {
    return `${rootState.providerURL}/api/v4`
  },
  headers (statestate, getters, rootState) {
    return rootState.providerToken
      ? { 'PRIVATE-TOKEN': `${rootState.providerToken}` }
      : null
  }
}

const actions = {
  setPaginationStats ({ commit }, response) {
    const headers = response.headers
    commit('pagination/page', headers['x-page'].match(/\d+/)[0], { root: true })
    commit('pagination/totalPages', headers['x-total-pages'].match(/\d+/)[0], { root: true })
    commit('pagination/perPageItems', headers['x-per-page'].match(/\d+/)[0], { root: true })
    commit('pagination/totalItems', headers['x-total'].match(/\d+/)[0], { root: true })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
