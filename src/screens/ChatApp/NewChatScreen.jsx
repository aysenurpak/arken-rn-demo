import React from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity } from "react-native";
import COLORS from "../../constants/color";
import useUsers from "../../hooks/useUsers";
import SIZE from "../../constants/theme";

const NewChatScreen = ({ navigation, currentUserId }) => {
  const [search, setSearch] = React.useState("");
  const { users } = useUsers();

  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(search.toLowerCase())
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
        placeholder="Bir ad veya numara aratın"
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredUsers}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.userItem} onPress={() => openChat(item)}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.userPhone}>{item.phone}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = {
  input: {
    height: SIZE.xxLarge,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: SIZE.xSmall,
    paddingHorizontal: SIZE.xSmall,
    marginTop: SIZE.medium,
  },
  container: {
    flex: 1,
    padding: SIZE.medium,
    backgroundColor: COLORS.background,
  },
  userItem: {
    padding: SIZE.small,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  },
  userName: {
    fontSize: SIZE.medium,
    fontWeight: "bold",
  },
  userPhone: {
    fontSize: SIZE.medium,
    color: COLORS.gray,
  },
};

export default NewChatScreen;
