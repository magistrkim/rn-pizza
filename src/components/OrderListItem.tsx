import { View, Text, Pressable, StyleSheet } from "react-native";
import { Order } from "@/types";
import React from "react";
import { Link, useSegments } from "expo-router";
import Colors from "@/constants/Colors";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

type OrderListItemProps = {
  order: Order;
};

const OrderListItem = ({ order }: OrderListItemProps) => {
  const timeAgo = dayjs(order.created_at).fromNow();
  const segments = useSegments();
  return (
    <Link href={`/${segments[0]}/orders/${order.id}`} asChild>
      <Pressable style={styles.container}>
        <View>
          <Text style={styles.title}>Order # {order.id}</Text>
          <Text>{timeAgo}</Text>
        </View>
        <Text>{order.status}</Text>
      </Pressable>
    </Link>
  );
};

export default OrderListItem;

const styles = StyleSheet.create({
  container: {
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
  },
  image: {
    width: "96%",
    aspectRatio: 1,
  },
});
