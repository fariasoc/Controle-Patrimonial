import React from 'react';

import auth from '@react-native-firebase/auth'

import { LogoutButton } from '@components/Controllers/LogoutButton';
import { Container, Greeting, Title, SubTitle } from './styles';

import Ionicons from '@expo/vector-icons/Ionicons';

import {
  Text,
  ListItem,
  Avatar,
  Icon,
  Badge,
  ListItemProps,
  Button,
  Switch,

} from '@rneui/themed';


export function Header() {
  function handleSignOut() {

    auth().signOut()

  }

  return (
    <Container>
      <Greeting>
        <Title>Controle Patrimonial</Title>
        <SubTitle> Tanques | Linhas de Carregamento | Balanças </SubTitle>
        
      </Greeting>
      
      <LogoutButton onPress={handleSignOut} />
      
    </Container>
  );
}