import { StyleSheet, View, FlatList } from "react-native";
import ProductListItem from "@/components/ProductListItem";
import products from "@assets/data/products";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

const MenuScreen = () => {
  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("products").select("*");
      console.log(data)
    };
    fetchProducts();
  }, []);

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
