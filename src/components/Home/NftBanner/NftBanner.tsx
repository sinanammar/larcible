import './styles-light.css'
import './styles-dark.css'
import { SearchIcon } from '@chakra-ui/icons'

import { Box, VStack, Text, HStack, IconProps, Icon } from '@chakra-ui/react'

import useColorModeStore from '../../../store/colorModeStore'

const NftBanner = () => {
  const { colorMode } = useColorModeStore()

  const titleClass = colorMode === 'dark' ? 'title-dark' : 'title-light'
  return (
    <Box>
      <VStack gap={24}>
        <VStack>
          <Text className={titleClass}>Create and sell Your NFTs</Text>
          <Text className="sub-title">
            Buy and sell NFTs from the world's top artists
          </Text>
        </VStack>
        <HStack className="content" gap={1}>
          <Content
            title="Set Up your Wallet"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            icon={SearchIcon}
          />
          <Content
            title="Create Your Collection"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            icon={SearchIcon}
          />
          <Content
            title="Add Your NFT"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            icon={SearchIcon}
          />
          <Content
            title="List Them for Sale"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            icon={SearchIcon}
          />
        </HStack>
      </VStack>
    </Box>
  )
}

export default NftBanner

const Content = ({
  title,
  description,
  icon,
}: {
  title: string
  description: string
  icon: React.ElementType<IconProps>
}) => {
  return (
    <VStack className="content-wrapper">
      <Box className="icon-wrapper">
        <Icon as={icon} className="content-icon" />
      </Box>
      <Text>{title}</Text>
      <Text className="content-desc">{description}</Text>
    </VStack>
  )
}
