import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";

import { useRouter } from "expo-router";

export default function Login() {
  const [username, setUsername] = useState("");

  const router = useRouter();

  const handleLogin = () => {
    const name = username.trim();

    if (!name) {
      return;
    }

    router.push({
      pathname: "/chat",
      params: {
        username: name
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        ChatWave
      </Text>

      <Text style={styles.subtitle}>
        Real-time messaging
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>
          Join Chat
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
    backgroundColor: "#F5F7FA"
  },

  title: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center"
  },

  subtitle: {
    textAlign: "center",
    marginBottom: 30,
    color: "#666"
  },

  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 15,
    fontSize: 16
  },

  button: {
    marginTop: 15,
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16
  }
});