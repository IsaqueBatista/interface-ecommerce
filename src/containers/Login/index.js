import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import LoginImg from '../../assets/login-image.svg'
import Logo from '../../assets/logo.svg'
import Button from '../../components/Button'
import { useUser } from '../../hooks/UserContext'
import api from '../../services/api'
import * as S from './styles'

function Login() {
  const { putUserData } = useUser()

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

  const onSubmit = async (clientData) => {
    const { data } = await toast.promise(
      api.post('sessions', {
        email: clientData.email,
        password: clientData.password
      }),
      {
        pending: 'Verificando seus dados',
        success: 'Seja bem-vindo(a)',
        error: 'Verifique seu e-mail e senha'
      }
    )
    putUserData(data)
  }

  return (
    <S.Container>
      <S.LoginImage src={LoginImg} alt="login-image" />
      <S.ContainerItens>
        <img src={Logo} alt="logo-dev-burger" />
        <h1>Login</h1>

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <S.P>Email</S.P>
          <S.Input type="email" {...register('email')} error={errors.email?.message} />
          <S.ErrorMessage>{errors.email?.message}</S.ErrorMessage>

          <S.P>Senha</S.P>
          <S.Input type="password" {...register('password')} error={errors.password?.message} />
          <S.ErrorMessage>{errors.password?.message}</S.ErrorMessage>

          <Button type="submit" style={{ marginTop: 75, marginBottom: 25 }}>
            Sign In
          </Button>
        </form>
        <S.SignInLink>
          Não possui conta? <Link to="/cadastro">Sign Up</Link>
        </S.SignInLink>
      </S.ContainerItens>
    </S.Container>
  )
}
export default Login
