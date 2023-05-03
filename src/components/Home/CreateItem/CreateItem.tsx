import './styles-light.css'
import './styles-dark.css'
import { Box, Button, Image, Text } from '@chakra-ui/react'
import useColorModeStore from '../../../store/colorModeStore'

const CreateItem = () => {
  const { colorMode } = useColorModeStore()

  const bannerTitle = colorMode === 'dark' ? 'banner-title-dark' : 'banner-title-light'
  return (
    <Box pt="90px">
      <Box className="image-wrapper">
        <Image src="./base.png" className="img" />
        <Box w="200px">
          <Text as="h1" className="banner-title-light">
            Create your NFT's & Sell <br /> Your NFT at one place
          </Text>
          <Text className={bannerTitle}>
            Lorem Ipsum is simply dummy text of the printing dummy text of
            <br /> and typesetting industry. Lorem Ipsum is simply dummy and
            <br /> industry. Lorem Ipsum is simply
          </Text>
          <Button className="create-btn">Create your item</Button>
        </Box>
      </Box>
    </Box>
  )
}

export default CreateItem

// TODO: Add the banner title and Description in one div with specified width
