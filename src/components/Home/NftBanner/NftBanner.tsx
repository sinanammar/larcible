import styles from './styles.module.css'
// import './styles-dark.css'
import { SearchIcon } from '@chakra-ui/icons'

import { Box, VStack, Text, HStack, IconProps, Icon } from '@chakra-ui/react'

import useColorModeStore from '../../../store/colorModeStore'

const NftBanner = () => {
  const { colorMode } = useColorModeStore()

  return (
    <Box mb="90px">
      <VStack gap={24}>
        <VStack>
          <Text className={styles[`title-${colorMode}`]}>Create and sell Your NFTs</Text>
          <Text className={styles['sub-title']}>
            Buy and sell NFTs from the world's top artists
          </Text>
        </VStack>
        <HStack className={styles.content} gap={1}>
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
    <VStack className={styles['content-wrapper']} alignItems="flex-start">
      <Box className={styles['icon-wrapper']}>
        <Icon as={icon} className={styles['content-icon']} />
      </Box>
      <Text>{title}</Text>
      <Text className={styles['content-desc']}>{description}</Text>
    </VStack>
  )
}
