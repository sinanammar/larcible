import {
  Box,
  HStack,
  VStack,
  Text,
  Image,
  InputGroup,
  Input,
  Button,
} from '@chakra-ui/react'
import { ArrowUpIcon } from '@chakra-ui/icons'
import styles from './styles.module.css'

const Footer = () => {
  return (
    <Box className={styles.wrapper}>
      <HStack className={styles['first-row']}>
        <Text className={styles['join-txt']}>Join our community</Text>
        <Text>
          Meet the known Origin team, artists and collectors for
          <br /> platform updates, annoucments, and more...
        </Text>
        <InputGroup className={styles['sub-input']} w="320px">
          <Input placeholder="Email" />
          <Button className={styles['sub-btn']}>Subscribe</Button>
        </InputGroup>
      </HStack>

      <HStack className={styles['second-row']}>
        <VStack>
          <Box className={styles['first-col']}>
            <Image src="./footer-logo.png" />
            <Text>
              Larcible - your gateway to a unique world of NFTs and digital collectibles.{' '}
              <br />
              Discover, buy, and sell exclusive NFTs and digital assets on Larcible.
            </Text>
          </Box>
        </VStack>
        <VStack>
          <Text className={styles['main-title']}>Support</Text>
          <Text>Community</Text>
          <Text>Guidelines</Text>
          <Text>Chat with us</Text>
          <Text></Text>
        </VStack>
        <VStack>
          <Text className={styles['main-title']}>Company</Text>
          <Text>About</Text>
          <Text>FAQ</Text>
          <Text>Marketplace</Text>
          <Text>Blog</Text>
        </VStack>
        <VStack>
          <Text className={styles['main-title']}>Explore</Text>
          <Text>Art</Text>
          <Text>Collection</Text>
          <Text>Creator / Owner</Text>
          <Text>Contact Us</Text>
        </VStack>
      </HStack>
      <HStack className={styles['rights']}>
        <Box display="flex" justifyContent="space-between" w="550px">
          <Text>© 2023 Larcible. All Rights reserved</Text>
          <Text>Privacy Policy</Text>
          <Text>terms of service</Text>
        </Box>

        <Box className={styles['outer-box']}>
          <Box className={styles['arrow-up']}>
            <ArrowUpIcon />
          </Box>
        </Box>
      </HStack>
    </Box>
  )
}

export default Footer
