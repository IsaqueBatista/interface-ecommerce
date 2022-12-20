import React from 'react'
import { useForm } from 'react-hook-form'

import LoginImg from '../../assets/login-image.svg'
import Logo from '../../assets/logo.svg'
import { Container, LoginImage, ContainerItens, P, Input, Button, SignInLink } from './styles'

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const onSubmit = (data) => console.log(data)

  return (
    <Container>
      <LoginImage src={LoginImg} alt="login-image" />
      <ContainerItens>
        <img src={Logo} alt="logo-dev-burger" />
        <h1>Login</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <P>Email</P>
          <Input type="email" {...register('email')} />

          <P>Senha</P>
          <Input type="password" {...register('password')} />

          <Button type="submit">Sign In</Button>
        </form>
        <SignInLink>
          Não possui conta? <a href="/register">Sign Up</a>
        </SignInLink>
      </ContainerItens>
    </Container>
  )
}
export default Login
