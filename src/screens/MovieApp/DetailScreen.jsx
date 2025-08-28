import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Dimensions, Image, StatusBar, Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { API_KEY, BASE_URL } from "../../constants/tmdb";
import COLORS from "../../constants/color";
import SIZE from "../../constants/theme";
import styles from '../../styles/MovieApp/DetailScreenStyle';
import { Clock, Star } from "lucide-react-native";


const DetailScreen = () => {
    const route = useRoute();
    const { id } = route.params;
    const [movieDetails, setMovieDetails] = useState(null);

    const formatRuntime = (mins) => {
        const hours = Math.floor(mins / 60);
        const minutes = mins % 60;
        return `${hours}h ${minutes}m`;
    };

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


    if (!movieDetails) {
        return <ActivityIndicator size="large" color={COLORS.background} style={{ flex: 1, justifyContent: "center", alignItems: "center" }} />;
    }

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.darkBlue }}>
            <StatusBar barStyle="dark-content" />

            <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${movieDetails?.backdrop_path}` }}
                style={{ width: "100%", height: Dimensions.get("window").height / 3 }}
                resizeMode="cover"
            />

            <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 12 }}>
                <Text style={{ color: COLORS.background, fontSize: 27, fontWeight: "bold" }}>
                    {movieDetails?.title}
                </Text>

                <View style={[styles.container, styles.badgeContainer, { marginLeft: SIZE.xSmall }]}>
                    <Text style={{ color: COLORS.background, fontWeight: "bold" }}>4K</Text>
                </View>
            </View>


            <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 8 }}>
                <Clock size={16} color={COLORS.background} style={{ marginRight: 4 }} />
                <Text style={{ color: COLORS.background, marginRight: 16 }}>
                    {formatRuntime(movieDetails?.runtime)}
                </Text>

                <Star size={16} color={COLORS.yellow} />
                <Text style={{ color: COLORS.background, marginLeft: 4 }}>
                    {movieDetails?.vote_average.toFixed(1)}
                </Text>
            </View>





            <View style={{ padding: SIZE.medium }}>

                <Text style={{ color: COLORS.background, marginTop: SIZE.small, fontWeight: "bold" }}>Genre</Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap", marginVertical: 12 }}>
                    {movieDetails?.genres.length > 0 && movieDetails?.genres.map((genre) => (
                        <View key={genre.id} style={[styles.container, styles.genreContainer]}>
                            <Text style={{ color: COLORS.background, fontWeight: "bold" }}>{genre.name}</Text>
                        </View>
                    ))}

                </View>






                <Text style={{ color: COLORS.background, marginTop: SIZE.small, fontWeight: "bold" }}>Synopsis</Text>
                <Text style={{ color: COLORS.background, marginTop: SIZE.small }}>{movieDetails?.overview}</Text>


                <Text style={{ color: COLORS.background, marginTop: SIZE.small, fontWeight: "bold" }}>Production Companies</Text>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: SIZE.small }}>
                    {movieDetails?.production_companies
                        ?.filter((c) => c.logo_path)
                        .map((company) => (
                            <View
                                key={company.id}
                                style={{ backgroundColor: COLORS.gray, borderRadius: SIZE.small, padding: 10, marginRight: 12, alignItems: "center", justifyContent: "center" }}>
                                <Image
                                    source={{ uri: `https://image.tmdb.org/t/p/w200${company.logo_path}` }}
                                    style={{ width: 80, height: 40, resizeMode: "contain" }}
                                />
                            </View>
                        ))}
                </ScrollView>


            </View>



        </View>
    );
}

export default DetailScreen;