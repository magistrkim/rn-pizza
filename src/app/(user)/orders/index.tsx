import { View, FlatList, ActivityIndicator, Text } from "react-native";
import React from "react";
import OrderListItem from "@/components/OrderListItem";
import { useUserOrdersList } from "@/api/orders";

const OrdersScreen = () => {
  const { data: orders, isLoading, error } = useUserOrdersList();
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch data</Text>;
  }
  return (
    <View>
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderListItem order={item} />}
        contentContainerStyle={{ gap: 10, padding: 10 }}
      />
    </View>
  );
};

export default OrdersScreen;
