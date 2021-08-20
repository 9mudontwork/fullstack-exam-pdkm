import { Layout } from 'antd'
import MinimartLayout from '@/layouts/MinimartLayout'
import List from '@/components/pages/store/list'

const { Header, Content, Footer, Sider } = Layout

export default function Index() {
  return (
    <>
      <MinimartLayout title="รายชื่อร้านค้า">
        <div className="">
          <List />
        </div>
      </MinimartLayout>
    </>
  )
}
