import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { Box, IconButton } from '@chakra-ui/react'
import styles from './styles.module.css'
import useColorModeStore from '../../../store/colorModeStore'

const ArrowButtons = () => {
  const { colorMode } = useColorModeStore()
  let color
  colorMode === 'dark' ? (color = 'white') : (color = 'black')

  const btnStyles = {
    bg: 'balck',
    w: ' 48px',
    h: ' 48px',
    border: `1px solid ${color}`,
    borderRadius: '24px',
    ml: '16px',
    '&:hover': {
      bg: '#2571ea',
    },
  }

  return (
    <Box>
      <IconButton
        aria-label="left-arrow"
        icon={<ArrowBackIcon />}
        sx={btnStyles}
        className={styles[`arrow-nav-${colorMode}`]}
      />
      <IconButton
        aria-label="right-arrow"
        icon={<ArrowForwardIcon />}
        sx={btnStyles}
        className={styles[`arrow-nav-${colorMode}`]}
      />
    </Box>
  )
}

export default ArrowButtons
