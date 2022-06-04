import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

import firestore from '@react-native-firebase/firestore'

import {
  ListItem,
  Button
} from '@rneui/themed';

import {
  Container,
  Status,
  Content,
  Header,
  Title,
  Label,
  Info,
  Footer,
  OrderStyleProps
} from './styles';
import { TouchableOpacity } from 'react-native';

import React from 'react';

export type OrderProps = OrderStyleProps & {
  id: string
  patrimonio: string
  equipment: string
  observacao: string
  lacre: string
  responsavelEstoque: string
  responsavelOperacao: string
  status: string
  data_registro: string
}

type Props = {
  data: OrderProps;
};

export function Order({ data }: Props) {
  const theme = useTheme();

  return (
    <Container>

      <Status status={data.status} />

      <Content  >

        <ListItem.Swipeable
        
          leftContent={(reset) => (
            <Button
              title="Fechar"
              onPress={() => {
                firestore()
                  .collection('orders')
                  .doc(data.id)
                  .update({
                    status: 'closed',
                    created_at: firestore.FieldValue.serverTimestamp()
                  })
                  .catch((error) => console.log(error))
              }}
              icon={{ name: 'lock', color: 'white' }}
              buttonStyle={{ minHeight: '100%', backgroundColor: '#6100FF', backfaceVisibility: 'hidden' }}
            />
          )}

          rightContent={(reset) => (
            <Button
              title="Abrir"
              onPress={() => {
                firestore()
                  .collection('orders')
                  .doc(data.id)
                  .update({
                    status: 'open',
                    created_at: firestore.FieldValue.serverTimestamp()
                  })
                  .catch((error) => console.log(error))
              }}
              icon={{ name: 'lock-open', color: 'white' }}
              buttonStyle={{ minHeight: '100%', backgroundColor: '#FF366A', backfaceVisibility: 'hidden'  }}
            />
          )}
        >
          <ListItem.Content>

            <TouchableOpacity >
              <Header>

                <Title> {data.patrimonio} </Title>
                <MaterialIcons
                  name={data.status === "open" ? "lock-open" : "check-circle"}
                  size={24}
                 
                  color={data.status === "open" ? theme.COLORS.SECONDARY : theme.COLORS.PRIMARY}
                />
              </Header>

              <Footer>
                <Info>
                  <MaterialIcons name="lock-open" size={18} color={theme.COLORS.SUBTEXT} />
                  <Label>
                     {data.status === "open" ? "Aberto" : "Fechado"}
                  </Label>
                </Info>

                <Info>
                  <MaterialIcons name="person" size={18} color={theme.COLORS.SUBTEXT} />
                  <Label  >
                    {data.responsavelEstoque}
                  </Label>
                </Info>

                <Info>
                  <MaterialIcons name="my-location" size={18} color={theme.COLORS.SUBTEXT} />
                  <Label>
                    {data.lacre}
                  </Label>
                </Info>
              </Footer>
            </TouchableOpacity>
          </ListItem.Content>
          <ListItem.Chevron  color="#FFFFFF" />
        </ListItem.Swipeable>
        
      </Content>

    </Container>

  );
}