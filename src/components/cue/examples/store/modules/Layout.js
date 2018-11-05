const Layout = {
    state: {
        visitedViews: [],
        cachedViews: [],
        currentView: {},
        menuIndex: {},
        fullscreen:false
    },
    mutations: {
        ADD_VISITED_VIEWS: (state, view) => {
            if (state.visitedViews.some(v => v.Id === view.Id)) return

            state.visitedViews.push({
                Id: view.Id,
                Val: view.Val,
                Name: view.Name || '临时页面'
            })
            // if (!view.meta.noCache) {
            // state.cachedViews.push(view.Id)
            // }
        },
        DEL_VISITED_VIEWS: (state, view) => {
            for (const [i, v] of state.visitedViews.entries()) {
                if (v.Id === view.Id) {
                    state.visitedViews.splice(i, 1)
                    break
                }
            }
            for (const i of state.cachedViews) {
                if (i === view.name) {
                    const index = state.cachedViews.indexOf(i)
                    state.cachedViews.splice(index, 1)
                    break
                }
            }
        },
        DEL_OTHERS_VIEWS: (state, view) => {
            for (const [i, v] of state.visitedViews.entries()) {
                if (v.Val === view.Val) {
                    state.visitedViews = state.visitedViews.slice(i, i + 1)
                    break
                }
            }
            for (const i of state.cachedViews) {
                if (i === view.name) {
                    const index = state.cachedViews.indexOf(i)
                    state.cachedViews = state.cachedViews.slice(index, i + 1)
                    break
                }
            }
        },
        DEL_ALL_VIEWS: state => {
            state.visitedViews = []
            state.cachedViews = []
        },
        SET_CURRENT_VIEW: (state, view) => {
            state.currentView = view
        },
        SET_MENU_INDEX: (state, index) => {
            state.menuIndex = index
        },
        ChangeFullScreen(state, v){
            state.fullscreen = v;
        }
    },
    actions: {
        addVisitedViews({ commit }, view) {
            commit('ADD_VISITED_VIEWS', view)
            commit('SET_CURRENT_VIEW', view)
        },
        delVisitedViews({ commit, state }, view) {
            return new Promise(resolve => {
                commit('DEL_VISITED_VIEWS', view)
                resolve([...state.visitedViews])
            })
        },
        delOthersViews({ commit, state }, view) {
            return new Promise(resolve => {
                commit('DEL_OTHERS_VIEWS', view)
                resolve([...state.visitedViews])
            })
        },
        delAllViews({ commit, state }) {
            return new Promise(resolve => {
                commit('DEL_ALL_VIEWS')
                resolve([...state.visitedViews])
            })
        },
        setCurrentView({ commit }, view) {
            commit('SET_CURRENT_VIEW', view)
        },
        setMenuIndex({ commit }, index) {
            commit('SET_MENU_INDEX', index)
        },
        "fullscreen-change"({commit}, v){
            commit("ChangeFullScreen", v);
        }
    }
}

export default Layout
