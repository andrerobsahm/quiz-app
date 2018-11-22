import React from "react";
import { LineChart, Grid, AreaChart } from "react-native-svg-charts";
import { View } from "react-native";
import * as shape from "d3-shape";
import Colors from "../../constants/Colors";

export default class LineChartExample extends React.PureComponent {
  render() {
    return (
      <View>
        <AreaChart
          style={{ height: 200, width: 300 }}
          data={this.props.data}
          svg={{ stroke: Colors.orange }}
          contentInset={{ top: 20, bottom: 20 }}
          curve={shape.curveNatural}
        >
          <Grid />
        </AreaChart>
      </View>
    );
  }
}
