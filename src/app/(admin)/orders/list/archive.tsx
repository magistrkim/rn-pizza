import { View, FlatList, ActivityIndicator, Text } from "react-native";
import React from "react";
import orders from "@assets/data/orders";
import OrderListItem from "@/components/OrderListItem";
import { useAdminOrdersList } from "@/api/orders";

const index = () => {
  const {
    data: orders,
    isLoading,
    error,
  } = useAdminOrdersList({ archived: true });
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
        numColumns={1}
        contentContainerStyle={{ gap: 10, padding: 10 }}
      />
    </View>
  );
};

export default index;
