import Head from 'next/head'
import { Layout, Menu } from 'antd'
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons'
import MinimartLayout from '@/layouts/MinimartLayout'

const { Header, Content, Footer, Sider } = Layout

export default function Home() {
  return (
    <>
      <MinimartLayout>
        <div className="">Content</div>
      </MinimartLayout>
    </>
  )
}
