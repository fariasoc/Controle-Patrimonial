import React, { useEffect, useState } from 'react'
import { FlatList } from "react-native"
import { FooterButton } from '../../../components/Controllers/FooterButton'
import { SharedFooter } from '../../Forms/SignInForm/styles'

import firestore from '@react-native-firebase/firestore'

import { Load } from '@components/Animations/Load'
import { Filters } from '@components/Controllers/Filters'
import { Order, OrderProps } from '@components/Controllers/Order'
import { Container, Header, Title, Counter } from './styles'

import * as Print from 'expo-print'
import { shareAsync } from 'expo-sharing'

export function Orders() {
  const [status, setStatus] = useState('open');
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<OrderProps[]>([]);
  const [equipments, setEquipments] = useState<OrderProps[]>([]);
  var equipamentos: string
  var stringHTML = createPDF()


  var filtroAtivo = null;

  if (status === 'Todos') {
    filtroAtivo = 'Todos'

  
  }

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

  useEffect(() => {
    setIsLoading(true)

    const subscribe = firestore()
      .collection('orders')
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          }
        }) as OrderProps[]

        setEquipments(data)
        setIsLoading(false)

      })

    return () => subscribe()

  }, [status]);

  function createPDF(){
    let i = 0; 

    while ( i < equipments.length){
      equipamentos = 
                     '<tr>'+ 
                     '<td style="box-shadow: 0px 0px 9px 0px rgba(0,0,0,0.1);" >'+equipments[i].patrimonio+'</td>' + 
                     '<td style="box-shadow: 0px 0px 9px 0px rgba(0,0,0,0.1);" >'+equipments[i].observacao+'</td>' + 
                     '<td style="box-shadow: 0px 0px 9px 0px rgba(0,0,0,0.1);" >'+equipments[i].lacre+'</td>' + 
                     '<td style="box-shadow: 0px 0px 9px 0px rgba(0,0,0,0.1);" >'+equipments[i].responsavelEstoque+'</td>' + 
                     '<td style="box-shadow: 0px 0px 9px 0px rgba(0,0,0,0.1);" >'+equipments[i].responsavelOperacao+'</td>' + 
                     '<td style="box-shadow: 0px 0px 9px 0px rgba(0,0,0,0.1);" >'+ translateStateFilterPDF(equipments[i].status) +'</td>' + 
                     '<td style="box-shadow: 0px 0px 9px 0px rgba(0,0,0,0.1);" >'+equipments[i].data_registro+'</td>' + 
                     '<td style="color:white">'+equipamentos+'</td>'
                     '</tr>'

                     i++
    }
    return equipamentos
  }

  console.log(stringHTML);

  // Obtém a data/hora atual
var data = new Date();

// Guarda cada pedaço em uma variável
var dia     = data.getDate();           // 1-31
var dia_sem = data.getDay();            // 0-6 (zero=domingo)
var mes     = data.getMonth();          // 0-11 (zero=janeiro)
var ano4    = data.getFullYear();       // 4 dígitos
var hora    = data.getHours();          // 0-23
var min     = data.getMinutes();        // 0-59
var seg     = data.getSeconds();        // 0-59
var mseg    = data.getMilliseconds();   // 0-999
var tz      = data.getTimezoneOffset(); // em minutos

// Formata a data e a hora (note o mês + 1)
var str_data = dia + '/' + (mes+1) + '/' + ano4;
var str_hora = hora + ':' + min + ':' + seg;

// Mostra o resultado
//alert('Hoje é ' + str_data + ' às ' + str_hora);

  const html = `
  <html>

  <head>

  <table>
      <tr>

      <td > <img src="https://www.unfe.org/wp-content/uploads/2018/12/LDC.png" style="width: 160px; height:50px">
      </td>
      
      <td style="font-size: 60px; font-family: Helvetica Neue; font-weight: bold; text-align:left">     
      Controle de Estoque
      </td>
      </tr>
     
    </tr>

    </table>
   
  </head>
  
  <body style="border: solid blue; padding: 10px"  >
  

  
    <h1 style="font-size: 30px; font-family: Helvetica Neue; font-weight: bold;">
      Status da lacração dos equipamentos da LDC
    </h1>
  
    <p>
  
      Data do relatório: ${str_data} <br>
      Horário: ${str_hora}
  
    </p>
  
    <table>
      <tr style="background-color: #5d7ee1; font-size: 14px; text-transform: uppercase;
      letter-spacing: 0.10em; font-weight: bold">
        <td>Equipamento</td>
        <td>Observação</td>
        <td>Nº do Lacre</td>
        <td>Controle de Estoque</td>
        <td>Operação</td>
        <td>Status</td>
        <td>Data e Hora do Registro</td>
      </tr>
  
      ${stringHTML}
  
  
    </table>
   
    <footer>

    <table style="margin-left: 30px">
      <tr>
        <td> ________________________ </td>
        <td> ________________________ </td>
        <td> ________________________ </td>
      </tr>
      <tr style="text-align:center">
      <td> Controle de Estoque </td>
      <td> Admnistrativo </td>
      <td> Gerência Industrial </td>
    </tr>

    </table>

    </footer>

  </body>
  </html>
`;

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

  function translateStateFilter(status: string | undefined){
    if(status === 'Todos'){
      return 'Todos os Equipamentos'
    }
    if(status === 'open'){
      return 'Equipamentos Abertos'
    }
    if(status === 'closed'){
      return 'Equipamentos Fechados'
    }
  }

  function translateStateFilterPDF(status: string | undefined){
    if(status === 'Todos'){
      return 'Todos os Equipamentos'
    }
    if(status === 'open'){
      return 'Aberto'
    }
    if(status === 'closed'){
      return 'Fechado'
    }
  }

  return (
    <Container>
      <Filters onFilter={setStatus} />
      <Header>
        <Title>{ translateStateFilter(status) }</Title>
        <Counter>          
          { status === 'Todos' ? equipments.length : orders.length  
          }
        
        </Counter>
      </Header>

      {

        filtroAtivo ?
          <Load /> &&
          <FlatList
            data={equipments}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Order data={item} />}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
          />
          : <FlatList
            data={orders}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Order data={item} />}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
          />
      }

      <SharedFooter>
        <FooterButton title="PDF" icon="archive" onPress={print} />
        <FooterButton title="Compartilhar" icon="share" onPress={printToFile} />
      </SharedFooter>

    </Container>
  );
}

/*
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
*/

/*


      {
        
        filtroAtivo ? 

        <FlatList
        data={equipments}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Order data={item} />}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
      />
          : <FlatList
            data={orders}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Order data={item} />}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
          />
      }


*/