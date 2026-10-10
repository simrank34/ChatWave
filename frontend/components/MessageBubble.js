import { View, Text, StyleSheet } from "react-native";

export default function MessageBubble({ message, currentUser }) {
  const isMine = message.username === currentUser;

  const time = new Date(message.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <View
      style={[
        styles.container,
        isMine ? styles.myMessage : styles.otherMessage
      ]}
    >
      {!isMine && (
        <Text style={styles.username}>
          {message.username}
        </Text>
      )}

      <Text style={styles.text}>
        {message.text}
      </Text>

      <Text style={styles.time}>
        {time}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: "80%",
    padding: 12,
    marginVertical: 5,
    borderRadius: 15
  },

  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6"
  },

  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF"
  },

  username: {
    fontWeight: "bold",
    marginBottom: 4
  },

  text: {
    fontSize: 16
  },

  time: {
    fontSize: 10,
    color: "#777",
    alignSelf: "flex-end",
    marginTop: 5
  }
});