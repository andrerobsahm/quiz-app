import React from "react";
import { LineChart, Grid } from "react-native-svg-charts";
import { View } from "react-native";

export default class LineChartExample extends React.PureComponent {
  render() {
    return (
      <View>
        <LineChart
          style={{ height: 200, width: 300 }}
          data={this.props.data}
          svg={{ stroke: "rgba(255,98,165,1)" }}
          contentInset={{ top: 20, bottom: 20 }}
        >
          <Grid />
        </LineChart>
      </View>
    );
  }
}
