import Head from 'next/head'
import { Layout, Menu, Alert } from 'antd'
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { PageHeader } from 'antd'

const { Header, Content, Footer, Sider } = Layout

const MinimartLayout = (props) => {
  const { children, title } = props
  return (
    <>
      <Head>
        <title>ระบบจัดการร้านค้าขนมและเครื่องดื่ม</title>
      </Head>
      <Layout className="min-h-screen">
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken)
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type)
          }}
        >
          <div className="bg-opacity-20 h-8 m-4 bg-white" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              ร้านค้า
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              สินค้า
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header className="flex items-center px-4 text-xl font-medium bg-white">
            <span>ระบบจัดการร้านค้าขนมและเครื่องดื่ม</span>
          </Header>
          <Content className="mx-4">
            <PageHeader className="px-0 !font-semibold" title={title} />
            <div className="bg-white p-6 min-h-[360px]">{children}</div>
          </Content>
          <Footer className="text-center">ระบบจัดการร้านค้าขนมและเครื่องดื่ม @2021</Footer>
        </Layout>
      </Layout>
    </>
  )
}

export default MinimartLayout
