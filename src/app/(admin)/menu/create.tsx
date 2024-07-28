import { View, Text, StyleSheet } from "react-native";
import React from "react";

const CreateProduct = () => {
  return (
    <View style={styles.container}>
      <Text>Create Product</Text>
    </View>
  );
};

export default CreateProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
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
