import styles from './styles.module.css'
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  Image,
  Text,
  VStack,
  HStack,
  Avatar,
} from '@chakra-ui/react'

import useColorModeStore from '../../../store/colorModeStore'

interface INFT {
  id: string
  name: string
  creator: string
  currentBid: string
}
const NftCard = ({ id, name, creator, currentBid }: INFT) => {
  const { colorMode } = useColorModeStore()

  const bgColor = colorMode === 'dark' ? '#1f2020' : '#F8F8F8'

  return (
    <Card className={styles[`card-wrapper-${colorMode}`]} bg={bgColor}>
      <CardHeader>
        <Image src="./image.png" w="285px" h="300px" />
      </CardHeader>
      <CardBody className={styles['card-content']}>
        <VStack>
          <Text className={styles.name}>{name}</Text>
          <HStack>
            <Avatar />
            <VStack className={styles[`creator-rights-${colorMode}`]}>
              <Text>Creator</Text>
              <Text>{creator}</Text>
            </VStack>
          </HStack>
          <Box>
            <Text>Current Bid:</Text>
            <Text>0.001 ETH (99.00$)</Text>
          </Box>
        </VStack>
      </CardBody>
    </Card>
  )
}

export default NftCard
