import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import { defaultPizzaImage } from "@/components/ProductListItem";
import Colors, { sizes } from "@/constants/Colors";
import Button from "@/components/Button";
import { useCart } from "@/providers/CartProvider";
import { PizzaSize } from "@/types";
import { useProductById } from "@/api/products";

const ProductDetailPage = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(
    Array.isArray(idString)
      ? idString[0]
      : typeof idString === "string"
      ? idString
      : ""
  );
  const { data: product, error, isLoading } = useProductById(id);
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("L");

  const router = useRouter();

  const addToCart = () => {
    if (!product) {
      return <Text>Product is not found</Text>;
    }
    addItem(product, selectedSize);
    router.push("/cart");
  };
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch products</Text>;
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
          <Pressable
            onPress={() => setSelectedSize(size)}
            key={index}
            style={[
              styles.sizeItem,
              {
                backgroundColor:
                  selectedSize === size
                    ? Colors.light.accent
                    : Colors.dark.backgroundSize,
              },
            ]}
          >
            <Text
              style={[
                styles.sizeText,
                {
                  color:
                    selectedSize === size
                      ? Colors.dark.text
                      : Colors.light.text,
                },
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.price}>Price: ${product.price}</Text>
      <Button text="Add to cart" onPress={addToCart} />
    </View>
  );
};

export default ProductDetailPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.text,
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: "auto",
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
