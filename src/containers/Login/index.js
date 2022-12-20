import React from 'react'

import LoginImg from '../../assets/login-image.svg'
import Logo from '../../assets/logo.svg'
import { Container, LoginImage, ContainerItens, P, Input, Button, SignInLink } from './styles'

function Login() {
  return (
    <Container>
      <LoginImage src={LoginImg} alt="login-image" />
      <ContainerItens>
        <img src={Logo} alt="logo-dev-burger" />
        <h1>Login</h1>

        <P>Email</P>
        <Input />

        <P>Senha</P>
        <Input />

        <Button>Sign In</Button>
        <SignInLink>
          Não possui conta? <a href="/register">Sign Up</a>
        </SignInLink>
      </ContainerItens>
    </Container>
  )
}
export default Login
