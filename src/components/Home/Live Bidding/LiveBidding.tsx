import styles from './styles.module.css'
import useColorModeStore from '../../../store/colorModeStore'
import {
  Box,
  VStack,
  Text,
  HStack,
  Card,
  Avatar,
  Button,
  CardBody,
  CardFooter,
  Image,
} from '@chakra-ui/react'

const LiveBidding = () => {
  const { colorMode } = useColorModeStore()
  return (
    <Box className={styles[`wrapper-${colorMode}`]}>
      <VStack>
        <Text className={styles[`main-title-${colorMode}`]}>Live ART Bidding</Text>
        <Text className={styles[`sub-title-${colorMode}`]}>
          Buy and sell NFTs from the world's top artists
        </Text>
        <HStack gap={24} pt="32px" justifyContent="space-around">
          <Card className={styles[`nft-card-${colorMode}`]}>
            <CardBody backgroundImage={'./image.png'} objectFit="cover"></CardBody>
            <CardFooter>
              <HStack className={styles[`card-footer`]}>
                <VStack alignItems="flex-start">
                  <Text fontWeight={500}>Current Bid:</Text>
                  <Text fontWeight={500}>4.08 ETH ($2,0243.00)</Text>
                </VStack>
                <Button className={styles['bid-btn']}>Place a Bid</Button>
              </HStack>
            </CardFooter>
          </Card>
          <VStack alignItems="flex-start">
            <Box className={styles[`time-left-${colorMode}`]}>
              <Text>Remaining Time: 12H : 9M 45S</Text>
            </Box>
            <Text fontSize="32px" fontWeight={600}>
              A Brush with arts
            </Text>
            <Text>mar 20 2020, 10:00 pm</Text>
            <Box w="380px">
              <Text>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
                inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
                fugit,
              </Text>
            </Box>
            <HStack className={styles.credits}>
              <Box display="flex">
                <Avatar />
                <VStack alignItems="flex-start" pl="12px">
                  <Text fontWeight={500} fontSize="20px">
                    Hanift Gunduz
                  </Text>
                  <Text>Owner</Text>
                </VStack>
              </Box>
              <Button className={styles[`explore-btn-${colorMode}`]}>Explore Work</Button>
            </HStack>
          </VStack>
        </HStack>
      </VStack>
    </Box>
  )
}

export default LiveBidding
