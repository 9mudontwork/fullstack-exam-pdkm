import Head from 'next/head'
import { Layout, Menu } from 'antd'
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons'
import MinimartLayout from '@/layouts/MinimartLayout'
import List from '@/components/pages/product/list'

const { Header, Content, Footer, Sider } = Layout

export default function Index() {
  return (
    <>
      <MinimartLayout title="รายชื่อสินค้า">
        <div className="">
          <List />
        </div>
      </MinimartLayout>
    </>
  )
}
