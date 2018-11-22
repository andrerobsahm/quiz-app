import React from "react";
import { Grid, AreaChart, YAxis } from "react-native-svg-charts";
import { View } from "react-native";
import * as shape from "d3-shape";
import Colors from "../../constants/Colors";

export default class LineChart extends React.PureComponent {
  render() {
    const contentInset = { top: 20, bottom: 20 };

    return (
      <View style={{ paddingVertical: 20, flexDirection: "row" }}>
        <YAxis
          data={this.props.data}
          contentInset={contentInset}
          svg={{
            fill: "grey",
            fontSize: 10
          }}
          numberOfTicks={6}
          formatLabel={value => `${value}`}
        />
        <AreaChart
          style={{ height: 200, width: 260 }}
          data={this.props.data}
          svg={{ stroke: Colors.orange }}
          contentInset={{ top: 25, bottom: 10 }}
          curve={shape.curveNatural}
        >
          <Grid />
        </AreaChart>
      </View>
    );
  }
}
