import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import { useLocalSearchParams, Stack } from "expo-router";
import orders from "@assets/data/orders";
import Colors from "@/constants/Colors";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import OrderItemSubItem from "@/components/OrderItemSubItem";
import OrderListItem from "@/components/OrderListItem";

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
      <FlatList
        data={order.order_items}
        contentContainerStyle={{ gap: 10 }}
        renderItem={({ item }) => <OrderItemSubItem item={item} />}
        ListHeaderComponent={() => <OrderListItem order={order} />}
      />
    </View>
  );
};

export default OrderItemPage;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 10,
    flex: 1,
  },
});
