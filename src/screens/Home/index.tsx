import React from 'react';

import { Container } from './styles';
import { Header } from '@components/Layout/Header';
import { Orders } from '@components/Lists/Orders';
import { NewOrder } from '@components/Controllers/NewOrder';
import { FooterButton } from '@components/Controllers/FooterButton';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Text } from 'react-native';

import { Graficos } from '../Graficos'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Form, Title, Footer } from '../../components/Forms/SignInForm/styles';
import { Register } from '@screens/Register';

const Stack = createNativeStackNavigator();

export function Home() {
  
  const navigation = useNavigation();

  return (
    <Container>
      <Header />
      <Orders />
      <NewOrder />

      <Footer>
        <FooterButton title="Criar conta" icon="person-add" onPress={() => navigation.navigate('register')} />
        <FooterButton title="Teste" icon="person-add" onPress={() => navigation.navigate('graficos')} />
      </Footer>
      
      <TouchableOpacity onPress={() => navigation.navigate('graficos')}>
      <Text> Gráficos </Text>
      </TouchableOpacity>



    </Container>
  );
}