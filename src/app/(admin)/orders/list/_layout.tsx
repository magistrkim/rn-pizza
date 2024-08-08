
import React from "react";
import { withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator);

const OrderListNavigator = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: Colors.dark.text }}
      edges={["top"]}
    >
      <TopTabs>
        <TopTabs.Screen name="index" options={{ title: "Active" }} />
      </TopTabs>
    </SafeAreaView>
  );
};

export default OrderListNavigator;
