import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import Button from "@/components/Button";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const resetInputs = () => {
    setName(""), setPrice("");
  };
  const onCreate = () => {
    console.log(name, price);

    //   save in the database

    resetInputs();
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        placeholder="Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Price</Text>
      <TextInput
        value={price}
        placeholder="$9.90"
        style={styles.input}
        keyboardType="numeric"
        onChangeText={setPrice}
      />

      <Button text="Create" onPress={onCreate} />
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
  label: {
    fontSize: 16,
    color: Colors.light.tint,
  },
  input: {
    backgroundColor: Colors.dark.text,
    padding: 16,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
  },
  image: {},
});
