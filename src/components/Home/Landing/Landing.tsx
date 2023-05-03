import styles from './styles.module.css'
import { Box, Button, Grid, GridItem, HStack, Text } from '@chakra-ui/react'
import useColorModeStore from '../../../store/colorModeStore'

const Landing = () => {
  const { colorMode } = useColorModeStore()
  return (
    <Box className={styles[`landing-${colorMode}`]}>
      <HStack display="flex" flexDirection="column" alignItems="flex-start">
        <Text className={styles[`main-${colorMode}`]}>
          Discover the <Text className={styles.nft}>NFT</Text> <br /> for worldwide <br />{' '}
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
  )
}

export default Landing
// import styles from './styles.module.css'
// import { Box, Button, Grid, GridItem, HStack, Text } from '@chakra-ui/react'
// import useColorModeStore from '../../../store/colorModeStore'

// const Landing = () => {
//   const { colorMode } = useColorModeStore()
//   return (
//     <Box className={styles[`landing-${colorMode}`]} bg="blue.300">
//       <Grid templateColumns="repeat(8, 1fr)" bg="blue">
//         <GridItem colSpan={4}>
//           <Text className={styles[`main-${colorMode}`]}>
//             Discover the NFT <br /> for worldwide <br /> creators.
//           </Text>
//           <Text className={styles[`sub-${colorMode}`]}>
//             But and sell NFTs from the world's top artists
//           </Text>
//           <HStack gap={6} mt="32px">
//             <Button className={styles['action-btn']}>Become A Creator</Button>
//             <Button className={styles[`secondary-btn-${colorMode}`]}>Explore NFT</Button>
//           </HStack>
//         </GridItem>
//         <GridItem colSpan={4} bg="cyan"></GridItem>
//       </Grid>
//       <Box ml="120px" h="400px" bg="gray">
//         a
//       </Box>
//     </Box>
//   )
// }

// export default Landing
