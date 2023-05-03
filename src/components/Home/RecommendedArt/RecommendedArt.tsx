import { Box, VStack, Text, HStack } from '@chakra-ui/react'
import styles from './styles.module.css'
import useColorModeStore from '../../../store/colorModeStore'

import ArrowButtons from '../../UI/ArrowButtons/ArrowButtons'
import NftCard from '../../UI/NftCard/NftCard'

const RecommendedArt = () => {
  const { colorMode } = useColorModeStore()
  return (
    <Box className={styles[`backgroud-box-${colorMode}`]}>
      <Box className={styles.main}>
        <VStack>
          <Text className={styles[`title-${colorMode}`]}>Recommended Art</Text>
          <Text className={styles[`desc-${colorMode}`]}>
            Buy and sell NFTs from the worlds top artists
          </Text>
        </VStack>
        <ArrowButtons />
      </Box>
      <HStack gap={4} justifyContent="space-evenly">
        <NftCard id="1" name="A brush with arts" creator="sinan" currentBid="0.33" />
        <NftCard id="1" name="A brush with arts" creator="sinan" currentBid="0.33" />
        <NftCard id="1" name="A brush with arts" creator="sinan" currentBid="0.33" />
        <NftCard id="1" name="A brush with arts" creator="sinan" currentBid="0.33" />
      </HStack>
    </Box>
  )
}

export default RecommendedArt
