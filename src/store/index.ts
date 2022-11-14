import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import type { User } from './type'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key: 'cppcc_heibe_book_vuex'
})

export interface State{
  include: Array<string>,
  unit: Array<any>,
  userInfo:User
}
// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol('state')
export const store = createStore<State>({
  state () {
    return {
      include: ['groupList', 'index', 'me', 'study-data-index'],
      unit: [],
      userInfo: {}
    }
  },
  mutations: {
    addInclude: (state:State, data:string) => {
      state.include.push(data)
      state.include = [...new Set(state.include)]
    },
    deleteInclude: (state:State, data:string) => {
      if (data === 'all') {
        state.include = []
      } else {
        if (state.include.indexOf(data) !== -1) {
          state.include.splice(state.include.indexOf(data), 1)
        }
      }
    },
    setUserInfo (state:State, payload:User) {
      state.userInfo = payload
    },
    setUnit (state: State, payload: any) {
      if (typeof payload === 'string') {
        state.unit = state.unit.filter(e => !(e.strUserId === payload || e.userId === payload))
      } else {
        state.unit = state.unit.filter(e => e.strUserId !== payload.strUserId && e.strUserId !== payload.userId)
        state.unit.push(payload)
      }
    },
    inintUnit (state: State, payload: any) {
      state.unit = payload
    }
  },
  getters: {
    getInclude: (state:State) => {
      return state.include
    },
    getUserInfo: (state:State) => {
      return state.userInfo
    },
    getUnit: (state:State) => {
      return state.unit
    }
  },
  actions: {
  },
  plugins: [vuexLocal.plugin]
})
// 定义自己的 `useStore` 组合式函数
export function useStore () {
  return baseUseStore(key)
}
