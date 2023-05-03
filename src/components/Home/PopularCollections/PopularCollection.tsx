import styles from './styles.module.css'

import useColorModeStore from '../../../store/colorModeStore'
import { Box, VStack, Text, Image } from '@chakra-ui/react'

const PopularCollections = () => {
  const { colorMode } = useColorModeStore()

  const title = colorMode === 'dark' ? 'title-dark' : 'title-light'
  const desc = colorMode === 'dark' ? 'description-dark' : 'description-light'
  return (
    <Box>
      <VStack>
        <Text className={styles[`title-${colorMode}`]}>Popular Collections</Text>
        <Text className={styles.desc}>Buy and sell NFTs from the worlds top artists</Text>
      </VStack>
      <Box h="300px" bg="gray.400" fontSize="33px" borderRadius="14px">
        Collections Cards
      </Box>
    </Box>
  )
}

export default PopularCollections
