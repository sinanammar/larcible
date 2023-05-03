import styles from './styles.module.css'
import { Box, Button, HStack, Text, VStack, SimpleGrid } from '@chakra-ui/react'

// Components
import NftCard from '../../UI/NftCard/NftCard'

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
  {
    id: '6',
    name: 'A brush with arts',
    creator: 'Dang dough',
    currendtBid: '0.001',
  },
  {
    id: '7',
    name: 'A brush with arts',
    creator: 'Dang dough',
    currendtBid: '0.001',
  },
  {
    id: '8',
    name: 'A brush with arts',
    creator: 'Dang dough',
    currendtBid: '0.001',
  },
]

const ExploreNft = () => {
  const { colorMode } = useColorModeStore()

  return (
    <Box className={styles['explore-wrapper']}>
      <Box className={styles['main-light']}>
        <VStack className={styles['info-light']}>
          <Text className={styles[`title-${colorMode}`]}>Explore NFT Art</Text>
          <Text className={styles.desc}>
            Buy and sell NFTs from the worlds top artists
          </Text>
        </VStack>
        <Button className={styles[`btn-${colorMode}`]}>Explore More</Button>
      </Box>
      <HStack className={styles[`filter-btn-${colorMode}`]} mb="48px" gap={4}>
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
  return <Button className={styles[`filter-btn-${colorMode}`]}>{category as any}</Button>
}
