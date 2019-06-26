import React from 'react'
import { Image, TouchableHighlight, FlatList, View, TextInput, ScrollView, Text, StyleSheet } from 'react-native';

// import Movie from './Movie';
import { fetchMovies } from '../utils/api.js'

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            movies: null,
            isFetching: false
        }
    }

    static navigationOptions = {
        title: 'Movies',
    };


    componentWillUpdate(nextProps, nextState) {
        if (nextState.text != this.state.text) {
            if (nextState.text.length > 2) {
                clearTimeout(timer)
                const timer = setTimeout(() => {
                    return this.getMovies(this.state.text)
                }, 500)

            } else {
                this.setState({ movies: null })
            }
        }
        else { return }
    }

    getMovies = async (text) => {
        const results = await fetchMovies(text)
        this.setState({ movies: results, isFetching: false })
    }

    renderItem = (movie) => {
        const { item } = movie
        return (
            <TouchableHighlight style={styles.touchable} underlayColor='#ddd' onPress={() => { this.props.navigation.navigate('Movie', { title: item.title, img: item.img, id: item.imdbID }) }} style={styles.touchable}>
                <View style={styles.view}>
                    <Image
                        style={styles.img}
                        source={item.img ? { uri: item.img } : { uri: 'https://banner2.kisspng.com/20180216/kee/kisspng-photographic-film-reel-clip-art-movie-film-5a8677562304e0.0541516415187618141435.jpg' }}
                        resizeMode='stretch'
                    />
                    <View style={styles.column}>
                        <Text style={styles.title}>{item.title}</Text>
                        <View style={styles.row}>
                            <Text>({item.year})</Text>
                            <Text>&nbsp;{item.type}</Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }

    keyExtractor = (movie, index) => movie.id;

    render() {
        return (
            <View style={StyleSheet.absoluteFill}>
                <TextInput
                    style={styles.textinput}
                    autoCorrect={false}
                    autoCapitalize='none'
                    autoFocus maxLength={45}
                    placeholder='enter movie name...'
                    onChangeText={(text) => this.setState({ text })} value={this.state.text}
                />
                {this.state.movies ?
                    <FlatList
                        style={styles.flatlist}
                        data={this.state.movies}
                        renderItem={this.renderItem}
                        keyExtractor={(item) => item.img + item.title + item.imdbID}
                    >
                    </FlatList>
                    :
                    <Text style={{ alignSelf: 'center', paddingTop: 100, maxWidth: 250, justifyContent: 'center', color: 'grey', fontStyle: 'italic' }}>waiting for you...</Text>
                }
            </View >

        )
    }

}

{/* <Button title='home' onPress={() => this.props.navigation.navigate('Movie')} /> */ }

const styles = StyleSheet.create({
    textinput: {
        backgroundColor: '#fff',
        // borderWidth: 1,
        // borderRadius: 3,
        // borderColor: 'black',
        padding: 8,
    },
    flatlist: {
        backgroundColor: 'lightgrey',
    },
    touchable: {
        backgroundColor: 'lightgrey',
    },
    img: {
        marginRight: 10,
        height: 69.833333335,
        width: 50,
        backgroundColor: 'grey'
    },
    view: {
        margin: 10,
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        flexWrap: 'wrap',
        maxWidth: 300
    },
    column: {
        flex: 1,
        flexDirection: 'column',
    },
    row: {
        flex: 1,
        flexDirection: 'row',
    },
});