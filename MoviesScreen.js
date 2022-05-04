import React, { useEffect, useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native-web';
import { FlatGrid } from 'react-native-super-grid';

class Movies {

}
const MoviesScreen = ({ navigation, route }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const [isLoadingQuote, setLoadingQuote] = useState(true);
  const [quote, setQuote] = useState([]);

  const getQuote = async () => {
    try {
      const response = await fetch("https://randommarvelquoteapi.herokuapp.com/")
      const json = await response.json();
      setQuote(json.quote)
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingQuote(false);
    }
  }

  const getMovies = async () => {
    try {
      const response = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=63e7dfa5af9af86b75b62b105ea47f71")
      const json = await response.json();
      setData(json.results)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMovies();
    getQuote();
  }, []);

  return (
    isLoading || isLoadingQuote ?
      <View style={{ padding: 20 }}>
        <ActivityIndicator />
      </View> :

      <View>
        <View style={{padding: 20}}>
          <Text style={styles.quote}>"{quote}"</Text>
          <Text style={styles.quoteAuthor}>-Random Marvel quote</Text>
        </View>

        <FlatGrid
        style={styles.mainGrid}
        itemDimension={200}
        data={data}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity onPress={
              () => { navigation.navigate('Movie', { id: item.id }) }
            }>
              <Image
                style={styles.gridItem}
                source={{ uri: `https://image.tmdb.org/t/p/original/${item.poster_path}` }}>
              </Image>
            </TouchableOpacity>
            <Text>{data.poster_path}</Text>
          </View>
        )}
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
    textAlign: 'center',
    aspectRatio: 0.75
  },

  quote: {
    fontSize: 25,
    fontStyle: 'italic',
    textAlign: 'center'
  },

  quoteAuthor: {
    fontSize: 20,
    textAlign: 'center'
  }
});

export default MoviesScreen;