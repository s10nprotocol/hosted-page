import { MerchantHostedPageView } from '@/views/MerchantHostedPageView'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

const MerchantLandingPage: NextPage = (ctx) => {
  const router = useRouter()
  const id = router.query.id
  return <MerchantHostedPageView merchantTokenId={id as string} />
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking', // can also be true or 'blocking'
  }
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps() {
  return {
    // Passed to the page component as props
    props: { hideDefaultLayout: true },
  }
}

export default MerchantLandingPage
