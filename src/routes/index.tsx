import React, { useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'

import { Home } from '@screens/Home';
import { Graficos } from '@screens/Graficos';
import { AuthRoutes } from './auth.routes';

const Stack = createNativeStackNavigator()

export function Routes() {

  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(setUser)

    return subscriber
  }, [])

  return ( 
    <NavigationContainer>

      {user ? <Home /> : <AuthRoutes /> }


    </NavigationContainer>
  );
}

/*
      {user ? [<Home /> , <Graficos />]  : <AuthRoutes /> }

      <Stack.Navigator initialRouteName="Home" > 
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Graficos" component={Graficos} />
      
      </Stack.Navigator>


{ user ? <Home /> : <AuthRoutes /> }
*/