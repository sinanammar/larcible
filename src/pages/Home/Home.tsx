import { Box } from '@chakra-ui/react'
import NftBanner from '../../components/Home/NftBanner/NftBanner'

// Components
import NftCard from '../../components/NftCard/NftCard'
import ExploreNft from '../../components/Home/ExploreNft/ExploreNft'

const Home = () => {
  return (
    <Box h="100%">
      <ExploreNft />
      {/* <NftCard /> */}
      <NftBanner />
    </Box>
  )
}

export default Home
