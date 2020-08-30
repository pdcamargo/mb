import React, { useEffect } from 'react'

import { Grid, Flex, Box } from '@chakra-ui/core'

import freelancerBgUrl from '@/assets/bg/freelancer.png'
import MyBriefLogo from '@/assets/mybrief.svg'
import LoginForm from '@/components/modules/auth/LoginForm'
import { useAuth } from '@/contexts/auth/AuthContainer'

const Freelancer: React.FC = () => {
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      console.log('User already authenticated')
    }
  }, [])

  return (
    <Grid
      as="main"
      height="100vh"
      templateColumns="1fr 480px"
      templateRows="100fr"
      templateAreas="
        'wallpaper form'
      "
    >
      <Flex
        gridArea="form"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box width="120px" marginBottom={12}>
          <MyBriefLogo />
        </Box>

        <LoginForm />
      </Flex>
      <Flex
        gridArea="wallpaper"
        backgroundColor="orange.300"
        backgroundImage={`url(${freelancerBgUrl})`}
        backgroundSize="cover"
      ></Flex>
    </Grid>
  )
}

export default Freelancer
