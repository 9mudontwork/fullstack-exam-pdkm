import Edit from './edit'
import { productService } from 'services'

export default Edit

export async function getServerSideProps({ params }) {
  const productData = await productService
    .getById(params.id)
    .then((result) => {
      return result
    })
    .catch((error) => {
      return error
    })

  // https://nextjs.org/blog/next-10#notfound-support
  if (productData.status === 404) {
    return {
      notFound: true,
    }
  }

  return {
    props: { productData },
  }
}
