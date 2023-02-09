import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import Logo from '../../assets/logo.svg'
import RegisterImg from '../../assets/register-image.svg'
import Button from '../../components/Button'
import api from '../../services/api'
import * as S from './styles'

export default function Register() {
  const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    email: Yup.string().email('Digite um e-mail válido').required('O e-mail é obrigatório'),
    password: Yup.string()
      .required('A senha é obrigatória')
      .min(6, 'A senha deve ter pelo menos 6 dígitos'),
    confirmPassword: Yup.string()
      .required('Confirmar a senha é obrigatória')
      .oneOf([Yup.ref('password')], 'As senhas precisam ser iguais')
  })
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (clientData) => {
    try {
      const { status } = await api.post(
        'users',
        {
          name: clientData.name,
          email: clientData.email,
          password: clientData.password
        },
        { validateStatus: () => true }
      )

      if (status === 201 || status === 200) {
        toast.success('Cadastro realizado com sucesso')
      } else if (status === 409) {
        toast.error('E-mail já cadastrado! Faça login para continuar')
      } else {
        throw new Error()
      }
    } catch (err) {
      toast.error('Falha no sistema! Tente novamente')
    }
  }

  return (
    <S.Container>
      <S.RegisterImage src={RegisterImg} alt="register-image" />
      <S.ContainerItens>
        <img src={Logo} alt="logo-dev-burger" />
        <h1>Register</h1>

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <S.P error={errors.name?.message}>Name</S.P>
          <S.Input type="text" {...register('name')} error={errors.name?.message} />
          <S.ErrorMessage>{errors.name?.message}</S.ErrorMessage>

          <S.P error={errors.email?.message}>Email</S.P>
          <S.Input type="email" {...register('email')} error={errors.email?.message} />
          <S.ErrorMessage>{errors.email?.message}</S.ErrorMessage>

          <S.P error={errors.password?.message}>Senha</S.P>
          <S.Input type="password" {...register('password')} error={errors.password?.message} />
          <S.ErrorMessage>{errors.password?.message}</S.ErrorMessage>

          <S.P error={errors.confirmPassword?.message}>Confirmar Senha</S.P>
          <S.Input
            type="password"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
          />
          <S.ErrorMessage>{errors.confirmPassword?.message}</S.ErrorMessage>

          <Button type="submit" style={{ marginTop: 25, marginBottom: 25 }}>
            Sign Up
          </Button>
        </form>
        <S.SignInLink>
          Já possui conta?
          <Link to="/login">Sign In</Link>
        </S.SignInLink>
      </S.ContainerItens>
    </S.Container>
  )
}
