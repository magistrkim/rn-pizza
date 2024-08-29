import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useLocalSearchParams, Stack } from "expo-router";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import OrderItemSubItem from "@/components/OrderItemSubItem";
import OrderListItem from "@/components/OrderListItem";
import { useOrderById } from "@/api/orders";

dayjs.extend(relativeTime);

const OrderItemPage = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(
    Array.isArray(idString)
      ? idString[0]
      : typeof idString === "string"
      ? idString
      : ""
  );
  const { data: order, isLoading, error } = useOrderById(id);
  if (isLoading) {
    return <ActivityIndicator />;
  }
 if (error || !order) {
   return <Text>Failed to fetch products</Text>;
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
