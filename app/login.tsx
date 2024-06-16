import { useState } from "react";

import {
  Alert,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Text, View } from "@/components/Themed";
import { Redirect, router } from "expo-router";
import { useAuthStore } from "@/store/auth-store";

export default function ModalScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((state) => state.login);

  const handleLogin = async () => {
    try {
      await login(email, password);
      setEmail("");
      setPassword("");
      Alert.alert("Success", "Bienvenido");
      router.push("/(tabs)");
    } catch (error) {
      Alert.alert("Error", "Email o contraseña incorrectos");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        className="text-black"
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
        placeholder="Ingresa tu email"
      />
      <TextInput
        className="text-black"
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
        placeholder="Ingresa tu contraseña"
        secureTextEntry={true}
      />
      <Pressable style={styles.button} onPress={() => console.log}>
        <Text style={styles.textButton}>Crear Cuenta</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.textButton}>Iniciar Sesión</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: 200,
    height: 40,
    margin: 12,
    borderWidth: 1,
    paddingHorizontal: 4,
    borderRadius: 6,
    borderColor: "gray",
    textAlign: "left",
    color: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },

  button: {
    alignItems: "center",
    width: 200,
    marginTop: 10,
    borderRadius: 6,
    backgroundColor: "#2563eb",
    padding: 10,
    fontWeight: "bold",
    //Text Button
  },
  textButton: {
    color: "#fff",
    fontWeight: "bold",
  },
});
