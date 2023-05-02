import './styles-light.css'
import './styles-dark.css'
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

import useColorModeStore from '../../store/colorModeStore'

interface INFT {
  id: string
  name: string
  creator: string
  currentBid: string
}
const NftCard = ({ id, name, creator, currentBid }: INFT) => {
  const { colorMode } = useColorModeStore()

  const cardWrapper = colorMode === 'dark' ? 'card-wrapper-dark' : 'card-wrapper-light'
  const nftName = colorMode === 'dark' ? 'name-dark' : 'name-light'
  const creatorRights =
    colorMode === 'dark' ? 'creator-rights-dark' : 'creator-rights-light'

  const bgColor = colorMode === 'dark' ? '#1f2020' : '#F8F8F8'

  return (
    <Card className={cardWrapper} bg={bgColor}>
      <CardHeader>
        <Image src="./image.png" w="285px" h="300px" />
      </CardHeader>
      <CardBody className="card-content-light">
        <VStack>
          <Text className={nftName}>{name}</Text>
          <HStack>
            <Avatar />
            <VStack className={creatorRights}>
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
