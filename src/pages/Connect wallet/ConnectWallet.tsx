import { ArrowRightIcon } from '@chakra-ui/icons'
import { Box, HStack, Text, VStack } from '@chakra-ui/react'

const ConnectWallet = () => {
  return (
    <Box>
      <Text>Connect Wallet</Text>
      <Box>
        <Box w="80%" h="112px" border="1px solid gray" borderRadius={24}>
          <HStack justifyContent="space-between">
            <Box h="100%">Image</Box>
            <VStack w="85%" alignItems="flex-start">
              <Text>Metamask</Text>
              <Text>Antray to popular beleive, Lorem dunno ispum</Text>
            </VStack>

            <ArrowRightIcon />
          </HStack>
        </Box>
      </Box>
    </Box>
  )
}

export default ConnectWallet
