import { View, Text } from "react-native";
import React from "react";
import { withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator);

const OrderListNavigator = () => {
  return <TopTabs />;
};

export default OrderListNavigator;
