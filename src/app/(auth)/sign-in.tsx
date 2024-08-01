import {
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
} from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import Button from "@/components/Button";
import { Link } from "expo-router";
import FormField from "@/components/FormField";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateInput = () => {
    setError("");
    if (!email || !password) {
      setError("Please fill in all the fields");
      return false;
    }
    return true;
  };
  const resetInputs = () => {
    setEmail(""), setPassword("");
  };

  const onSubmit = () => {
    if (!validateInput()) {
      return;
    }
    console.log("You sign in with", email);
    resetInputs();
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Text style={styles.title}>Sign In with Email</Text>
        <FormField
          title="Email"
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          handleChangeText={setEmail}
        />
        <FormField
          title="Password"
          placeholder="Password"
          keyboardType="email-address"
          value={password}
          handleChangeText={setPassword}
        />
        <Text style={styles.textError}>{error}</Text>
        <Button text="Sign In" onPress={onSubmit} />
        <Link href="/sign-up" style={styles.title}>
          Do not have an account? Sign up
        </Link>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.light.accent,
    alignSelf: "center",
    marginBottom: 20,
  },
  textError: {
    fontSize: 14,
    color: Colors.light.accent,
  },
});
