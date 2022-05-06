import React, { useEffect, useState } from 'react';
import {  } from 'react-native';
import { StyleSheet, View, FlatList } from "react-native"
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native"

import { FooterButton } from '../../../components/Controllers/FooterButton'  
import { Footer } from '../../Forms/SignInForm/styles';
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

import firestore from '@react-native-firebase/firestore'

import { Load } from '@components/Animations/Load';
import { Filters } from '@components/Controllers/Filters';
import { Order, OrderProps } from '@components/Controllers/Order';
import { Container, Header, Title, Counter } from './styles';

import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

export function Orders() {
  const [status, setStatus] = useState('open');
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<OrderProps[]>([]);

  useEffect(() => {
    setIsLoading(true)

    const subscribe = firestore()
    .collection('orders')
    .where('status', '==', status)
    .onSnapshot(querySnapshot => { 
      const data = querySnapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      }) as OrderProps[]

      setOrders(data)
      setIsLoading(false)

    })

    return () => subscribe()

  }, [status]);

  const html = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body style="text-align: center;">

  <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
      Controle de Estoque: Gestão Patrimonial | Controle de Fluxo 


      



    </h1>

  <table style="font-size: 12px; font-family: Helvetica Neue; font-weight: normal;" >
    <tr>

        <td>Equipamento</td>
        <td>Observação</td>
        <td>Nº do Lacre</td>
        <td>Controle de Estoque</td>
        <td>Operação</td>
        <td>Status</td>
        <td>Data e Hora do Registro</td>
    </tr>
    <tr>

        <td>${orders}</td>
        <td>${orders}</td>
        <td>${orders}</td>
        <td>${orders}</td>
        <td>${orders} </td>
        <td>${orders}</td>
        <td>${orders}</td>
    </tr>

</table>

${orders}
    <img
      src="https://d30j33t1r58ioz.cloudfront.net/static/guides/sdk.png"
      style="width: 90vw;" />
  </body>
</html>
`;

  const [selectedPrinter, setSelectedPrinter] = React.useState();

  const print = async () => {
    await Print.printAsync({
      html,
    });
  }

  const printToFile = async () => {
    const { uri } = await Print.printToFileAsync({
      html
    });
    console.log('O arquivo foi salvo em:', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  }

  return (



    <Container>



      <Filters onFilter={setStatus} />

      <Header>
        <Title>Equipamentos {status === 'open' ? 'aberto' : 'fechados'}</Title>
        <Counter>{orders.length}</Counter>
      </Header>

      {
        isLoading ?
          <Load />
          : <FlatList
            data={orders}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Order data={item} />}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
          />
      }

      <Footer>
        <FooterButton title="PDF" icon="archive" onPress={print} />
        <FooterButton title="Compartilhar" icon="share" onPress={printToFile}/>
      </Footer>
  <>
  <Text> </Text>
  </>
    </Container>
  );
}

/*

const styles = StyleSheet.create({
  container: {

    backgroundColor: "#e6dee6"
  }
});


<View style={styles.container}>
    <VictoryChart width={350} theme={VictoryTheme.material}>
      <VictoryBar data={orders} x="quarter" y="earnings" />
    </VictoryChart>
  </View>

  */