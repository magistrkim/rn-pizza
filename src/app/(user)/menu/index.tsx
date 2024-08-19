import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Text,
} from "react-native";
import ProductListItem from "@/components/ProductListItem";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

const MenuScreen = () => {
  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*");
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch products</Text>;
  }

  return (
    <View>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
      />
    </View>
  );
};
export default MenuScreen;

const styles = StyleSheet.create({
  container: {},
});
