import View from '@/components/pages/product/view'
import { productService } from 'services'

export default View

export async function getServerSideProps({ params }) {
  const productServiceResults = await productService
    .getById(params.id)
    .then((result) => {
      return result
    })
    .catch((error) => {
      return error
    })

  // https://nextjs.org/blog/next-10#notfound-support
  if (productServiceResults.status === 404) {
    return {
      notFound: true,
    }
  }

  return {
    props: { productServiceResults },
  }
}
