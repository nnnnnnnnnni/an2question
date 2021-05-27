import { IRoute } from "../interface/route";
import Login from "../controller/user/login";
import Register from '../controller/user/register';
import Profile from '../controller/user/profile';
import {userValidation} from '../validation/user'

export default [
  {
    path: "/login",
    methods: "POST",
    validation: userValidation.login,
    Middlewares: [Login],
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
] as IRoute[];
