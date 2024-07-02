import { Layout, Menu, MenuProps } from "antd";

import { NavLink, Outlet } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;
const MainLayout = () => {
  const portfolioItems: MenuProps["items"] = [
    {
      key: "1",
      label: <NavLink to={"/"}>Basic Information</NavLink>,
    },
    {
      key: "2",
      label: <NavLink to={"skills"}>Skills</NavLink>,
    },
    {
      key: "3",
      label: <NavLink to={"add-project"}>Add Project</NavLink>,
    },
    {
      key: "4",
      label: <NavLink to={"projects"}>Projects</NavLink>,
    },
    {
      key: "5",
      label: <NavLink to={"blogs"}>Blogs</NavLink>,
    },
  ];
  return (
    <Layout style={{ height: "100%", minHeight: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div
          style={{
            color: "white",
            textAlign: "center",
            height: "4rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyItems: "center",
              alignItems: "center",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>

            <h1>Portfolio Management</h1>
          </div>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={portfolioItems}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }} />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
