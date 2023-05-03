import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { Box, IconButton } from '@chakra-ui/react'
import styles from './styles.module.css'
import useColorModeStore from '../../../store/colorModeStore'

const ArrowButtons = () => {
  const { colorMode } = useColorModeStore()
  return (
    <Box>
      <IconButton
        aria-label="left-arrow"
        icon={<ArrowBackIcon />}
        className={styles[`arrow-nav-btn-${colorMode}`]}
      />
      <IconButton
        aria-label="right-arrow"
        icon={<ArrowForwardIcon />}
        className={styles[`arrow-nav-btn-${colorMode}`]}
      />
    </Box>
  )
}

export default ArrowButtons
