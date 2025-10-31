import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { router } from "expo-router";

export default function Index() {
  const [city, setCity] = useState("");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.title}>🌦 Aplikasi Cuaca</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan nama kota..."
        value={city}
        onChangeText={setCity}
      />
      <Button
        title="Lihat Cuaca"
        onPress={() => {
          if (city.trim()) router.push(`/${city.trim()}`);
        }}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#EAF2F8",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderColor: "#007BFF",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "white",
  },
});
