import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import { CartItem } from "../types";
import { defaultPizzaImage } from "@components/ProductListItem";
import { FontAwesome } from "@expo/vector-icons";
import { useCart } from "../providers/CartProvider";

type CartListItemProps = {
  cartItem: CartItem;
};

const CartListItem = ({ cartItem }: CartListItemProps) => {
  const {updateQuantity} = useCart();
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: cartItem.product.image || defaultPizzaImage }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{cartItem.product.name}</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.price}>${cartItem.product.price.toFixed(2)}</Text>
          <Text>Size: {cartItem.size}</Text>
        </View>
      </View>
      <View style={styles.quantitySelector}>
        <FontAwesome
            onPress={() => updateQuantity(cartItem.id, -1)}
          name="minus"
          color="gray"
          style={{ padding: 5, fontSize: 16 }}
        />

        <Text style={styles.quantity}>{cartItem.quantity}</Text>
        <FontAwesome
            onPress={() => updateQuantity(cartItem.id, 1)}
          name="plus"
          color="gray"
          style={{ padding: 5, fontSize: 16 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 75,
    aspectRatio: 1,
    alignSelf: "center",
    marginRight: 10,
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 5,
  },
  subtitleContainer: {
    flexDirection: "row",
    gap: 10,
  },
  quantitySelector: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  quantity: {
    fontWeight: "600",
    fontSize: 20,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: "bold",
  },
});

export default CartListItem;
