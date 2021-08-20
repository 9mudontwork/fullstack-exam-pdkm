import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Layout, Menu } from 'antd'
import { ShopOutlined, ShoppingOutlined } from '@ant-design/icons'
import { PageHeader } from 'antd'
import { useEffect } from 'react'

const { Header, Content, Footer, Sider } = Layout

const MinimartLayout = (props) => {
  const router = useRouter()
  const { children, title } = props

  const isStorePath = () => {
    if (router.pathname.includes('store')) return ['1']

    return ['2']
  }

  useEffect(() => {
    // console.log(router)
  })
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
            // console.log(broken)
          }}
          onCollapse={(collapsed, type) => {
            // console.log(collapsed, type)
          }}
        >
          <div className="bg-opacity-20 h-8 m-4 bg-white" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={isStorePath()}>
            <Menu.Item key="1" icon={<ShopOutlined />} onClick={() => router.push('/store')}>
              ร้านค้า
            </Menu.Item>
            <Menu.Item key="2" icon={<ShoppingOutlined />} onClick={() => router.push('/product')}>
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
