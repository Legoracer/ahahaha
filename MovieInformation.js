import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';

const MovieInformation = ({ navigation, route }) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const { id } = route.params;
    console.log(id)
    const getMovie = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=63e7dfa5af9af86b75b62b105ea47f71`)
            const json = await response.json();
            navigation.setOptions({ title: json.title })
            setData(json)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getMovie();
    }, []);

    return (
        isLoading ?
            <View style={{ padding: 20 }}>
                <ActivityIndicator />
            </View> :

            <View style={{ flex: 1, flexDirection: 'row', padding: 10 }}>
                <View style={styles.thumbContainer}>
                    <Image source={{ uri: `https://image.tmdb.org/t/p/original/${data.poster_path}` }} style={styles.thumbnail} />
                </View>

                <View>
                    <Text style={{ fontSize: '30px' }}>{data.title}</Text>
                    <Text style={{ fontSize: '18px', width: 'calc(70%-300px)'}}>{data.overview}</Text>

                </View>
            </View>
    );
};

const styles = StyleSheet.create({
    thumbContainer: {
        width: 250,
        height: 400
    },
    thumbnail: {
        width: '15em',
        aspectRatio: 0.75
    }
});

export default MovieInformation;