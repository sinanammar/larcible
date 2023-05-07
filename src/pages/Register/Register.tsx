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
  Checkbox,
  FormErrorMessage,
} from '@chakra-ui/react'
import styles from './styles.module.css'
import { Form, Link } from 'react-router-dom'
import * as yup from 'yup'

// Hooks
import useColorModeStore from '../../store/colorModeStore'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'

// Interfaces
import { ISignup } from '../../interfaces/interfaces'

// API
import signupUser from '../../API/signupUser'

const signupSchema = yup.object().shape({
  firstname: yup.string().required('name is required'),
  email: yup.string().email().required(),
  password: yup.string().min(1).max(16).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required(),
})

const Register = () => {
  const { colorMode } = useColorModeStore()
  const [isChecked, setIsChecked] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignup>({
    resolver: yupResolver(signupSchema),
  })

  const handleCheckboxChange = () => {
    setIsChecked((prevState) => !prevState)
  }

  const onSubmit = async (userData: ISignup) => {
    if (!isChecked) return
    await signupUser(userData)
    // try {
    //   console.log('Success')
    // } catch (error) {
    //   console.log('Failed')
    // }
  }

  let boxH = 850
  if (Object.keys(errors).length !== 0) {
    boxH = 968
  }

  return (
    <Box className={styles[`wrapper-${colorMode}`]}>
      <Box className={styles[`main-box-${colorMode}`]} h={`${boxH}px`}>
        <VStack>
          <Text className={styles.title}>
            Sign Up to <Text className={styles.larcible}></Text>{' '}
          </Text>
          <Text className={styles['sub-title']}>
            Connect with one of your available wallet providers
          </Text>
          <HStack>
            <Divider w="200px" alignItems="baseline" borderColor="#3E3E3E" />
            <Text color="#767676">Signup with social</Text>
            <Divider w="200px" borderColor="#3E3E3E" />
          </HStack>
          <HStack className={styles[`btn-wrapper`]}>
            <Button className={styles[`action-btn`]} variant="unstyled">
              Google
            </Button>
            <Button className={styles[`action-btn`]} variant="unstyled">
              Facebook
            </Button>
          </HStack>
          <HStack pb="12px">
            <Divider w="200px" alignItems="baseline" borderColor="#3E3E3E" />
            <Text color="#767676">Or</Text>
            <Divider w="200px" borderColor="#3E3E3E" />
          </HStack>
        </VStack>

        <Box display="flex" justifyContent="center">
          <Form onSubmit={handleSubmit(onSubmit)} className={styles[`form-${colorMode}`]}>
            <FormControl id="firstname" isInvalid={!!errors.firstname} mb={6}>
              <FormLabel>First Name</FormLabel>
              <Input {...register('firstname')} className={styles.input} />
              {errors.firstname && (
                <FormErrorMessage>{errors.firstname.message}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl id="email" isInvalid={!!errors.email} mb={6}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                {...register('email')}
                className={styles.input}
                autoComplete="off"
              />
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

              <FormControl
                mb={6}
                id="confirmPassword"
                isInvalid={!!errors.confirmPassword}
              >
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="password"
                  {...register('confirmPassword')}
                  className={styles.input}
                />
                {errors.confirmPassword && (
                  <FormErrorMessage>Passwords must match</FormErrorMessage>
                )}
              </FormControl>
            </HStack>

            <Box display="flex" mt="12px">
              <Checkbox isChecked={isChecked} onChange={handleCheckboxChange} />
              <Text ml="12px">
                I agree to all terms and conditions and Privacy Policy
              </Text>
            </Box>

            <Button type="submit" variant="unstyled" className={styles['signup-btn']}>
              Create an Account
            </Button>
          </Form>
        </Box>

        <Box className={styles.redirect}>
          <Text>
            Already have an account?{' '}
            <Link to="/signin">
              <Text as="span" className={styles.redirect}>
                Log In
              </Text>{' '}
            </Link>{' '}
          </Text>
        </Box>
      </Box>
    </Box>
  )
}

export default Register
