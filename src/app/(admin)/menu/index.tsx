import {
  StyleSheet,
  View,
  FlatList,
} from "react-native";
import ProductListItem from "@/components/ProductListItem";
import products from "@assets/data/products";

const MenuScreen = () => {
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
