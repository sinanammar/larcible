import {
  Box,
  HStack,
  VStack,
  Text,
  Image,
  InputGroup,
  Input,
  Button,
  InputRightElement,
} from '@chakra-ui/react'
import './styles-light.css'

const Footer = () => {
  return (
    <Box className="wrapper">
      <HStack className="first-row">
        <Text className="join-txt">Join our community</Text>
        <Text>
          Meet the known Origin team, artists and collectors for
          <br /> platform updates, annoucments, and more...
        </Text>
        <InputGroup className="sub-input">
          <Input placeholder="Email" />
          <Button className="sub-btn">Subscribe</Button>
        </InputGroup>
      </HStack>

      <HStack className="second-row">
        <VStack>
          <Box className="first-col">
            <Image src="./footer-logo.png" />
            <Text>
              Larcible - your gateway to a unique world of NFTs and digital collectibles.{' '}
              <br />
              Discover, buy, and sell exclusive NFTs and digital assets on Larcible.
            </Text>
          </Box>
        </VStack>
        <VStack>
          <Text className="main-title">Support</Text>
          <Text>Community</Text>
          <Text>Guidelines</Text>
          <Text>Chat with us</Text>
          <Text></Text>
        </VStack>
        <VStack>
          <Text className="main-title">Company</Text>
          <Text>About</Text>
          <Text>FAQ</Text>
          <Text>Marketplace</Text>
          <Text>Blog</Text>
        </VStack>
        <VStack>
          <Text className="main-title">Explore</Text>
          <Text>Art</Text>
          <Text>Collection</Text>
          <Text>Creator / Owner</Text>
          <Text>Contact Us</Text>
        </VStack>
      </HStack>
      <HStack className="rights" gap={6}>
        <Text>© 2023 Larcible. All Rights reserved</Text>
        <Text>Privacy Policy</Text>
        <Text>terms of service</Text>
      </HStack>
    </Box>
  )
}

export default Footer
