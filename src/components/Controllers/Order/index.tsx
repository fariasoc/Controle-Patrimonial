import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

import firestore from '@react-native-firebase/firestore'

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

export type OrderProps = OrderStyleProps & {
  id: string;
  patrimony: string;
  equipment: string;
  description: string;
  lacre: string;
  responsavelEstoque: string;
  responsavelOperacao: string;
  status: string;
  created_at: string;
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

            <TouchableOpacity onPress={() => {
              firestore()
                .collection('orders')
                .doc(data.id)
                .update({
                  status: 'closed',
                  created_at: firestore.FieldValue.serverTimestamp()
                })
                .catch((error) => console.log(error))
            }} >
              <Header>

                <Title> {data.patrimony} </Title>
                <MaterialIcons
                  name={data.status === "open" ? "lock-open" : "check-circle"}
                  size={24}
                  color={data.status === "open" ? theme.COLORS.SECONDARY : theme.COLORS.PRIMARY}
                />
              </Header>

              <Footer>
                <Info>
                  <MaterialIcons name="lock-open" size={16} color={theme.COLORS.SUBTEXT} />
                  <Label>
                    {data.status}
                  </Label>
                </Info>

                <Info>
                  <MaterialIcons name="person" size={16} color={theme.COLORS.SUBTEXT} />
                  <Label  >
                    {data.responsavelEstoque}
                  </Label>
                </Info>

                <Info>
                  <MaterialIcons name="my-location" size={16} color={theme.COLORS.SUBTEXT} />
                  <Label>
                    {data.lacre}
                  </Label>
                </Info>
              </Footer>
            </TouchableOpacity>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem.Swipeable>
        
      </Content>
    </Container>
  );
}

/* 

<ListItem.Title>Hello Swiper</ListItem.Title>

import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

import firestore from '@react-native-firebase/firestore'

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
import { Alert,  TouchableOpacity } from 'react-native';




              export type OrderProps = OrderStyleProps & {
                id: string;
                patrimony: string;
                equipment: string;
                description: string;
                lacre: string;
                responsavelEstoque: string;
                responsavelOperacao: string;
                status: string;
                created_at: string;
              }
              
              type Props = {
                data: OrderProps;
              };
              
              function handleUpdateOrder({data}:Props) {
                
              
                firestore()
                .collection('orders')
                .doc(data.id)
                .update({
                  status: 'closed',
                  created_at: firestore.FieldValue.serverTimestamp()
                })
                .then(() => Alert.alert("Atualizado", "Documento atualizado!") )
                .catch((error) => console.log(error))
                
              }
              
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
                            onPress={() => reset()}
                            icon={{ name: 'lock', color: 'white' }}
                            buttonStyle={{ minHeight: '100%' }}
                          />
                        )}
                        rightContent={(reset) => (
                          <Button
                            title="Abrir"
                            onPress={() => reset()}
                            icon={{ name: 'lock-open', color: 'white' }}
                            buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
                          />
                        )}
                      >
                        <Icon name="touch-app" />
                        <ListItem.Content>
                          <ListItem.Title>Hello Swiper</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron />
                      </ListItem.Swipeable>
              
              
                      <TouchableOpacity onPress={() => { 
              
                          
              
                          firestore()
                          .collection('orders')
                          .doc(data.id)
                          .update({
                            status: 'closed',
                            created_at: firestore.FieldValue.serverTimestamp()
                          })
                          .catch((error) => console.log(error))
                      }} >
                      <Header>
              
              
              
                        <Title> {data.patrimony} </Title>
                        <MaterialIcons
                          name={data.status === "open" ? "lock-open" : "check-circle"}
                          size={24}
                          color={data.status === "open" ? theme.COLORS.SECONDARY : theme.COLORS.PRIMARY}
                        />
                      </Header>
              
                      <Footer>
                        <Info>
                          <MaterialIcons name="lock-open" size={16} color={theme.COLORS.SUBTEXT} />
                          <Label>
                          {data.status}
                          </Label>
                        </Info>
              
                        <Info>
                          <MaterialIcons name="person" size={16} color={theme.COLORS.SUBTEXT} />
                          <Label  >
              
                          {data.id}
                          </Label>
                        </Info>
              
                        <Info>
                          <MaterialIcons name="my-location" size={16} color={theme.COLORS.SUBTEXT} />
                          <Label>
                          {data.lacre}
                          </Label>
                        </Info>
                      </Footer>
                      </TouchableOpacity>
                    </Content>
                  </Container>
                );
              }

*/
