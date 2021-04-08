import React, { ReactNode } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "../pages/App";
import Page2 from "../pages/page2";
import Page1 from "../pages/page1";
import Error from "../pages/error404";

export interface IRoute {
  path: string;
  name: string;
  exact?: boolean;
  component: React.FC;
  children?: IRoute[] | ReactNode;
}
const routes: IRoute[] = [
  {
    path: "/",
    name: "APP",
    exact: false,
    component: App,
    children: [
      {
        path: "/page1",
        exact: true,
        name: 'PAGE1',
        component: Page1
      },
      {
        path: "/page2",
        exact: true,
        name: "PAGE2",
        component: Page2
      },
      {
        path: "*",
        name: "Error",
        component: Error
      }
    ]
  },
];

export default function RouteConfigExample() {
  return (
    <Router>
      <div>
        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
      </div>
    </Router>
  );
}

export const RouteWithSubRoutes = (route: IRoute) => {
  return (
    <Route
      path={route.path}
      exact={route.exact??false}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} children={route.children} />
      )}
    />
  );
}