import React, { useEffect, useState } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { signOut, getAuth } from '@firebase/auth'
import { Animated } from 'react-native'
import { getDatabase, ref, onValue } from "firebase/database";
import { State } from 'react-native-gesture-handler'




export default function Dashboard({ navigation }) {
  const db = getDatabase();
  const auth = getAuth();



  function signOutButton() {
    auth.signOut();
    navigation.reset({
      index: 0,
      routes: [{ name: 'StartScreen' }],
    })
  }
  const [humedad, setHumedad] = useState();
  const [humedadSuelo, setHumedadSuelo] = useState();
  const [temperatura, setTemperatura] = useState();
  const [animation, setAnimation] = useState(new Animated.Value(0))


  const handleAnimation = () => {
    Animated.timing(animation, {
      toValue:1,
      duration: 1000
    }).start( () => {
      Animated.timing(animation,{
        toValue:0,
        duration: 1000
      }).start()
    })
  }

  const textInterpolation =  animation.interpolate({
    inputRange: [0, 1],
    outputRange:["#000000" , "#FF0000"]
  })

  const animatedStyle = {
    color: textInterpolation
  }

  const user = auth.currentUser;
  const starCountRef = ref(db, 'UsersData/' + user.uid + '/Datos_sensores');

  useEffect(() => {
    onValue(starCountRef, (snapshot) => {
      handleAnimation();
      setHumedad(snapshot.val().humedad);
      setHumedadSuelo(snapshot.val().humedad_suelo);
      setTemperatura(snapshot.val().temperatura);
    });
  }, State.name)


  return (
    <Background>
      <Logo />
      <Header>Empecemos</Header>
        <Animated.Text style={animatedStyle.color}>Humedad: {humedad}</Animated.Text>
        <Animated.Text>Humedad del suelo: {humedadSuelo}</Animated.Text>
        <Animated.Text>Temperatura: {temperatura}</Animated.Text>
        <Button
          mode="outlined"
          onPress={signOutButton}
        >
          Cerrar Sesion
        </Button>
    </Background>
  )
}
