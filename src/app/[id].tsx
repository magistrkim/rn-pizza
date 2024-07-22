import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const ProductDetailPage = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>ProductDetailPage: {id}</Text>
    </View>
  );
};

export default ProductDetailPage;
