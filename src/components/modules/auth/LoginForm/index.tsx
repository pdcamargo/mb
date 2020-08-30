import React, { useState } from 'react'

import {
  Box,
  Heading,
  Link,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Flex,
  Alert,
  AlertIcon
} from '@chakra-ui/core'

import { useAuth } from '@/contexts/auth/AuthContainer'

import { LoginFormType } from './types'

const LoginForm: React.FC<LoginFormType> = () => {
  const { login, isLoading, error } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(event.target.value)

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value)

  const handleSubmit = () => !isLoading && login(username, password)

  return (
    <Box width="100%" paddingX={16}>
      <Heading size="lg" color="gray.700" textAlign="center" marginBottom={3}>
        Entrar
      </Heading>
      <Heading size="sm" color="gray.500" textAlign="center">
        ou{' '}
        <Link href="#" color="blue.500">
          Criar Uma Conta
        </Link>
      </Heading>

      <Alert status="error" variant="left-accent" marginTop={12}>
        <AlertIcon />
        {error?.message}
      </Alert>

      <Box marginTop={8}>
        <FormControl isInvalid={false}>
          <FormLabel htmlFor="username">Email or Username</FormLabel>
          <Input
            variant="filled"
            size="lg"
            name="username"
            placeholder="username"
            value={username}
            onChange={handleUsernameChange}
          />
          <FormErrorMessage>Erro meu brother</FormErrorMessage>
        </FormControl>

        <FormControl marginTop={8}>
          <FormLabel htmlFor="password">Senha</FormLabel>
          <Input
            variant="filled"
            size="lg"
            name="password"
            placeholder="••••••"
            value={password}
            onChange={handlePasswordChange}
            type="password"
          />
          <FormErrorMessage>Erro meu brother</FormErrorMessage>
        </FormControl>
      </Box>

      <Flex justifyContent="center" marginTop={12}>
        <Button
          backgroundColor="gray.800"
          color="white"
          size="lg"
          _hover={{ backgroundColor: 'gray.900' }}
          onClick={handleSubmit}
          isLoading={isLoading}
        >
          Entrar
        </Button>
      </Flex>
    </Box>
  )
}

export default LoginForm
