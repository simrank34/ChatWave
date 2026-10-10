import { useEffect, useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from "react-native";

import { useLocalSearchParams } from "expo-router";

import { getMessages } from "../services/api";
import { socket } from "../services/socket";

import MessageBubble from "../components/MessageBubble";

export default function Chat() {
  const { username } = useLocalSearchParams();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [typingUser, setTypingUser] = useState("");

  useEffect(() => {
    loadMessages();

    socket.connect();

    socket.emit("join", username);

    socket.on("receiveMessage", (message) => {
      setMessages((previous) => [
        ...previous,
        message
      ]);
    });

    socket.on("userTyping", (data) => {
      setTypingUser(data.username);
    });

    socket.on("userStopTyping", () => {
      setTypingUser("");
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("userTyping");
      socket.off("userStopTyping");

      socket.disconnect();
    };
  }, []);

  const loadMessages = async () => {
    try {
      const data = await getMessages();
      setMessages(data);
    } catch (error) {
      console.log("Failed to load messages:", error.message);
    }
  };

  const sendMessage = () => {
    const message = text.trim();

    if (!message) {
      return;
    }

    socket.emit("sendMessage", {
      username,
      text: message
    });

    setText("");

    socket.emit("stopTyping");
  };

  const handleTyping = (value) => {
    setText(value);

    if (value.length > 0) {
      socket.emit("typing", username);
    } else {
      socket.emit("stopTyping");
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <View>
          <Text style={styles.title}>
            ChatWave
          </Text>

          <Text style={styles.online}>
            ● Online
          </Text>
        </View>

        <Text style={styles.username}>
          {username}
        </Text>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <MessageBubble
            message={item}
            currentUser={username}
          />
        )}
        contentContainerStyle={styles.messages}
      />

      {typingUser !== "" && (
        <Text style={styles.typing}>
          {typingUser} is typing...
        </Text>
      )}

      <View style={styles.inputContainer}>

        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={text}
          onChangeText={handleTyping}
          onSubmitEditing={sendMessage}
        />

        <TouchableOpacity
          style={styles.sendButton}
          onPress={sendMessage}
        >
          <Text style={styles.sendText}>
            Send
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA"
  },

  header: {
    padding: 18,
    backgroundColor: "#2563EB",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  title: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold"
  },

  online: {
    color: "#D1FAE5",
    marginTop: 3
  },

  username: {
    color: "white",
    fontWeight: "bold"
  },

  messages: {
    padding: 12
  },

  typing: {
    paddingHorizontal: 15,
    paddingBottom: 5,
    color: "#777",
    fontStyle: "italic"
  },

  inputContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#ddd"
  },

  input: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10
  },

  sendButton: {
    marginLeft: 8,
    backgroundColor: "#2563EB",
    paddingHorizontal: 18,
    justifyContent: "center",
    borderRadius: 20
  },

  sendText: {
    color: "white",
    fontWeight: "bold"
  }
});