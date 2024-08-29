import { View, Text, StyleSheet, FlatList, Pressable, ActivityIndicator } from "react-native";
import React from "react";
import { useLocalSearchParams, Stack } from "expo-router";
import OrderItemSubItem from "@/components/OrderItemSubItem";
import OrderListItem from "@/components/OrderListItem";
import { OrderStatusList } from "@/types";
import Colors from "@/constants/Colors";
import { useOrderById } from "@/api/orders";

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
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order # ${order.id}` }} />
      <OrderListItem order={order} />
      <FlatList
        data={order.order_items}
        contentContainerStyle={{ gap: 10 }}
        renderItem={({ item }) => <OrderItemSubItem item={item} />}
        ListFooterComponent={() => (
          <>
            <Text style={{ fontWeight: "bold", marginTop: 10 }}>Status</Text>
            <View style={{ flexDirection: "row", gap: 10 }}>
              {OrderStatusList.map((status) => (
                <Pressable
                  key={status}
                  onPress={() => console.warn("Update status")}
                  style={{
                    borderColor: Colors.light.tint,
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 5,
                    marginVertical: 10,
                    backgroundColor:
                      order.status === status
                        ? Colors.light.tint
                        : "transparent",
                  }}
                >
                  <Text
                    style={{
                      color:
                        order.status === status ? "white" : Colors.light.tint,
                    }}
                  >
                    {status}
                  </Text>
                </Pressable>
              ))}
            </View>
          </>
        )}
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
