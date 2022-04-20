import React from 'react';

import { Container } from './styles';
import { Header } from '@components/Layout/Header';
import { Orders } from '@components/Lists/Orders';
import { NewOrder } from '@components/Controllers/NewOrder';
import { Graficos } from '@screens/Graficos';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Text } from 'react-native';

export function Home() {
  const navigation = useNavigation();
    return (
    <Container>
      <Header />
      <Orders />
      <NewOrder />

      <Graficos />

      <TouchableOpacity onPress={() => navigation.navigate('graficos')} >

        <Text>

        </Text>

      </TouchableOpacity>

    </Container>
  );
}