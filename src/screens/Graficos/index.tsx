import React from "react"
import { StyleSheet, View, Text } from "react-native"
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native"
import { Container, Content, SubTitle, BackButton, BackText } from '../Register/styles';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';

const data = [
  { quarter: 'Refinaria', earnings: 4 },
  { quarter: 'Lecitina', earnings: 7 },
  { quarter: 'Degomado', earnings: 4 },
  { quarter: 'Goma e Borra', earnings: 2 }
]

export function Graficos() {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text> Teste  </Text>
      <VictoryChart width={350} theme={VictoryTheme.material}>
        <VictoryBar data={data} x="quarter" y="earnings" />
      </VictoryChart>
      <BackButton onPress={() => navigation.navigate('home')}>
        <MaterialIcons name="arrow-back" size={24} color={theme.COLORS.PRIMARY} />
        <BackText>Eu já tenho uma conta</BackText>
      </BackButton>

    </View>
  )

}

const styles = StyleSheet.create({
  container: {

    backgroundColor: "#e6dee6"
  }
});

export default Graficos;