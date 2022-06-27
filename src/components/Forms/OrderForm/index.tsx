import React, { useState } from 'react';

import firestore from '@react-native-firebase/firestore'

import { Form, Title } from './styles';
import { Input } from '@components/Controllers/Input';
import { Button } from '@components/Controllers/Button';
import { TextArea } from '@components/Controllers/TextArea';
import { Alert, View } from 'react-native';

export function OrderForm() {
  const [patrimonio, setPatrimonio] = useState('');
  const [lacre, setLacre] = useState('');
  const [observacao, setObservacao] = useState('');
  const [responsavelOperacao, setResponsavelOperacao] = useState('');
  const [responsavelEstoque, setResponsavelEstoque] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

  function handleNewEquipment() {
    setIsLoading(true);

    firestore()
    .collection('orders')
    .add({
      patrimonio,
      lacre,
      observacao,
      responsavelOperacao,
      responsavelEstoque,
      status: 'open',
      data_registro: str_Data + '-' + str_hora
    })
    .then(() => Alert.alert("OK", "Movimentação incluída com sucesso!") )
    .catch((error) => console.log(error))
    .finally(() => setIsLoading(false))
  }

  return ( 
    <Form>

      <Title>Nova movimentação</Title>

      <Input placeholder="Equipamento" onChangeText={setPatrimonio} />
      <Input placeholder="Nº do Lacre" onChangeText={setLacre} />
      <Input placeholder="Responsável Operacional" onChangeText={setResponsavelOperacao} />
      <Input placeholder="Responsável do Controle de Estoque" onChangeText={setResponsavelEstoque} />
      <Input placeholder="Observações" onChangeText={setObservacao} />

      <Button title="Enviar" isLoading={isLoading} onPress={handleNewEquipment} />
        
    </Form>
  );
}