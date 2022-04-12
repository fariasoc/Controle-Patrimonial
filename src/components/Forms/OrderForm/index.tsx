import React, { useState } from 'react';

import firestore from '@react-native-firebase/firestore'

import { Form, Title } from './styles';
import { Input } from '@components/Controllers/Input';
import { Button } from '@components/Controllers/Button';
import { TextArea } from '@components/Controllers/TextArea';
import { Alert, View } from 'react-native';

export function OrderForm() {
  const [patrimony, setPatrimony] = useState('');
  const [lacre, setLacre] = useState('');
  const [description, setDescription] = useState('');
  const [responsavelOperacao, setResponsavelOperacao] = useState('');
  const [responsavelEstoque, setResponsavelEstoque] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleNewOrder() {
    setIsLoading(true);

    firestore()
    .collection('orders')
    .add({
      patrimony,
      lacre,
      description,
      responsavelOperacao,
      responsavelEstoque,
      status: 'open',
      created_at: firestore.FieldValue.serverTimestamp()
    })
    .then(() => Alert.alert("OK", "Movimentação incluída com sucesso!") )
    .catch((error) => console.log(error))
    .finally(() => setIsLoading(false))
  }

  

  return ( 
    <Form>
      <Title>Nova movimentação</Title>
      <Input placeholder="Equipamento" onChangeText={setPatrimony} />
      <Input placeholder="Nº do Lacre" onChangeText={setLacre} />
      <Input placeholder="Responsável Operacional" onChangeText={setResponsavelOperacao} />
      <Input placeholder="Responsável do Controle de Estoque" onChangeText={setResponsavelEstoque} />
      <Input placeholder="Observações" onChangeText={setDescription} />

      <Button title="Enviar" isLoading={isLoading} onPress={handleNewOrder} />
    
    
    </Form>
  );

}