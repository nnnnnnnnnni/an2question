import React from "react";
import "./admin.css";
import { Switch, useHistory } from "react-router-dom";
import { IRoute, RouteWithSubRoutes } from "../../router/router";
import MenuCom from "../../components/admin/menu";
import NavCom from "../../components/admin/nav";
import { Layout } from "antd";
const { Header, Content, Sider } = Layout;

function Admin(props: any) {
  const history = useHistory();
  if(['/admin', '/admin/'].includes(history.location.pathname)) {
    history.push('/admin/question')
  }
  return (
    <div className="admin">
      <Layout style={{ minHeight: "100vh" }}>
        <Sider style={{ overflow: "auto", height: "100vh", position: "fixed", left: 0 }}>
          <MenuCom />
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: 200, height:'100vh' }}>
          <Header style={{ height: 80 }}>
            <NavCom />
          </Header>
          <Content style={{ margin: "20px", padding: '10px', overflow: "initial", overflowY: "auto", maxHeight: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#fff' }}>
            <Switch>
              {props.children.map((route: IRoute) => (
                <RouteWithSubRoutes key={route.name} {...route} />
              ))}
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default Admin;
