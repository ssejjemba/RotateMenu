import * as React from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { Channel } from "./Model";
import ChannelIcon from "./ChannelIcon";
import PanGesture from "./PanGesture";
import Animated from "react-native-reanimated";

const { interpolate } = Animated;

const { width } = Dimensions.get("window");
const height = width / 1.4;
const D = width * 1.2;
const innerR = D / 2;
const styles = StyleSheet.create({
  container: {
    width,
    height
  }
});

interface CircularSelectionProps {
  channels: Channel[];
  index: Animated.Value<number>;
}

export default ({ channels, index }: CircularSelectionProps) => {
  const { length } = channels;
  const a = Math.sin(Math.PI / length);
  const r = (innerR * a) / (1 - a);
  const R = innerR + 2 * r;
  const cx = width / 2;
  const cy = R;
  const rotateZ = interpolate(index, {
    inputRange: [0 , length],
    outputRange: [0, -2 * Math.PI]
  })
  return (
    <View style={styles.container}>
      <LinearGradient
        style={{
          ...StyleSheet.absoluteFillObject,
          borderRadius: R,
          width: R * 2,
          height: R * 2,
          left: -(R - width / 2)
        }}
        colors={["#353637", "#161819", "#161819"]}
      />
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          transform: [
            {translateY: R - height / 2},
            {rotateZ},
            {translateY: -R + height / 2}
          ]
        }}
      >
        {channels.map((_, key) => {
          return (
            <View
              {...{ key }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                transform: [
                  {translateX: cx - r},
                  {translateY: cy - r},
                  {rotateZ: `${key * (2 * Math.PI / length)}rad`},
                  {translateY: -(cy - r)},
                ]
              }}
            >
              <ChannelIcon name={`${key + 1}`} radius={r} currentIndex={key} />
            </View>
          );
        })}
      </Animated.View>
      <PanGesture ratio={width / (length / 2)} {...{ index, length}}/>
    </View>
  );
};
