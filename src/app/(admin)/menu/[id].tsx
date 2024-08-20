import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useLocalSearchParams, Stack, Link } from "expo-router";
import { defaultPizzaImage } from "@/components/ProductListItem";
import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
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

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch products</Text>;
  }
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "ItemPage",
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
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
