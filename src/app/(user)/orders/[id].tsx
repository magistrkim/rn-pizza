import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import React from "react";
import { useLocalSearchParams, Stack, Link } from "expo-router";
import orders from "@assets/data/orders";
import Colors from "@/constants/Colors";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { defaultPizzaImage } from "@/components/ProductListItem";

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
      <View style={styles.itemWrapper}>
        <View>
          <Text style={styles.title}>Order # {order.id}</Text>
          <Text>{timeAgo}</Text>
        </View>
        <Text>{order.status}</Text>
      </View>
      <FlatList
        data={order.order_items}
        contentContainerStyle={{ gap: 10 }}
        renderItem={({ item }) => (
          <View style={styles.orderWrapper}>
            <Image
              source={{ uri: item.products.image || defaultPizzaImage }}
              style={styles.image}
              resizeMode="contain"
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.title}>{item.products.name}</Text>
              <View style={styles.subtitleContainer}>
                <Text style={styles.price}>
                  ${item.products.price.toFixed(2)}
                </Text>
                <Text>Size: {item.size}</Text>
              </View>
            </View>
            <View>
              <Text style={styles.quantity}>{item.quantity}</Text>
            </View>
          </View>
        )}
      />
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
    marginBottom: 10,
  },
  orderWrapper: {
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
  subtitleContainer: {
    flexDirection: "row",
    gap: 10,
  },
  quantity: {
    fontWeight: "600",
    fontSize: 20,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: "bold",
  },
  image: {
    width: "20%",
    aspectRatio: 1,
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
  },
  sizeText: {
    fontSize: 20,
    fontWeight: "500",
  },
});
