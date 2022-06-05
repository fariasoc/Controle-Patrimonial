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

  function handleNewOrder() {
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
      data_registro: firestore.FieldValue.serverTimestamp()
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

      <Button title="Enviar" isLoading={isLoading} onPress={handleNewOrder} />
        
    </Form>
  );
}