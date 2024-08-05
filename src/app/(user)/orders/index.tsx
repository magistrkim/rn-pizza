import { View, FlatList } from "react-native";
import React from "react";
import orders from "@assets/data/orders";
import OrderListItem from "@/components/OrderListItem";

const OrdersScreen = () => {
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
