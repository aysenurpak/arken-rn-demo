import React, { useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity } from "react-native";
import COLORS from "../../constants/color";
import useUsers from "../../hooks/useUsers";
import SIZE from "../../constants/theme";

const ChatListScreen = ({ navigation, currentUserId }) => {
  const [search, setSearch] = useState("");
  const { users, loading } = useUsers();

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const openChat = (user) => {
    const chatId =
      currentUserId < user.id
        ? currentUserId + "_" + user.id
        : user.id + "_" + currentUserId;

    navigation.navigate("ChatScreen", { chatId, currentUserId, user });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ara..."
        value={search}
        onChangeText={setSearch}
      />

      {loading ? (
        <Text>Yükleniyor...</Text>
      ) : (
        <FlatList
          data={filteredUsers}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.userItem} onPress={() => openChat(item)}>
              <Text style={styles.userName}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: SIZE.medium,
    backgroundColor: COLORS.background,
  },
  input: {
    height: SIZE.xxLarge,
    borderColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: SIZE.xSmall,
    paddingHorizontal: SIZE.xSmall,
    marginBottom: SIZE.medium,
  },
  userItem: {
    padding: SIZE.small,
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 1,
  },
  userName: {
    fontSize: SIZE.medium,
    fontWeight: "bold",
  },
};

export default ChatListScreen;
