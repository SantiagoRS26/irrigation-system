import React, { useEffect } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import { getAuth } from 'firebase/auth'

export default function StartScreen({ navigation }) {

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user){
        navigation.navigate("Dashboard")
      }
    })
    return unsubscribe
  })

  return (
    <Background>
      <Logo />
      {/* <Header>AGROTEC</Header> */}
      <Paragraph>
        Bienvenido al sistema de riego 2023
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Iniciar Sesion
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        Registrarse
      </Button>
    </Background>
  )
}
