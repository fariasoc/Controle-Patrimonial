import React, { useEffect, useState } from 'react';
import { useTheme } from 'styled-components/native';

import { Filter } from '@components/Controllers/Filter';
import { Container, Title, Options } from './styles';

import firestore from '@react-native-firebase/firestore';
import { Order, OrderProps } from '@components/Controllers/Order'
import { FlatList } from 'react-native';

type Props = {
  onFilter: (status: string) => void;
}

export function Filters({ onFilter }: Props) {
  const theme = useTheme();
 
  return (
    <Container>
      <Title>Filtrar</Title>
      
      <Options>
        <Filter
          title="Todos"
          backgroundColor={theme.COLORS.BLUE}
          onPress={() => (onFilter('open'))
          
          }

        />
        <Filter
          title="Abertos"
          backgroundColor={theme.COLORS.SECONDARY}
          onPress={() => onFilter('open')}
        />

        <Filter
          title="Fechados"
          backgroundColor={theme.COLORS.PRIMARY}
          onPress={() => onFilter('closed')}
        />
      </Options>
    </Container>
  );
}

function setIsLoading(arg0: boolean) {
  throw new Error('Function not implemented.');
}
