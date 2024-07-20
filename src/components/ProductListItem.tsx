import products from "@/assets/data/products";
import Colors from "@/src/constants/Colors";
import { StyleSheet, View, Text, Image } from "react-native";

const ProductListItem = () => {
  return (
    <View style={styles.container}>
      {products.map((product) => (
        <View key={product.id}>
          <Image
            source={{ uri: product.image }}
            alt="product image"
            style={styles.image}
          />
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.price}>${product.price}</Text>
        </View>
      ))}
    </View>
  );
};

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    padding: 20,
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
    width: "96%",
    aspectRatio: 1,
  },
});
