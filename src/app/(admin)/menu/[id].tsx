import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import products from "@assets/data/products";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import { defaultPizzaImage } from "@/components/ProductListItem";
import Colors, { sizes } from "@/constants/Colors";
import Button from "@/components/Button";
import { useCart } from "@/providers/CartProvider";
import { PizzaSize } from "@/types";

const ProductDetailPage = () => {
  const { id } = useLocalSearchParams();
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("L");

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
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginVertical: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    marginBottom: 20,
  },
});
