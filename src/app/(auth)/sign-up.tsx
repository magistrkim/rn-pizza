import {
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Platform,
} from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import Button from "@/components/Button";
import { Link } from "expo-router";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Text style={styles.label}>Username</Text>
        <TextInput
          placeholder="Username"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="Password"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
        <Button text="Sign up" onPress={() => console.log(name, email)} />
        <Link href="/sign-in" style={styles.title}>
          Do you have an account? Sign in
        </Link>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "semibold",
    color: Colors.light.tint,
    alignSelf: "center",
  },
  label: {
    fontSize: 16,
  },
  input: {
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
});
