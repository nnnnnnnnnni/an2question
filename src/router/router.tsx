import React, { ReactNode } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Admin from "../pages/admin/admin";
import User from "../pages/user/user";
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
        path: "/admin/user",
        name: "USER",
        exact: false,
        component: User,
      },
    ],
  },
];

export default function ConfigRouteMap() {
  return (
    <Router>
      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
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
