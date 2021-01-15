import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import Http from '../../libs/http';
import CoinsItem from './CoinsItem';

class CoinsScreen extends Component{

    state = {
        coins: [],
        loading: false
    }

    componentDidMount = async () => {
        this.setState({ loading: true });
      const res = await Http.instance.get("https://api.coinlore.net/api/tickers/");

      console.log("coins", res);

      this.setState({ coins: res.data, loading: false });

    }

    handlePress = () =>{
        console.log("Go to details", this.props);

        this.props.navigation.navigate('CoinDetail');
    }

        render() {

            const { coins, loading } = this.state;

            return (
                <View style={styles.container}>
                    { loading ?
                    <ActivityIndicator 
                    style={styles.loader}
                    color="fff" 
                    size="large" />
                    :null
                } 
                    <FlatList
                        data={coins}
                        renderItem={({ item }) =>
                            <CoinsItem item={item} />
                         }
                        />
                </View>
            );
        }

}

    const styles = StyleSheet.create({
        container:{
            flex: 1,
            backgroundColor: "white",
            
        },
        btn: {
            padding: 8,
            backgroundColor: "green",
            borderRadius: 8,
            margin: 16
        },
        btn_text:{
            color: "white",
            textAlign: "center"
        },
        text_title: {
            textAlign: "center",
            fontSize: 25,
            fontWeight: "600"
        },
        loader: {
            marginTop: 60
        }

    })

export default CoinsScreen;