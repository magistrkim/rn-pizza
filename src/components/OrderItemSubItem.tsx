import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { OrderItem } from "@/types";
import Colors from "@/constants/Colors";
import { defaultPizzaImage } from "./ProductListItem";
import { Tables } from "@/database.types";

type OrderItemSubItemProps = {
  item: { products: Tables<"products"> } & Tables<"order_items">;
};
const OrderItemSubItem = ({ item }: OrderItemSubItemProps) => {
  return (
    <View style={styles.wrapper}>
      <Image
        source={{ uri: item.products.image || defaultPizzaImage }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={styles.title}>{item.products.name}</Text>
        <View style={styles.subWrapper}>
          <Text style={styles.price}>${item.products.price.toFixed(2)}</Text>
          <Text style={styles.size}>Size: {item.size}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.quantity}>{item.quantity}</Text>
      </View>
    </View>
  );
};

export default OrderItemSubItem;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
  },
  subWrapper: {
    flexDirection: "row",
    gap: 10,
  },
  quantity: {
    fontWeight: "600",
    fontSize: 20,
    marginRight: 6,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: "bold",
  },
  image: {
    width: "20%",
    aspectRatio: 1,
  },
  size: {
    fontWeight: "500",
  },
});
