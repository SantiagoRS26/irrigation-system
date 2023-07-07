import React, { useEffect, useState } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { signOut, getAuth } from '@firebase/auth'
import { Animated, View } from 'react-native'
import { getDatabase, ref, onValue, set } from "firebase/database"
import { State } from 'react-native-gesture-handler'
import { Text } from 'react-native-paper'

export default function Dashboard({ navigation }) {
  const db = getDatabase()
  const auth = getAuth()

  function signOutButton() {
    auth.signOut()
    navigation.reset({
      index: 0,
      routes: [{ name: 'StartScreen' }],
    })
  }

  const [humedad, setHumedad] = useState()
  const [humedadSuelo, setHumedadSuelo] = useState()
  const [temperatura, setTemperatura] = useState()
  const [animation, setAnimation] = useState(new Animated.Value(0))
  const [bomba, setBomba] = useState()

  const handleAnimation = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1000
    }).start(() => {
      Animated.timing(animation, {
        toValue: 0,
        duration: 1000
      }).start()
    })
  }

  const user = auth.currentUser
  const starCountRef = ref(db, 'UsersData/' + user.uid + '/Datos_sensores')

  useEffect(() => {
    onValue(starCountRef, (snapshot) => {
      setHumedad(snapshot.val().humedad)
      setHumedadSuelo(snapshot.val().humedad_suelo)
      setTemperatura(snapshot.val().temperatura)
      setBomba(snapshot.val().Estado_Bomba)
    })
  }, starCountRef)

  const activateBomba = () => {
    set(ref(db, 'UsersData/' + user.uid + '/Datos_sensores/Estado_Bomba'), 1)
    setTimeout(() => {
      set(ref(db, 'UsersData/' + user.uid + '/Datos_sensores/Estado_Bomba'), 0)
    }, 10000)
  }

  return (
    <Background className="flex gap-y-6">
      <Logo />
      <Header className="text-xl font-black">Bienvenido Nuevamente {user.name}!</Header>

      <View className="flex gap-y-4 justify-center items-center">
        <View className="p-5 border-2 rounded-full border-blue-700">
          <Animated.Text className="font-bold">Humedad: {humedad}</Animated.Text>
        </View>
        <View className="p-5 border-2 rounded-full border-blue-500">
          <Animated.Text className="font-bold">Humedad del suelo: {humedadSuelo}</Animated.Text>
        </View>
        <View className="p-5 border-2 rounded-full border-red-500">
          <Animated.Text className="font-bold">Temperatura: {temperatura}</Animated.Text>
        </View>
        <View className="p-5 border-2 rounded-full border-red-500">
          <Animated.Text className="font-bold">Bomba {bomba == 1 ? 'activada' : 'desactivada'}</Animated.Text>
        </View>
      </View>
      <Button
        className={'rounded-3xl'}
        loading={bomba === 1}
        disabled={bomba === 1}
        mode="outlined"
        onPress={activateBomba}
      >
       {bomba && bomba === 1 ? "Bomba Activada" : "Activar Bomba"}
      </Button>
      <Button
        className="rounded-3xl"
        mode="outlined"
        onPress={signOutButton}
      >
        Cerrar Sesión
      </Button>
    </Background>
  )
}
