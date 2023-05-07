import styles from './styles.module.css'
import {
  Box,
  Grid,
  GridItem,
  Text,
  VStack,
  Image,
  HStack,
  Avatar,
} from '@chakra-ui/react'

import { useParams } from 'react-router-dom'

const BlogDetails = () => {
  const { articleId } = useParams()
  console.log(articleId)
  return (
    <Box>
      <Text className={styles.title}>Blog Details</Text>
      <Text className={styles['sub-title']}>
        Buy and sell NFTs from the worlds to artists
      </Text>
      <Grid templateColumns="repeat(4, 1fr)">
        <GridItem colSpan={3}>
          <VStack alignItems="flex-start">
            <Box
              backgroundImage="./article.png"
              w="90%"
              h="522px"
              objectFit="cover"
              backgroundSize="cover"
              backgroundRepeat="no-repeat"
            ></Box>
            <Text>The next big trned in marketplace in the world</Text>
            <HStack>
              <Box display="flex">
                <Text>Writen by</Text>
                <Avatar />
                <Text>Robert Fox</Text>
              </Box>

              <Box>
                <Text>Date: Mar 5, 2023</Text>
                <Text>8min read</Text>
              </Box>
            </HStack>
            <Box w="90%">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the
              1500s, when an unknown printer took a galley of type and scrambled it to
              make a type specimen book. It has survived not only five centuries, but also
              the leap into electronic typesetting, remaining essentially unchanged. It
              was popularised in the 1960s with the release of Letraset sheets containing
              Lorem Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is
              simply dummy text of the printing and typesetting industry. Lorem Ipsum has
              been the industry's standard dummy text ever since the 1500s, when an
              unknown printer took a galley of type and scrambled it to make a type
              specimen book. It has survived not only five centuries, but also the leap
              into electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets containing
              Lorem Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of The leap into electronic
              typesetting, remaining essentially unchanged. It was popularised in the
              1960s with the release of Letraset sheets containing Lorem Ipsum passages,
              and more recently with desktop publishing software like Aldus PageMaker
              including versions of Lorem Ipsum. Lorem Ipsum
            </Box>
          </VStack>
        </GridItem>
        <GridItem colSpan={1}>Recent Posts</GridItem>
      </Grid>
    </Box>
  )
}

export default BlogDetails
