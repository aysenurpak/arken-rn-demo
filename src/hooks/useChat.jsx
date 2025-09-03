import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

export const useChat = (chatId) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("chats")
      .doc(chatId)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot(snapshot => {
        const msgs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMessages(msgs);
      });

    return () => unsubscribe();
  }, [chatId]);

  const sendMessage = (text, senderId) => {
    firestore()
      .collection("chats")
      .doc(chatId)
      .collection("messages")
      .add({
        text,
        senderId,
        timestamp: firestore.Timestamp.now(), 
      });
  };

  return { messages, sendMessage };
};
