import { createStore } from "vuex";
import { IUser } from "../pages/interface";

export interface State {
  user: IUser | null;
  route?: {
    name: string,
    path: string
  };
}

export const store = createStore<State>({
  state() {
    return {
      user: null,
      route: {
        name: 'LOGIN',
        path: '/login'
      },
    };
  },
  mutations: {
    setUser(state, user: IUser) {
      if(import.meta.env.VITE_ENV == 'dev') {
        user.avator = '/api' + user.avator;
      }
      state.user = user;
    },
    setRoute(state, route) {
      state.route = route;
    }
  },
});

export default store;
