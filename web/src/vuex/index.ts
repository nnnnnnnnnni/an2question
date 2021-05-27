import { createStore } from "vuex";
import { IUser } from "../pages/interface";

export interface State {
  user: IUser;
  route?: {
    name?: string,
    path?: string
  };
}

export const store = createStore<State>({
  state() {
    return {
      user: {},
      route: {},
    };
  },
  mutations: {
    setUser(state, user: IUser) {
      state.user = user;
    },
    setRoute(state, route) {
      state.route = route;
    }
  },
});

export default store;
