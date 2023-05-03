import './styles-dark.css'
import './styles-light.css'
import useColorModeStore from '../../../store/colorModeStore'
import { Card, CardBody, HStack, Image, Text } from '@chakra-ui/react'

const TopCollectionCard = () => {
  const { colorMode } = useColorModeStore()

  const collectionImg =
    colorMode === 'dark' ? 'collection-card-dark' : 'collection-card-light'
  const cardInfo = colorMode === 'dark' ? 'card-info-dark' : 'card-info-light'
  const cardBody = colorMode === 'dark' ? 'card-body-dark' : 'card-body-light'

  const bgColor = colorMode === 'dark' ? '#1d1d1d' : ''

  return (
    <Card className={collectionImg} bg={bgColor}>
      <CardBody className={cardBody}>
        <Image className="collection-img-light" src="./pp.png" />
        <HStack className={cardInfo}>
          <Text size="20px" fontWeight={500}>
            @noOneKnows
          </Text>
          <Text>current price</Text>
        </HStack>
        <HStack className={cardInfo}>
          <Text>Total items: 8</Text>
          <Text>0.453 ETH</Text>
        </HStack>
      </CardBody>
    </Card>
  )
}

export default TopCollectionCard
// import './styles-dark.css'
// import './styles-light.css'
// import useColorModeStore from '../../../store/colorModeStore'
// import {
//   Box,
//   Card,
//   CardBody,
//   CardFooter,
//   HStack,
//   Image,
//   Text,
//   VStack,
// } from '@chakra-ui/react'

// const TopCollectionCard = () => {
//   const { colorMode } = useColorModeStore()

//   const collectionImg =
//     colorMode === 'dark' ? 'collection-card-dark' : 'collection-card-light'
//   const cardInfo = colorMode === 'dark' ? 'card-info-dark' : 'card-info-light'
//   return (
//     <Card className={collectionImg}>
//       <CardBody>
//         <Image className="collection-img-light" src="./pp.png" />
//       </CardBody>
//       <CardFooter className={cardInfo}>
//         <VStack>
//           <Text>@noOneKnows</Text>
//           <Text>Total items: 8</Text>
//         </VStack>
//         <HStack className="test">
//           <Text>current price</Text>
//           <Text>33</Text>
//         </HStack>
//       </CardFooter>
//     </Card>
//   )
// }

// export default TopCollectionCard
