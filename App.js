import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import GetCurrentPrice from "./coinGeko/GetCurrentPrice";
import GetPastData from "./coinGeko/GetPastData";

export default function App() {
  return (
    <View>
      <View
        style={{
          padding: 40,
          alignContent: "center",
          justifyContent: "center",
          backgroundColor: "#ccc",
          height: "40%",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 25 }}>
          Ethereum vs USD
        </Text>
        <Text style={{ fontWeight: "bold", fontSize: 12 }}>@deepakpatel</Text>
      </View>
      <View>
        <GetCurrentPrice />
        <GetPastData />
      </View>
    </View>
  );
}
