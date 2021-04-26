import React from "react";
import { Avatar } from "antd";
import "./admin.css";
import { UserOutlined, QuestionCircleOutlined, CarryOutOutlined } from "@ant-design/icons";

export default function () {
  return (
    <div className="admin-nav">
      <div className="admin-nav-container">
        <div className="admin-nav-container-item">
          <CarryOutOutlined style={{fontSize: '20px'}}/>
        </div>
        <div className="admin-nav-container-item">
          <QuestionCircleOutlined style={{fontSize: '20px'}}/>
        </div>
        <div className="admin-nav-container-item">
          <Avatar size="default" style={{ backgroundColor: "#87d068" }} icon={<UserOutlined />} />
        </div>
      </div>
    </div>
  );
}
