import { Box, Grid, GridItem } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar/NavBar'
import Footer from '../components/Footer/Footer'

import useColorModeStore from '../store/colorModeStore'

const RootLayout = () => {
  const { colorMode } = useColorModeStore()

  const theme = colorMode === 'dark' ? 'black' : 'white'
  return (
    <Box>
      <Grid templateColumns="repeat(8, 1fr)">
        <GridItem colSpan={1} minH="100vh" bg={theme}></GridItem>
        <GridItem colSpan={6} minH="100vh" bg={theme}>
          <NavBar />
          <Outlet />
        </GridItem>
        <GridItem colSpan={1} minH="100vh" bg={theme}></GridItem>
      </Grid>
      <Grid templateColumns="repeat(8, 1fr)">
        <GridItem colSpan={1} bg={'black'}></GridItem>
        <GridItem colSpan={6} bg={'black'}>
          <Footer />
        </GridItem>
        <GridItem colSpan={1} bg={'black'}></GridItem>
      </Grid>
    </Box>
  )
}

export default RootLayout
