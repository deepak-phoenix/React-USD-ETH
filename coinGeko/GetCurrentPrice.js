import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  Button,
} from "react-native";

const url = "https://api.coingecko.com/api/v3/";

// This can get current price so that graph can be updated in real time

class GetCurrentPrice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: 0,
      loading: true,
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
        <Text style={this.styles.TextStyle}>
          Current price ${this.state.price}
        </Text>
        <Button
          title="Reload price"
          onPress={() => {
            this.setState({ price: 0, loading: true });
            this.fetchData();
          }}
        />
      </View>
    );
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(
      url +
        "simple/price?ids=ethereum&vs_currencies=usd&include_last_updated_at=true"
    )
      .then((response) => {
        response.json().then((json) => {
          this.setState({
            price: json.ethereum["usd"],
            loading: false,
          });
        });
      })
      .catch((reason) => {
        alert("Can't connect to server");
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
    TextStyle: {
      fontWeight: "bold",
      fontSize: 20,
      justifyContent: "space-around",
      textAlign: "center",
      padding: 15,
    },
  });
}
export default GetCurrentPrice;
