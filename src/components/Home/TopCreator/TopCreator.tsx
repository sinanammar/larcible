import { Box, HStack, VStack, Text, Avatar } from '@chakra-ui/react'
import styles from './styles.module.css'

import useColorModeStore from '../../../store/colorModeStore'

import { useEffect, useRef, useState } from 'react'
const TopCreator = () => {
  const { colorMode } = useColorModeStore()
  const containerRef = useRef<HTMLDivElement | null>(null)
  let scrollInterval: any

  useEffect(() => {
    const container = containerRef.current
    console.log(container?.clientWidth)

    if (!container) return

    const scrollWidth = container.scrollWidth
    let scrollPos = 0
    let direction = 'right'

    const startScrolling = () => {
      scrollInterval = setInterval(() => {
        if (direction === 'right') {
          scrollPos++
          if (scrollPos >= scrollWidth - container.clientWidth) {
            direction = 'left'
          }
        } else {
          scrollPos--
          if (scrollPos <= 0) {
            direction = 'right'
          }
        }
        container.scrollTo({ left: scrollPos, behavior: 'smooth' })
      }, 10)

      return () => clearInterval(scrollInterval)
    }

    const handleMouseEnter = () => {
      clearInterval(scrollInterval)
    }

    const handleMouseLeave = () => {
      startScrolling()
    }

    startScrolling()

    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <Box textAlign="center">
      <Text className={styles[`title-${colorMode}`]}> &#x1F4A5; Top Creators</Text>
      <Text className={styles[`sub-title-${colorMode}`]}>
        Buy and sell NFTs from the world's top artists
      </Text>
      <Box pb="88px" overflowX="auto" className={styles.container} ref={containerRef}>
        <VStack gap={10}>
          <HStack gap={39} pl="350px" className={styles.content}>
            <TopCreatorChip />
            <TopCreatorChip />
            <TopCreatorChip />
            <TopCreatorChip />
            <TopCreatorChip />
            <TopCreatorChip />
          </HStack>
          <HStack gap={39}>
            <TopCreatorChip />
            <TopCreatorChip />
            <TopCreatorChip />
            <TopCreatorChip />
            <TopCreatorChip />
            <TopCreatorChip />
            <TopCreatorChip />
            <TopCreatorChip />
          </HStack>
        </VStack>
      </Box>
    </Box>
  )
}

export default TopCreator

const TopCreatorChip = () => {
  const { colorMode } = useColorModeStore()
  return (
    <Box className={styles[`chip-wrapper-${colorMode}`]}>
      <HStack gap={2}>
        <Avatar />
        <VStack className={styles[`chip-data-${colorMode}`]}>
          <Text className={styles[`creator`]}>Benji Connell</Text>
          <Text>2.574 ETH</Text>
        </VStack>
      </HStack>
    </Box>
  )
}
