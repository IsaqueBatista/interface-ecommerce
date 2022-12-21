import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import LoginImg from '../../assets/login-image.svg'
import Logo from '../../assets/logo.svg'
import {
  Container,
  LoginImage,
  ContainerItens,
  P,
  Input,
  ErrorMessage,
  Button,
  SignInLink
} from './styles'

function Login() {
  const schema = Yup.object().shape({
    email: Yup.string().email('Digite um e-mail válido').required('O e-mail é obrigatório'),
    password: Yup.string()
      .required('A senha é obrigatória')
      .min(6, 'A senha deve ter pelo menos 6 dígitos')
  })
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = (data) => console.log(data)

  return (
    <Container>
      <LoginImage src={LoginImg} alt="login-image" />
      <ContainerItens>
        <img src={Logo} alt="logo-dev-burger" />
        <h1>Login</h1>

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <P>Email</P>
          <Input type="email" {...register('email')} error={errors.email?.message} />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>

          <P>Senha</P>
          <Input type="password" {...register('password')} error={errors.password?.message} />
          <ErrorMessage>{errors.password?.message}</ErrorMessage>

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
