import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import { useLocalSearchParams, Stack } from "expo-router";
import orders from "@assets/data/orders";
import Colors from "@/constants/Colors";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import OrderItemSubItem from "@/components/OrderItemSubItem";

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
        renderItem={({ item }) => <OrderItemSubItem order_items={item} />}
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
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
  },
});
