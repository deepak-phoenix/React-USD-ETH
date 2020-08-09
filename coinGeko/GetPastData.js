import React, { Component } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  Button,
} from "react-native";
import { LineChart } from "react-native-chart-kit";

// This can get past data so that the graph can be complete.

class GetPastData extends Component {
  url = "https://api.coingecko.com/api/v3/";

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      priceData: [],
      timeData: [],
    };
  }
  render() {
    if (this.state.loading) {
      return (
        <View style={this.styles.loader}>
          <ActivityIndicator size="large" color="#0c9" />
        </View>
      );
    }
    return (
      <View>
        <LineChart
          data={{
            labels: this.state.timeData,
            datasets: [
              {
                data: this.state.priceData,
              },
            ],
          }}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 10,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
        />
        <Button
          title="reload chart"
          onPress={() => {
            this.setState({ loading: true, priceData: [], timeData: [] });
          }}
        />
      </View>
    );
  }

  componentDidMount() {
    localTimeData = [];
    localPriceData = [];
    localFinalPrice = [];
    const toTime = Math.round(new Date().getTime() / 1000);
    const fromTime = toTime - 4 * 60 * 60;
    const customUrl =
      this.url +
      `coins/ethereum/market_chart/range?vs_currency=USD&from=${fromTime}&to=${toTime}`;
    fetch(customUrl).then((response) => {
      response.json().then((json) => {
        localFinalPrice = json.prices;
        for (let index = 0; index < localFinalPrice.length; index += 6) {
          const element = localFinalPrice[index];
          const timestamp = new Date(element[0] * 1000);
          const timeLable =
            timestamp.getUTCHours() + ":" + timestamp.getUTCMinutes();
          localTimeData.push(timeLable);
          localPriceData.push(element[1]);
        }
        this.setState({
          loading: false,
          timeData: localTimeData,
          priceData: localPriceData,
        });
      });
    });
  }

  styles = StyleSheet.create({
    loader: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff",
      padding: 20,
      margin: 20,
    },
  });
}
export default GetPastData;
