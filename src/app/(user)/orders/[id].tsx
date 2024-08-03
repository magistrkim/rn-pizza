import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useLocalSearchParams, Stack, Link } from "expo-router";
import orders from "@assets/data/orders";
import Colors from "@/constants/Colors";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const OrderItemPage = () => {
  const { id } = useLocalSearchParams();
  const order = orders.find((item) => item.id.toString() === id);
  if (!order) {
    return <Text>Product is not found</Text>;
  }
  const timeAgo = dayjs(order.created_at).fromNow();
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order # ${order.id}` }} />

      <Pressable style={styles.itemWrapper}>
        <View>
          <Text style={styles.title}>Order # {order.id}</Text>
          <Text>{timeAgo}</Text>
        </View>
        <Text>{order.status}</Text>
      </Pressable>
    </View>
  );
};

export default OrderItemPage;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  itemWrapper: {
    backgroundColor: Colors.light.background,
    padding: 20,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
