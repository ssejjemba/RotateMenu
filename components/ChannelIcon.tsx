import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

const margin = 10;
const activeColor = { r: 41, g: 128, b: 185 };
const nonActiveColor = { r: 145, g: 146, b: 147 };
const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold"
  }
});

interface ChannelIconProps {
  name: string;
  radius: number;
  currentIndex: number;
}

export default ({ name, radius, currentIndex }: ChannelIconProps) => {
  return (
    <View
      style={{
        width: radius * 2,
        height: radius * 2,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <View
        style={{
          width: (radius - margin) * 2,
          height: (radius - margin) * 2,
          borderRadius: radius - margin,
          backgroundColor: "gray",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text style={styles.text}>{name}</Text>
      </View>
    </View>
  );
};
