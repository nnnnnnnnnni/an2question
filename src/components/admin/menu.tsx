import React from "react";
import { Menu } from "antd";
import { AreaChartOutlined, UsergroupDeleteOutlined, TableOutlined, ContainerOutlined, BarsOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const { SubMenu } = Menu;

export default () => {
  return (
    <div style={{ maxWidth: "100%" }}>
      <div className="admin-logo">QN2QU-ADMIN</div>
      <Menu mode="inline" theme="dark">
        <Menu.Item key="ADMIN_QUESTION" icon={<BarsOutlined />}>
          <Link to="/admin/question">题目管理</Link>
        </Menu.Item>
        <Menu.Item key="ADMIN_PAPER" icon={<ContainerOutlined />}>
          <Link to="/admin/paper">套题管理</Link>
        </Menu.Item>
        <Menu.Item key="ADMIN_COMPETITION" icon={<TableOutlined />}>
          <Link to="/admin/competition">竞赛管理</Link>
        </Menu.Item>
        <SubMenu key="USER" icon={<AreaChartOutlined />} title="人员管理">
          <Menu.Item key="ADMIN_USER_AUTH" icon={<UsergroupDeleteOutlined />}>
            <Link to="/admin/user/auth">权限管理</Link>
          </Menu.Item>
          <Menu.Item key="ADMIN_USER_MANAGER" icon={<UsergroupDeleteOutlined />}>
            <Link to="/admin/user/manager">人员管理</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="STATUSTICS" icon={<AreaChartOutlined />} title="统计">
          <Menu.Item key="STATUSTICS_QUESTION">
            <Link to="/admin/statistics/question">题目统计</Link>
          </Menu.Item>
          <Menu.Item key="STATUSTICS_PAPER">
            <Link to="/admin/statistics/paper">套题统计</Link>
          </Menu.Item>
          <Menu.Item key="STATUSTICS_COMPETITION">
            <Link to="/admin/statistics/competition">竞赛统计</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="ADMIN_SETTING" icon={<BarsOutlined />}>
          <Link to="/admin/setting">设置</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};
