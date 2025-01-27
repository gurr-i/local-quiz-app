import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";

const { Header } = Layout;

function AppHeader() {
  return (
    <Header>
      <div className="logo" style={{ color: "white", fontSize: "20px" }}>
        Quiziare.ai
      </div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">
          <Link to="/local-quiz-app/Home">Home</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/local-quiz-app/about">About</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/local-quiz-app/contact">Contact</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
}

export default AppHeader;
