import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import products from "@assets/data/products";
import { useLocalSearchParams, Stack } from "expo-router";
import { defaultPizzaImage } from "@/components/ProductListItem";
import Colors, { sizes } from "@/constants/Colors";

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
      <View style={styles.sizesWrapper}>
        {sizes.map((size, index) => (
          <View key={index} style={styles.sizeItem}>
            <Text style={styles.sizeText}>{size}</Text>
          </View>
        ))}
      </View>
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
    marginBottom: 20,
  },
  sizesWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  sizeItem: {
    backgroundColor: Colors.light.backgroundSize,
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  sizeText: {
    fontSize: 20,
    fontWeight: "500",
  },
});
