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

  var update
  var i = 0;
  // Obtém a data/hora atual
var Data = new Date();

// Guarda cada pedaço em uma variável
var dia     = Data.getDate();           // 1-31
var dia_sem = Data.getDay();            // 0-6 (zero=domingo)
var mes     = Data.getMonth();          // 0-11 (zero=janeiro)
var ano4    = Data.getFullYear();       // 4 dígitos
var hora    = Data.getHours();          // 0-23
var min     = Data.getMinutes();        // 0-59
var seg     = Data.getSeconds();        // 0-59
var mseg    = Data.getMilliseconds();   // 0-999
var tz      = Data.getTimezoneOffset(); // em minutos

// Formata a Data e a hora (note o mês + 1)
var str_Data = dia + '/' + (mes+1) + '/' + ano4;
var str_hora = hora + ':' + min + ':' + seg;




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
                    data_registro: str_Data + 'as' + str_hora
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
                    data_registro: str_Data + '-' + str_hora
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