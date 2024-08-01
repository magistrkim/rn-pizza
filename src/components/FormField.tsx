import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { KeyboardTypeOptions } from "react-native";

type FormFieldProps = {
  title: string;
  placeholder: string;
  value: string;
  keyboardType?: KeyboardTypeOptions;
  handleChangeText: (text: string) => void;
};

const FormField = ({
  title,
  placeholder,
  value,
  handleChangeText,
  keyboardType,
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View>
      <Text style={styles.label}>{title}</Text>
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        value={value}
        onChangeText={handleChangeText}
        keyboardType={keyboardType}
        secureTextEntry={title === "Password" && !showPassword}
      />
      {title === "Password" && (
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          {!showPassword ? (
            <FontAwesome name="eye-slash" style={styles.icon} />
          ) : (
            <FontAwesome name="eye" style={styles.icon} />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default FormField;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
  },
  input: {
    position: "relative",
    backgroundColor: Colors.dark.text,
    padding: 16,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  textError: {
    fontSize: 14,
    color: Colors.light.accent,
  },
  icon: {
    position: "absolute",
    top: -45,
    right: 20,
    fontSize: 20,
    color: Colors.light.tint,
  },
});
