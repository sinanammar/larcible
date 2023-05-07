import styles from './styles.module.css'
import { Box, Button, Grid, GridItem, HStack, Text, VStack } from '@chakra-ui/react'
import useColorModeStore from '../../../store/colorModeStore'

const Landing = () => {
  const { colorMode } = useColorModeStore()
  return (
    <Box className={styles[`landing-${colorMode}`]}>
      <HStack display="flex" flexDirection="column" alignItems="flex-start">
        <Text className={styles[`main-${colorMode}`]}>
          Discover the <Text className={styles.nft}></Text> <br /> for worldwide <br />{' '}
          creators.
        </Text>
        <Text className={styles[`sub-${colorMode}`]}>
          Buy and sell NFTs from the world's top artists
        </Text>
        <HStack gap={6} pt="32px">
          <Button className={styles['action-btn']}>Become A Creator</Button>
          <Button className={styles[`secondary-btn-${colorMode}`]}>Explore NFT</Button>
        </HStack>
      </HStack>

      <Box right={33} ml="120px" h="100%" w="40%"></Box>
    </Box>
    // <VStack>
    //   <Box w="100%" bg="gray.100" className={styles.t}>
    //     a
    //   </Box>
    //   <Box w="100%" h="400px" bg="gray.600" className={styles['middle-box']}>
    //     <Box bg="yellow" w="220px" h="300px">
    //       a
    //     </Box>
    //   </Box>

    //   <Box w="100%" bg="gray.300" className={styles.tb}>
    //     a
    //   </Box>
    // </VStack>
  )
}

export default Landing

{
  /* <Box className={styles[`landing-${colorMode}`]} bg="red">
<HStack display="flex" flexDirection="column" alignItems="flex-start">
  <Text className={styles[`main-${colorMode}`]}>
    Discover the <Text className={styles.nft}></Text> <br /> for worldwide <br />{' '}
    creators.
  </Text>
  <Text className={styles[`sub-${colorMode}`]}>
    Buy and sell NFTs from the world's top artists
  </Text>
  <HStack gap={6} pt="32px">
    <Button className={styles['action-btn']}>Become A Creator</Button>
    <Button className={styles[`secondary-btn-${colorMode}`]}>Explore NFT</Button>
  </HStack>
</HStack>

<Box right={33} ml="120px" h="100%" w="40%"></Box>
</Box> */
}
