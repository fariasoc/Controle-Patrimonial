import React from "react"
import { StyleSheet, View } from "react-native"
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native"

const data = [
  { quarter: 'Refinaria', earnings: 4 },
  { quarter: 'Lecitina', earnings: 7 },
  { quarter: 'Degomado', earnings: 4 },
  { quarter: 'Goma e Borra', earnings: 2 }
]

export function Graficos() {

  return (
    <View style={styles.container}>
      <VictoryChart width={350} theme={VictoryTheme.material}>
        <VictoryBar data={data} x="quarter" y="earnings" />
      </VictoryChart>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {

    backgroundColor: "#e6dee6"
  }
});

export default Graficos;