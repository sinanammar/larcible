import { Box } from '@chakra-ui/react'
import NftBanner from '../../components/Home/NftBanner/NftBanner'

// Components
import ExploreNft from '../../components/Home/ExploreNft/ExploreNft'
import PopularCollections from '../../components/Home/PopularCollections/PopularCollection'
import CreateItem from '../../components/Home/CreateItem/CreateItem'
import TopCollections from '../../components/Home/TopCollections/TopCollections'
import RecommendedArt from '../../components/Home/RecommendedArt/RecommendedArt'
import Landing from '../../components/Home/Landing/Landing'
import LiveBidding from '../../components/Home/Live Bidding/LiveBidding'

const Home = () => {
  return (
    <Box h="100%">
      <Landing />
      <LiveBidding />
      <ExploreNft />
      <PopularCollections />
      <CreateItem />
      <TopCollections />
      <RecommendedArt />
      <NftBanner />
    </Box>
  )
}

export default Home
