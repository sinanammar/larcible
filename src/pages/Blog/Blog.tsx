import styles from './styles.module.css'
import { Box, Text, VStack } from '@chakra-ui/react'
import ArticleCard from '../../components/Blog/ArticleCard'
import { Link } from 'react-router-dom'

const Blog = () => {
  return (
    <Box>
      <VStack>
        <Text className={styles.title}>Welomce to NFT Blog</Text>
        <Text className={styles['sub-title']}>
          Buy and sell NFTs from the worlds to artists
        </Text>
      </VStack>
      <Link to="/blog-details/1">
        <ArticleCard />
      </Link>
    </Box>
  )
}

export default Blog
