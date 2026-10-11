
const API_URL = "https://chatwave-backend-f6s6.onrender.com";  

export const getMessages = async () => {
  const response = await fetch(`${API_URL}/api/messages`);

  if (!response.ok) {
    throw new Error("Failed to fetch messages");
  }

  return response.json();
};

export const sendMessageAPI = async (username, text) => {
  const response = await fetch(`${API_URL}/api/messages`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      username,
      text
    })
  });

  if (!response.ok) {
    throw new Error("Failed to send message");
  }

  return response.json();
};