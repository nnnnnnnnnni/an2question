import React, { useState } from "react";
import logo from "../logo.svg";
import "./App.css";
import { Button } from "antd";
import { Switch, useHistory } from "react-router-dom";
import { IRoute, RouteWithSubRoutes } from "../router/router";

function App(props: any) {
  const [count, setCount] = useState(0);
  const history = useHistory();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <Button type="primary" onClick={() => setCount((count) => count + 1)}>
            new count is: {count}
          </Button>
        </p>
        <div className='App-demos'>
          <Button className='App-demo' type='primary' onClick={() => {
            history.push('/page1')
          }}>page1</Button>
          <Button className='App-demo' type='primary' onClick={() => {
            history.push('/page2')
          }}>page2</Button>
          <Button className='App-demo' type='primary' onClick={() => {
            history.push('/errororor')
          }}>not match</Button>
        </div>
        <Switch>
          {props.children.map((route: IRoute, i: number) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
      </header>
    </div>
  );
}

export default App;
