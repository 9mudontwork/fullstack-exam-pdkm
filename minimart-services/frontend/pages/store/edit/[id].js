import Edit from '@/components/pages/store/edit'
import { storeService } from 'services'

export default Edit

export async function getServerSideProps({ params }) {
  const storeData = await storeService
    .getById(params.id)
    .then((result) => {
      return result
    })
    .catch((error) => {
      return error
    })

  // https://nextjs.org/blog/next-10#notfound-support
  if (storeData.status === 404) {
    return {
      notFound: true,
    }
  }

  return {
    props: { storeData },
  }
}
