import './App.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from 'react-router-dom'

import { Box, Button, Card, Text } from '@chakra-ui/react'

import RootLayout from './layouts/RootLayout'

// Pages
import Home from './pages/Home/Home'
import Marketplace from './pages/Marketplace/Marketplace'
import Activity from './pages/Activity/Activity'
import Blog from './pages/Blog/Blog'
import NotFound from './pages/NotFound'
import SignIn from './pages/SignIn/SignIn'
import Register from './pages/Register/Register'
import BlogDetails from './pages/Blog details/BlogDetails'
import ConnectWallet from './pages/Connect wallet/ConnectWallet'
import TermsOfservices from './pages/TermsOfservices/TermsOfservices'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="marketplace" element={<Marketplace />} />
      <Route path="activity" element={<Activity />} />
      <Route path="blog" element={<Blog />} />
      <Route path="blog-details/:articleId" element={<BlogDetails />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<Register />} />
      <Route path="connect-wallet" element={<ConnectWallet />} />
      <Route path="terms-of-services" element={<TermsOfservices />} />
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
)

const App = () => {
  return <RouterProvider router={router} />
}

export default App

// TODO: add code for CollectionCard Component
