import React, { useState } from "react";
import { View, TextInput, Button, FlatList, Text } from "react-native";
import { useChat } from "../../hooks/useChat";
import COLORS from "../../constants/color";
import SIZE from "../../constants/theme";

const ChatScreen = ({ route }) => {
  const { chatId, currentUserId } = route.params;
  const { messages, sendMessage } = useChat(chatId);
  const [text, setText] = useState("");

  return (
    <View style={{ flex: 1, padding:SIZE.medium, backgroundColor: COLORS.background }}>
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Text style={{ marginVertical: 4, color: item.senderId === currentUserId ? COLORS.orange : COLORS.gray }}>
            {item.text}
          </Text>
        )}
      />

      <View style={{ flexDirection: "row", marginTop: SIZE.xSmall }}>
        <TextInput
          style={{ flex: 1, borderColor: COLORS.gray, borderWidth: 1, borderRadius: SIZE.xSmall, paddingHorizontal: SIZE.xSmall }}
          value={text}
          onChangeText={setText}
          placeholder="Mesaj yaz..."
        />
        <Button
          title="Gönder"
          onPress={() => {
            sendMessage(text, currentUserId);
            setText("");
          }}
        />
      </View>
    </View>
  );
};

export default ChatScreen;
