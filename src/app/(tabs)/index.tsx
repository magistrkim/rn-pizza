import Colors from "@/src/constants/Colors";
import { StyleSheet, View, Text, Image } from "react-native";
import products from "@/assets/data/products";

const product = products[0];

const TabOneScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: product.image }}
        alt="product image"
        style={styles.image}
      />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
};
export default TabOneScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.light.tint,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
});
