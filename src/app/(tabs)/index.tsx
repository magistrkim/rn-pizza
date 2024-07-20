import Colors from "@/src/constants/Colors";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import ProductListItem from "@/src/components/ProductListItem";

const MenuScreen = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <ProductListItem />
      </View>
    </ScrollView>
  );
};
export default MenuScreen;

const styles = StyleSheet.create({
  container: {},
});
