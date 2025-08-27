import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Dimensions, Image, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { API_KEY, BASE_URL } from "../../constants/tmdb";
import COLORS from "../../constants/color";
import SIZE from "../../constants/theme";

const DetailScreen = () => {
    const route = useRoute();
    const { id } = route.params;
    const [movieDetails, setMovieDetails] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
                .then((response) => {
                    console.log("Movie Details:", response.data);
                    setMovieDetails(response.data);
                }).catch((error) => {
                    console.error("Error fetching movie details:", error);
                    Alert.alert("Error", "Failed to fetch movie details.");
                }).finally(() => {
                    console.log("Fetch movie details request completed.");
                });
            } catch (error) {
                Alert.alert("Error", "Failed to fetch movie details. Invalid Id.");
            }
        }

        fetchMovieDetails()
    }, [id]);


    if (!movieDetails) {
        return <ActivityIndicator size="large" color={COLORS.background} style={{flex: 1, justifyContent: "center", alignItems: "center"}} />;
    }

    return (
        <View style={{flex: 1, backgroundColor: COLORS.darkBlue}}>
            <StatusBar barStyle="dark-content"/>

            <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${movieDetails?.backdrop_path}` }}
            style={{ width: "100%", height: Dimensions.get("window").height / 3 }}
            resizeMode="cover"
            />

            <View style={{padding: SIZE.medium}}>
                <Text style={{ color: COLORS.background, fontSize: 27 }}>{movieDetails?.title}</Text>
                <Text style={{ color: COLORS.background }}>{movieDetails?.vote_average.toFixed(1)}</Text>
                {
                    movieDetails?.genres.length > 0 && movieDetails?.genres.map((genre) => (
                        <Text key={genre.id} style={{ color: COLORS.background }}>{genre.name}</Text>
                    ))
                }
            </View>
        </View>
    );
}

export default DetailScreen;