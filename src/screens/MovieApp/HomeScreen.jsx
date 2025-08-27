import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import axios from "axios";
import COLORS from "../../constants/color";
import { API_KEY, BASE_URL } from "../../constants/tmdb";

const { width } = Dimensions.get("window");
const posterWidth = (width - 48) / 2; 
const posterHeight = posterWidth * 1.5; 

const HomeScreen = ({ navigation }) => {
    const [trending, setTrending] = useState([]);
    const [continueWatching, setContinueWatching] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
                setTrending(response.data.results);

                if (response.data.results.length > 0) {
                    setContinueWatching(response.data.results[0]);
                }
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies();
    }, []);

    if (!continueWatching) return <Text style={{ color: COLORS.background }}>Loading...</Text>;

    return (
        <ScrollView style={{ flex: 1, backgroundColor: COLORS.darkBlue }}>
            <View style={{ flexDirection: "row", margin: 16, top: 50 }}>
                <Text style={{ color: COLORS.orange, fontSize: 24 }}>Stream </Text>
                <Text style={{ color: COLORS.background, fontSize: 24 }}>Everywhere</Text>
            </View>

            <TouchableOpacity style={{ margin: 16, top: 50, width: "90%" }}>
                <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w500${continueWatching.poster_path}` }}
                    style={{ height: posterHeight, borderRadius: 16, width: "100%" }}
                />
                <View style={{ position: "absolute", bottom: 16, left: 16 }}>
                    <Text style={{ color: COLORS.background }}>Continue Watching</Text>
                    <Text style={{ color: COLORS.background, fontWeight: "bold" }}>
                        {continueWatching.title}
                    </Text>
                </View>
            </TouchableOpacity>

            <Text style={{ color: COLORS.background, fontSize: 20, marginHorizontal: 16, marginTop: 80 }}>
                Trending
            </Text>

            <FlatList
                horizontal
                data={trending}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ paddingHorizontal: 16, marginTop: 20 }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={{ width: posterWidth, marginRight: 16, alignItems: "center" }}
                        onPress={() => navigation.navigate("DetailScreen", { id: item.id })}
                    >
                        <Image
                            source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                            style={{ width: posterWidth, height: posterHeight, borderRadius: 16 }}
                        />
                        <Text
                            style={{
                                color: COLORS.background,
                                width: posterWidth,
                                textAlign: "center",
                                marginTop: 8,
                                fontSize: 16,
                            }}
                            numberOfLines={2}
                            ellipsizeMode="tail"
                        >
                            {item.title}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        </ScrollView>
    );
};

export default HomeScreen;
