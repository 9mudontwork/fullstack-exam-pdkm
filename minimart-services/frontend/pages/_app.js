import React from 'react'

import Head from 'next/head'

import 'antd/dist/antd.css'
import '@/css/tailwind.css'

/**
 *
 * temp fix useLayoutEffect warning
 * https://stackoverflow.com/questions/58070996/how-to-fix-the-warning-uselayouteffect-does-nothing-on-the-server
 *
 */
React.useLayoutEffect = React.useEffect

function NextApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
export default NextApp
