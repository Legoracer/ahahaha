import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';

const MoviesScreen = ({ navigation, route }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=63e7dfa5af9af86b75b62b105ea47f71")
      const json = await response.json();
      console.log(json)
      setData(json.results)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    isLoading ?
      <View style={{ padding: 20 }}>
        <ActivityIndicator />
      </View> :

      <View>
        <FlatGrid
          itemDimension={200}
          data={data}
          renderItem={
            ({ item }) => (
              <View>
                <TouchableOpacity onPress={
                  () => { navigation.navigate('Movie', { id: item.id }) }
                }>
                  <Image
                    style={styles.gridItem}
                    source={{ uri: `https://image.tmdb.org/t/p/original/${item.poster_path}` }}>
                  </Image>
                </TouchableOpacity>
                <Text>{data.title}</Text>
              </View>
            )
          }
        />
      </View>

  )
};

const styles = StyleSheet.create({
  mainGrid: {
    flex: 1,
  },

  gridItem: {
    justifyContent: 'center',
    aspectRatio: 0.75
  },

  quote: {
    fontSize: 25,
    fontStyle: 'italic',
  },

  quoteAuthor: {
    fontSize: 20,
  }
});

export default MoviesScreen;