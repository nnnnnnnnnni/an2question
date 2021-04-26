import React, { ReactNode } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import loadable from '@loadable/component'
import Admin from "../pages/admin/admin";
import Question from "../pages/admin/question/question";
import QuestionDetail from "../pages/admin/question/question_detail";
import QuestionAdd from "../pages/admin/question/question_add";
import User from "../pages/admin/user";
export interface IRoute {
  path: string;
  name: string;
  exact?: boolean;
  component: React.FC;
  children?: IRoute[] | ReactNode;
}
const routes: IRoute[] = [
  {
    path: "/admin",
    name: "ADMIN",
    exact: false,
    component: Admin,
    children: [
      {
        path: "/admin/question",
        name: "QUESTION",
        exact: true,
        component:  loadable(() => import ('../pages/admin/question/question')),
      },
      {
        path: "/admin/question/add",
        name: "QUESTION_ADD",
        exact: true,
        component: loadable(() => import ('../pages/admin/question/question_add')),
      },
      {
        path: "/admin/question/:id",
        name: "QUESTION_DETAIL",
        exact: false,
        component: loadable(() => import ('../pages/admin/question/question_detail')),
      },
      {
        path: "/admin/user",
        name: "USER",
        exact: true,
        component: loadable(() => import ('../pages/admin/user')),
      },
    ],
  },
];

export default function ConfigRouteMap() {
  return (
    <Router>
      <Switch>
        {routes.map((route) => (
          <RouteWithSubRoutes key={route.name} {...route} />
        ))}
      </Switch>
    </Router>
  );
}

export const RouteWithSubRoutes = (route: IRoute) => {
  return (
    <Route
      path={route.path}
      exact={route.exact ?? false}
      render={(props) => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} children={route.children} />
      )}
    />
  );
};
