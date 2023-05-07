import styles from './styles.module.css'
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  VStack,
  Text,
  HStack,
  Avatar,
  Box,
  Button,
} from '@chakra-ui/react'

const ArticleCard = () => {
  return (
    <Card w="460px" h="560px" textAlign="start" cursor="pointer">
      <CardBody>
        <Image src="./article.png" w="464px" h="270px" />
      </CardBody>
      <CardFooter pt="0px">
        <VStack alignItems="flex-start">
          <Text className={styles.title}>title</Text>
          <HStack>
            <Text>Creator</Text>
            <Avatar />
            <Text>salavior</Text>
          </HStack>
          <Box>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit
              voluptas sapiente veniam quisquam nesciunt tempora sequi ullam facere
              facilis eveniet aut a officia dolor corrupti sint voluptates.
            </Text>
          </Box>
          <Button>Read More</Button>
        </VStack>
      </CardFooter>
    </Card>
  )
}

export default ArticleCard
