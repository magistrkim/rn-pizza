import { View, Text } from "react-native";
import { Order } from "@/types";
import React from "react";

type OrderListItemProps = {
  order: Order;
};

const OrderListItem = ({ order }: OrderListItemProps) => {
  return (
    <View>
      <Text>{order.id}</Text>
      <Text>{order.created_at}</Text>
      <Text>{order.status}</Text>
    </View>
  );
};

export default OrderListItem;
