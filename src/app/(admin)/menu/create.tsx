import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import Button from "@/components/Button";
import { defaultPizzaImage } from "@/components/ProductListItem";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");

  const validateInput = () => {
    setError("");
    if (!name || !price) {
      setError("Please fill in all the fields");
      return false;
    }
    if (isNaN(parseFloat(price))) {
      setError("Price is not a number");
      return false;
    }
    return true;
  };

  const resetInputs = () => {
    setName(""), setPrice("");
  };
  const onCreate = () => {
    if (!validateInput()) {
      return;
    }
    console.log(name, price);

    //   save in the database
    resetInputs();
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View>
          <Image source={{ uri: defaultPizzaImage }} style={styles.image} />
          <Text style={styles.title}>Select Image</Text>
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
          <Text style={styles.textError}>{error}</Text>
          <Button text="Create" onPress={onCreate} />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default CreateProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
  },
  image: {
    width: "70%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.light.tint,
    alignSelf: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
  },
  input: {
    backgroundColor: Colors.dark.text,
    padding: 16,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 10,
  },
  textError: {
    fontSize: 14,
    color: Colors.light.accent,
  },
});
