import {
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import Button from "@/components/Button";
import { Link } from "expo-router";
import FormField from "@/components/FormField";
import { supabase } from "@/lib/supabase";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

  const SignInWithEmail = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) Alert.alert(error.message);
    if (!validateInput()) {
      return;
    }
    Alert.alert("You signed in successfully!");
    resetInputs();
    setLoading(false);
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
        <Button
          text={loading ? "Signing In..." : "Sign in"}
          onPress={SignInWithEmail}
          disabled={loading}
        />
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
