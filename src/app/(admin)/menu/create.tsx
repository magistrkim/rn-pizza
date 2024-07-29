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
import * as ImagePicker from "expo-image-picker";
import { Stack } from "expo-router";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState<string | null>(null);

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

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View>
          <Stack.Screen options={{ title: "Create Product" }} />
          <Image
            source={{ uri: image || defaultPizzaImage }}
            style={styles.image}
          />
          <Text onPress={pickImage} style={styles.title}>
            Select Image
          </Text>
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
    borderRadius: 130,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.light.tint,
    alignSelf: "center",
    marginVertical: 20,
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
