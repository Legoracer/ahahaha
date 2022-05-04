import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';

const Home = ({ navigation, route }) => {
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

    useEffect(() => {
        getQuote();
    }, []);

    return (
        <View style={styles.main}>
            <View style={{padding: 20}}>
                <Text style={styles.quote}>{isLoadingQuote ? "" : quote}</Text>
                <Text style={styles.quoteAuthor}>-Random Marvel quote</Text>
            </View>
            <Button
                style={{ width: 200 }}
                title="ENTER"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
                onPress={() => { console.log(navigation); navigation.navigate('Movies') }}
            />
        </View>

    )
};

const styles = StyleSheet.create({
    main: {
        padding: 50,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
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

export default Home;