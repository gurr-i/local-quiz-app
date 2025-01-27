import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;

function AppFooter() {
  return (
    <Footer style={{ textAlign: "center" }}>
      Quiz App ©2025 Created by Gurveer |{" "}
      <a
        href="https://github.com/your-repo"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>
    </Footer>
  );
}

export default AppFooter;
