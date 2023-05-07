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

  const signin_class = colorMode === 'dark' ? 'signin-btn-dark' : 'signin-btn-light'

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', colorMode)
  }, [colorMode])

  function toggleColorMode() {
    setColorMode(colorMode === 'light' ? 'dark' : 'light')
  }

  return (
    <Box className="nav-bar-content" id="top">
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
          <InputGroup className={`search-box-${colorMode}`}>
            <InputRightElement>
              <SearchIcon />
            </InputRightElement>
            <Input placeholder="search" className={`search-box-${colorMode}`} />
          </InputGroup>
          TODO:
          <Switch isChecked={isDark} onChange={toggleColorMode} />
          <HStack>
            <Link to="/signin">
              <Button variant="ghost" className={signin_class}>
                Sign In
              </Button>
            </Link>
            <Link to="connect-wallet">
              <Button className="wallet-btn">Connect wallet</Button>
            </Link>
          </HStack>
        </HStack>
      </HStack>
    </Box>
  )
}

export default NavBar
