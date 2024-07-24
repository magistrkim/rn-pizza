import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import products from "@assets/data/products";
import { useLocalSearchParams, Stack } from "expo-router";
import { defaultPizzaImage } from "@/components/ProductListItem";
import Colors from "@/constants/Colors";

const ProductDetailPage = () => {
  const { id } = useLocalSearchParams();

  const product = products.find((item) => item.id.toString() === id);
  if (!product) {
    return <Text>Product is not found</Text>;
  }
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        style={styles.image}
      />
      <Text style={styles.title}>Select size: </Text>
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>Price: ${product.price}</Text>
    </View>
  );
};

export default ProductDetailPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.text,
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.light.tint,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
});
