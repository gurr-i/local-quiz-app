import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Menu, Switch, Drawer, Button } from "antd";
import { AppstoreOutlined, MailOutlined, SettingOutlined, MenuOutlined } from "@ant-design/icons";

const { Header } = Layout;

// Define menu items for the sidebar
const sidebarItems = [
  {
    key: "sub1",
    label: "Navigation One",
    icon: <MailOutlined />,
    children: [
      {
        key: "1",
        label: "Option 1",
      },
      {
        key: "2",
        label: "Option 2",
      },
      {
        key: "3",
        label: "Option 3",
      },
      {
        key: "4",
        label: "Option 4",
      },
    ],
  },
  {
    key: "sub2",
    label: "Navigation Two",
    icon: <AppstoreOutlined />,
    children: [
      {
        key: "5",
        label: "Option 5",
      },
      {
        key: "6",
        label: "Option 6",
      },
      {
        key: "sub3",
        label: "Submenu",
        children: [
          {
            key: "7",
            label: "Option 7",
          },
          {
            key: "8",
            label: "Option 8",
          },
        ],
      },
    ],
  },
  {
    key: "sub4",
    label: "Navigation Three",
    icon: <SettingOutlined />,
    children: [
      {
        key: "9",
        label: "Option 9",
      },
      {
        key: "10",
        label: "Option 10",
      },
      {
        key: "11",
        label: "Option 11",
      },
      {
        key: "12",
        label: "Option 12",
      },
    ],
  },
];

function AppHeader() {
  const location = useLocation();
  const [theme, setTheme] = useState("dark");
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Determine the selected key based on the current route
  const getSelectedKey = () => {
    switch (location.pathname) {
      case "/local-quiz-app/":
        return ["1"];
      case "/local-quiz-app/about":
        return ["2"];
      case "/local-quiz-app/contact":
        return ["3"];
      default:
        return ["1"]; // Default to Home
    }
  };

  // Toggle between dark and light themes
  const changeTheme = (value) => {
    setTheme(value ? "dark" : "light");
  };

  return (
    <Header style={{ display: "flex", alignItems: "center" }}>
      {/* Logo */}
      <div className="logo" style={{ color: "white", fontSize: "20px", marginRight: "24px" }}>
        Quiziare.ai
      </div>

      {/* Horizontal Menu */}
      <Menu
        theme={theme}
        mode="horizontal"
        selectedKeys={getSelectedKey()} // Dynamically set selected key
        style={{ flex: 1, minWidth: 0 }}
        aria-label="Main navigation"
        items={[
          {
            key: "1",
            label: <Link to="/local-quiz-app/">Home</Link>,
          },
          {
            key: "2",
            label: <Link to="/local-quiz-app/about">About</Link>,
          },
          {
            key: "3",
            label: <Link to="/local-quiz-app/contact">Contact</Link>,
          },
        ]}
      />

      {/* Theme Switcher */}
      <Switch
        checked={theme === "dark"}
        onChange={changeTheme}
        checkedChildren="Dark"
        unCheckedChildren="Light"
        style={{ marginLeft: "16px" }}
        aria-label="Toggle theme"
      />

      {/* Hamburger Menu Button (for mobile) */}
      <Button
        type="text"
        icon={<MenuOutlined />}
        onClick={() => setDrawerVisible(true)}
        style={{ color: "white", marginLeft: "16px", display: "none" }}
        className="mobile-menu-button"
      />

      {/* Drawer for Sidebar Menu (mobile) */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible} // Use `open` instead of `visible`
        styles={{ body: { padding: 0 } }} // Use `styles.body` instead of `bodyStyle`
      >
        <Menu
          theme={theme}
          mode="inline"
          defaultOpenKeys={["sub1"]}
          style={{ height: "100%", borderRight: 0 }}
          items={sidebarItems} // Use `items` instead of `children`
          aria-label="Sidebar navigation"
        />
      </Drawer>
    </Header>
  );
}

export default AppHeader;