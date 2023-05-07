import styles from './styles.module.css'
import {
  Box,
  Text,
  VStack,
  HStack,
  Button,
  Divider,
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// Hooks
import { useForm } from 'react-hook-form'
import useColorModeStore from '../../store/colorModeStore'

import { Form, Link } from 'react-router-dom'

// Interfaces
import { ILogin } from '../../interfaces/interfaces'

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
})

const SignIn = () => {
  const { colorMode } = useColorModeStore()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: yupResolver(loginSchema),
  })

  const onSubmit = (userCredntials: ILogin) => {
    console.log(userCredntials)
  }

  let boxH = 820
  if (Object.keys(errors).length !== 0) {
    boxH = 860
  }

  return (
    <Box className={styles[`wrapper-${colorMode}`]}>
      <Box className={styles[`main-box-${colorMode}`]} h={`${boxH}px`}>
        <VStack>
          <Text className={styles.title}>
            Sign In to <Text className={styles.larcible}></Text>{' '}
          </Text>
          <Text className={styles['sub-title']}>
            Connect with one of your available wallet providers
          </Text>
          <HStack>
            <Divider w="200px" alignItems="baseline" borderColor="#3E3E3E" />
            <Text color="#767676">Login with social</Text>
            <Divider w="200px" borderColor="#3E3E3E" />
          </HStack>
          <HStack className={styles[`btn-wrapper`]}>
            <Button h="54px" className={styles[`action-btn`]} variant="unstyled">
              Google
            </Button>
            <Button h="54px" className={styles[`action-btn`]} variant="unstyled">
              Facebook
            </Button>
          </HStack>
          <HStack pb="36px">
            <Divider w="200px" alignItems="baseline" borderColor="#3E3E3E" />
            <Text color="#767676">Or login with email</Text>
            <Divider w="200px" borderColor="#3E3E3E" />
          </HStack>
        </VStack>

        <Box display="flex" justifyContent="center">
          <Form onSubmit={handleSubmit(onSubmit)} className={styles[`form-${colorMode}`]}>
            <FormControl id="email" isInvalid={!!errors.email} mb={6}>
              <FormLabel>Email</FormLabel>
              <Input type="email" {...register('email')} className={styles.input} />
              {errors.email && (
                <FormErrorMessage>{errors.email.message}</FormErrorMessage>
              )}
            </FormControl>

            <HStack alignItems="baseline">
              <FormControl id="password" isInvalid={!!errors.password} mb={6}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  {...register('password')}
                  className={styles.input}
                />
                {errors.password && (
                  <FormErrorMessage>
                    Password must be at least 8 characters
                  </FormErrorMessage>
                )}
              </FormControl>
            </HStack>

            <Button type="submit" variant="unstyled" className={styles['login-btn']}>
              Login
            </Button>
          </Form>
        </Box>
        <Box className={styles.redirect}>
          <Text>
            Don't have an account?{' '}
            <Link to="/signup">
              <Text as="span" className={styles.redirect}>
                Sign Up
              </Text>{' '}
            </Link>{' '}
          </Text>
        </Box>
      </Box>
    </Box>
  )
}

export default SignIn
