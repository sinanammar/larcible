import './styles-light.css'
import './styles-dark.css'
import { Box, Button, HStack, Text, VStack, SimpleGrid } from '@chakra-ui/react'

// Components
import NftCard from '../../NftCard/NftCard'

import useColorModeStore from '../../../store/colorModeStore'

const FILTER_CATEGORIES = [
  'All',
  'Music',
  'Sport',
  'Art Drawing',
  'Photography',
  'Metaverse',
  'Trading Card',
  'Virtual Card',
]

const NFTLIST = [
  {
    id: '1',
    name: 'A brush with arts',
    creator: 'Dang dough',
    currendtBid: '0.001',
  },
  {
    id: '2',
    name: 'A brush with arts',
    creator: 'Dang dough',
    currendtBid: '0.001',
  },
  {
    id: '3',
    name: 'A brush with arts',
    creator: 'Dang dough',
    currendtBid: '0.001',
  },
  {
    id: '4',
    name: 'A brush with arts',
    creator: 'Dang dough',
    currendtBid: '0.001',
  },
  {
    id: '5',
    name: 'A brush with arts',
    creator: 'Dang dough',
    currendtBid: '0.001',
  },
]

const ExploreNft = () => {
  const { colorMode } = useColorModeStore()
  const header = colorMode === 'dark' ? 'title-dark' : 'title-light'
  const title = colorMode === 'dark' ? 'title-dark' : 'title-light'
  const btn = colorMode === 'dark' ? 'btn-dark' : 'btn-light'
  const filterBtnWrapper =
    colorMode === 'dark' ? 'filter-btn-wrapper-dark' : 'filter-btn-wrappern-light'

  return (
    <Box className="explore-wrapper">
      <Box className="main-light">
        <VStack className="info-light">
          <Text className={title}>Explore NFT Art</Text>
          <Text alignSelf="flex-start">
            Buy and sell NFTs from the worlds top artists
          </Text>
        </VStack>
        <Button className={btn}>Explore More</Button>
      </Box>
      <HStack className={filterBtnWrapper} mb="48px" gap={4}>
        {FILTER_CATEGORIES.map((category) => (
          <FilterButton key={category} category={category} />
        ))}
      </HStack>
      {/* Rendering NFT list*/}
      <SimpleGrid columns={4} spacing={16}>
        {NFTLIST &&
          NFTLIST.map((nft) => (
            <NftCard
              key={nft.id}
              id={nft.id}
              name={nft.name}
              creator={nft.creator}
              currentBid={nft.currendtBid}
            />
          ))}
      </SimpleGrid>
    </Box>
  )
}

export default ExploreNft

const FilterButton = ({ category }: { category: string }) => {
  const { colorMode } = useColorModeStore()
  const filterBtn = colorMode === 'dark' ? 'filter-btn-dark' : 'filter-btn-light'
  return <Button className={filterBtn}>{category as any}</Button>
}
