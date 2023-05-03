import styles from './styles.module.css'
import useColorModeStore from '../../../store/colorModeStore'
import { Box, VStack, Text, HStack } from '@chakra-ui/react'

// components
import ArrowButtons from '../../UI/ArrowButtons/ArrowButtons'
import TopCollectionCard from '../TopCollectionCard/TopCollectionCard'

const TopCollections = () => {
  const { colorMode } = useColorModeStore()

  return (
    <Box>
      <Box className={styles.headerWrapper}>
        <VStack>
          <Text className={styles[`title-${colorMode}`]}>Top Collections in 1 Day </Text>
          <Text className={styles[`desc-${colorMode}`]}>
            Buy and sell NFTs from the worlds top artists
          </Text>
        </VStack>
        <ArrowButtons />
      </Box>
      <HStack gap={4} justifyContent="space-between">
        <TopCollectionCard />
        <TopCollectionCard />
        <TopCollectionCard />
      </HStack>
    </Box>
  )
}

export default TopCollections
