import React from 'react';

import { useNavigation } from '@react-navigation/native';

import { Container } from './styles';
import { Header } from '@components/Layout/Header';
import { Orders } from '@components/Lists/Orders';
import { NewOrder } from '@components/Controllers/NewOrder';
import { Button } from 'react-native';

import { KeyboardAvoidingView, Platform } from 'react-native';

import { useTheme } from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';

import registerAnimation from '@assets/animations/register.json';

import { Lottie } from '@components/Animations/Lottie';

import { AccountForm } from '@components/Forms/AccountForm';
import { BackButton, BackText } from '@screens/Register/styles';



export function Graficos() {

  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <Container>

      <BackButton onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color={theme.COLORS.PRIMARY} />
            <BackText> Oie </BackText>
          </BackButton>
    </Container>
  );
}

export default Graficos;