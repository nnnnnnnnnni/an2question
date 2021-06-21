import { IRoute } from "../interface/route";
import Login from "../controller/user/login";
import Logout from "../controller/user/logout";
import Register from "../controller/user/register";
import Profile from "../controller/user/profile";
import { setting, password } from "../controller/user/setting";
import { userValidation } from "../validation/user";

export default [
  {
    path: "/login",
    methods: "POST",
    validation: userValidation.login,
    Middlewares: [Login],
    needLogin: false,
  },
  {
    path: "/logout",
    methods: "POST",
    validation: userValidation.Logout,
    Middlewares: [Logout],
    needLogin: false,
  },
  {
    path: "/register",
    methods: "POST",
    validation: userValidation.register,
    Middlewares: [Register],
    needLogin: false,
  },
  {
    path: "/profile",
    methods: "GET",
    Middlewares: [Profile],
    needLogin: true,
  },
  {
    path: "/user/setting",
    methods: "PUT",
    Middlewares: [setting],
    needLogin: true,
  },
  {
    path: "/user/password",
    methods: "PUT",
    validation: userValidation.password,
    Middlewares: [password],
    needLogin: true,
  },
] as IRoute[];
