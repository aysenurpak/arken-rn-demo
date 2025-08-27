import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity, ScrollView, TextInput, Dimensions } from "react-native";
import axios from "axios";
import { API_KEY, BASE_URL } from "../../constants/tmdb";
import COLORS from "../../constants/color";
import SIZE from "../../constants/theme";
import { Search } from "lucide-react-native";


const { width } = Dimensions.get("window");
const posterWidth = (width - 48) / 2;
const posterHeight = 220;

const DiscoverScreen = ({ navigation }) => {
    const [movies, setMovies] = useState([]);
    const [tvSeries, setTvSeries] = useState([]);
    const [documentaries, setDocumentaries] = useState([]);
    const [action, setAction] = useState([]);
    const [comedy, setComedy] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("movies");
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        const fetchDiscover = async () => {
            try {
                const moviesResponse = await axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}`);
                setMovies(moviesResponse.data.results);

                const tvResponse = await axios.get(`${BASE_URL}/discover/tv?api_key=${API_KEY}`);
                setTvSeries(tvResponse.data.results);

                const docResponse = await axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=99`);
                setDocumentaries(docResponse.data.results);

                const actionResponse = await axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`);
                setAction(actionResponse.data.results);

                const comedyResponse = await axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35`);
                setComedy(comedyResponse.data.results);

            } catch (error) {
                console.error(error);
            }
        };
        fetchDiscover();
    }, []);

    const getData = () => {
        let data;

        switch (selectedCategory) {
            case "movies":
                data = movies;
                break;
            case "tv":
                data = tvSeries;
                break;
            case "documentary":
                data = documentaries;
                break;
            case "action":
                data = action;
                break;
            case "comedy":
                data = comedy;
                break;
            default:
                data = movies;
        }

        if (searchText.trim()) {
            data = data.filter(item => (item.title || item.name).toLowerCase().includes(searchText.toLowerCase()));
        }

        return data;
    };



    return (
        <ScrollView style={{ flex: 1, backgroundColor: COLORS.darkBlue }}>
            <View style={{ marginTop: 70, marginHorizontal: 24 }}>
                <Text style={{ color: COLORS.background, fontSize: 28, marginBottom: 4 }}>
                    Find Movies, Tv series,
                </Text>
                <Text style={{ color: COLORS.background, fontSize: 28 }}>
                    and more..
                </Text>
            </View>


            <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: COLORS.darkBlue, borderRadius: 12, paddingHorizontal: 10, marginHorizontal: 16, marginBottom: 16 }}>
                <Search size={20} color="rgba(170, 170, 170, 1)" style={{ marginRight: 8 }} />
                <TextInput
                    placeholder="Sherlock Holmes"
                    placeholderTextColor="rgba(170, 170, 170, 1)"
                    value={searchText}
                    onChangeText={setSearchText}
                    style={{
                        flex: 1,
                        color: COLORS.background,
                        fontSize: 16,
                        paddingVertical: 10,

                    }}
                />
            </View>


            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: 16, marginBottom: 16 }}>
                {["Movies", "TV Series", "Documentary", "Action", "Comedy"].map((category) => (
                    <TouchableOpacity
                        key={category}
                        onPress={() => setSelectedCategory(category.toLowerCase())}
                        style={{ marginRight: 20 }}
                    >
                        <Text
                            style={{
                                color: selectedCategory === category.toLowerCase() ? COLORS.orange : COLORS.background,
                                fontSize: 16,
                            }}
                        >
                            {category}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>


            <FlatList
                data={getData()}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                scrollEnabled={false}
                contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
                columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 16 }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={{ width: posterWidth }}
                        onPress={() => navigation.navigate("DetailScreen", { id: item.id, type: selectedCategory })}
                    >
                        <Image
                            source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                            style={{ width: posterWidth, height: posterHeight, borderRadius: 12 }}
                        />
                        <Text
                            style={{ color: COLORS.background, textAlign: "center", marginTop: 8, height: 40 }}
                            numberOfLines={2}
                            ellipsizeMode="tail"
                        >
                            {item.title || item.name}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        </ScrollView>
    );
};

export default DiscoverScreen;
