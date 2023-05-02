import './styles-light.css'
import './styles-dark.css'
import {
  Box,
  Button,
  HStack,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Switch,
  Text,
} from '@chakra-ui/react'
import { SearchIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { Link, useLocation } from 'react-router-dom'

import useColorModeStore from '../../store/colorModeStore'
import { useEffect } from 'react'
import classnames from 'classnames'

const NavBar = () => {
  const location = useLocation()
  const currentUrl = location.pathname.slice(1)

  const { colorMode, setColorMode } = useColorModeStore()
  const isDark = colorMode === 'dark'

  const buttonClass = classnames('idle', {
    'idle-light': colorMode === 'light',
    'idle-dark': colorMode === 'dark',
  })

  const signInClass = colorMode === 'dark' ? 'signin-btn-dark' : 'signin-btn-light'

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', colorMode)
  }, [colorMode])

  function toggleColorMode() {
    setColorMode(colorMode === 'light' ? 'dark' : 'light')
  }

  return (
    <Box className="nav-bar-content">
      <HStack spacing={'64px'}>
        <Box className="logo">
          <Link to="/">
            <Image src={`./logo-${colorMode}.png`} />
          </Link>
        </Box>
        <HStack className="pages" spacing={'48px'}>
          <Link to="/" className={currentUrl === '' ? 'active' : 'idle'}>
            Home
          </Link>
          <Link
            to="/marketplace"
            className={currentUrl === 'marketplace' ? 'active' : 'idle'}
          >
            Marketplace
          </Link>
          <HStack>
            <Menu>
              <MenuButton>
                <HStack>
                  <Text>Community</Text>
                  <ChevronDownIcon className="community-icon" />
                </HStack>
              </MenuButton>
              <MenuList>
                <MenuItem>Twitter</MenuItem>
                <MenuItem>Telegram</MenuItem>
                <MenuItem>WhatsApp</MenuItem>
                <MenuItem>Dashboard</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
          <Link to="/activity" className={currentUrl === 'activity' ? 'active' : 'idle'}>
            Activity
          </Link>
          <Link to="/blog" className={currentUrl === 'blog' ? 'active' : 'idle'}>
            Blog
          </Link>
        </HStack>
        <HStack spacing={'64px'}>
          <InputGroup className="search-box">
            <InputRightElement>
              <SearchIcon />
            </InputRightElement>
            <Input placeholder="search" />
          </InputGroup>
          TODO:
          <Switch isChecked={isDark} onChange={toggleColorMode} />
          <HStack>
            <Button variant="ghost" className={signInClass}>
              Sign In
            </Button>
            <Button className="wallet-btn">Connect wallet</Button>
          </HStack>
        </HStack>
      </HStack>
    </Box>
  )
}

export default NavBar
