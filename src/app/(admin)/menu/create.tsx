import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Pressable,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import Button from "@/components/Button";
import { defaultPizzaImage } from "@/components/ProductListItem";
import * as ImagePicker from "expo-image-picker";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import FormField from "@/components/FormField";
import {
  useDeleteProduct,
  useInsertProduct,
  useProductById,
  useUpdateProduct,
} from "@/api/products";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(
    Array.isArray(idString)
      ? idString[0]
      : typeof idString === "string"
      ? idString
      : ""
  );
  const isUpdating = !!id;

  const { mutate: insertProduct } = useInsertProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { data: updatingProduct } = useProductById(id);
  const { mutate: deleteProduct } = useDeleteProduct();
  const router = useRouter();

  useEffect(() => {
    if (updatingProduct) {
      setName(updatingProduct.name),
        setPrice(updatingProduct.price.toString()),
        setImage(updatingProduct.image);
    }
  }, [updatingProduct]);

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

  const onSubmit = () => {
    if (isUpdating) {
      onUpdate();
    } else {
      onCreate();
    }
  };
  const onCreate = () => {
    if (!validateInput()) {
      return;
    }
    console.log("Create", name, price);

    insertProduct(
      { name, price: parseFloat(price), image },
      {
        onSuccess: () => {
          resetInputs();
          router.back();
        },
      }
    );
  };
  const onUpdate = () => {
    if (!validateInput()) {
      return;
    }
    updateProduct(
      { id, name, price: parseFloat(price), image },
      {
        onSuccess: () => {
          resetInputs();
          router.back();
        },
      }
    );
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const onDelete = () => {
    deleteProduct(id, {
      onSuccess: () => {
        resetInputs();
        router.replace("/(admin)");
      },
    });
    console.log("Delete item", id);
  };
  const confirmDelete = () => {
    Alert.alert("Confirm", "Are you sure???", [
      {
        text: "Cancel",
      },
      {
        text: "Remove",
        style: "destructive",
        onPress: onDelete,
      },
    ]);
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View>
          <Stack.Screen
            options={{
              title: isUpdating ? "Update Product" : "Create Product",
            }}
          />
          <Image
            source={{ uri: image || defaultPizzaImage }}
            style={styles.image}
          />
          <Text onPress={pickImage} style={styles.title}>
            Select Image
          </Text>
          <FormField
            title="Name"
            placeholder="Name"
            value={name}
            handleChangeText={setName}
          />
          <FormField
            title="Price"
            placeholder="$ 9.90"
            value={price}
            handleChangeText={setPrice}
          />
          <Text style={styles.textError}>{error}</Text>
          <Button text={isUpdating ? "Update" : "Create"} onPress={onSubmit} />
          {isUpdating && (
            <Pressable>
              {({ pressed }) => (
                <FontAwesome
                  onPress={confirmDelete}
                  name="trash"
                  size={25}
                  color={Colors.light.accent}
                  style={{
                    marginHorizontal: "auto",
                    marginTop: 10,
                    opacity: pressed ? 0.5 : 1,
                  }}
                />
              )}
            </Pressable>
          )}
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
  textError: {
    fontSize: 14,
    color: Colors.light.accent,
  },
});
