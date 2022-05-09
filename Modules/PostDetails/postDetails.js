import React, { Component } from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView, Dimensions, TouchableOpacity, FlatList } from 'react-native'
import { Avatar } from "react-native-elements";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
import axios from 'axios';
import ViewMoreText from 'react-native-view-more-text';
console.disableYellowBox = true;

export default class PostDetailsScreenView extends Component {

    // static navigationOptions = ({ navigation }) => ({
    //     title: "Post Details",
    //     headerStyle: {
    //         backgroundColor: '#003967'
    //     },
    //     headerTintColor: '#fff',

    //     headerTitleStyle: {
    //         fontSize: 20
    //     }
    // })

    constructor() {
        super();
        this.state = {
            value: '',
            postDetails: {},
            userId: '',
            allComments: [],
        }
    }

    componentDidMount = async () => {
        await this.getData()
        await this.getAllComments()

    }

    getData = async () => {
        let url = `https://jsonplaceholder.typicode.com/posts/` + this.state.value
        axios.get(url)
            .then(response => {
                if (response.status == 200) {
                    this.setState({
                        postDetails: response.data
                    })
                }


            })
            .catch(function (error) {
                alert(error)
            });
    }
    getAllComments = async () => {
        let url = `https://jsonplaceholder.typicode.com/posts/` + this.state.value + `/comments`
        axios.get(url)
            .then(response => {
                if (response.status == 200) {
                    this.setState({
                        allComments: response.data
                    })
                }
                console.log(response.data)

            })
            .catch(function (error) {
                alert(error)
            });
    }

    renderViewMoreComments = (onPress) => {
        return (
            <Text onPress={onPress} style={{ fontSize: 12,  color: '#003967', width: 80 }}>
                Read more..
            </Text>
        )
    }

    renderViewLessComments = (onPress) => {
        return (
            <Text onPress={onPress} style={{ fontSize: 12,  color: '#003967', width: 80 }}>
                Read less..
            </Text>
        )
    }

    renderAllComments = (data, index) => {
        return (
            <View>
                <View style={{ backgroundColor: 'white', paddingLeft: '2.5%', paddingRight: '2.5%', paddingVertical: '1.5%' }}>
                    <View style={{ flexDirection: 'row' }}>

                        <View style={{ width: '9%' }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Avatar
                                    rounded
                                    source={{ uri: 'https://via.placeholder.com/150/92c952' }}
                                    size={28}
                                />
                            </View>
                        </View>

                        <View style={{ paddingLeft: 2, width: '91%', }}>

                            <View style={{ backgroundColor: '#E7EDF2', paddingHorizontal: 5, borderRadius: 5 }}>
                                <View style={{ marginVertical: '2%' }}>
                                    <View style={{ flexDirection: 'row', }}>
                                        <View style={{ width: '95%' }}>
                                            <Text style={{ fontSize: 14, color: '#6A6A6A' }}>
                                                {data.name}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ }}>
                                        <Text style={{ color: '#6A6A6A', fontSize: 10,}}>
                                            {data.email}
                                        </Text>
                                    </View>
                                    <View>
                                        <ViewMoreText
                                            numberOfLines={3}
                                            renderViewMore={this.renderViewMoreComments}
                                            renderViewLess={this.renderViewLessComments}
                                            textStyle={{ textAlign: 'justify' }}
                                        >
                                        <Text style={{ fontSize: 12, textAlign: 'justify' }}>
                                            {data.body}
                                        </Text>
                                        </ViewMoreText>
                                    </View>
                                </View>

                            </View>
                        </View>

                    </View>
                </View>
            </View>
        )
    }

    render() {

        const { navigation } = this.props;
        this.state.value = this.props.route.params.data
        
        return (
            <View style={styles.backgroundContainer}>

                <KeyboardAvoidingView>
                    <View style={{ backgroundColor: 'white', paddingLeft: '2.5%', paddingRight: '2.5%', paddingVertical: '1.5%' }}>
                        {/* <ScrollView style={{}} > */}

                        <View style={{ justifyContent: 'center', }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ justifyContent: 'center', width: '50%' }}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: '2%' }}>
                                        <Avatar

                                            size={155}
                                            source={{ uri: 'https://via.placeholder.com/600/92c952' }} />
                                    </View>
                                </View>
                                <View style={{ width: '50%' }}>
                                    <View>
                                        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                                            {this.state.postDetails.title}
                                        </Text>
                                    </View>
                                    <View style={{ justifyContent: 'center', paddingTop: '2%', paddingBottom: '2%' }}>
                                        <Text style={{ fontSize: 14, }}>
                                            {this.state.postDetails.body}
                                        </Text>
                                    </View>

                                    {/* <View style={{ flexDirection: 'row', paddingTop: '2%' }}>
                                        <View style={{ justifyContent: 'flex-start' }}>
                                            <Icon_Entypo name={'location-pin'} size={25} style={{ color: 'black' }} />
                                        </View>
                                        <View style={{ paddingLeft: '2%' }}>
                                            <Text style={{ fontSize: 14, }}>
                                                {this.state.value.Country}
                                            </Text>
                                        </View>
                                    </View> */}

                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{ height: '83.3%', }}>

                        <View style={{ backgroundColor: 'white', width: deviceWidth, height: deviceHeight * 0.06 }}>
                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                <View style={{ justifyContent: 'center' }}>
                                    <Text style={{ paddingLeft: 7, color: '#003967', fontSize: 17, fontFamily: 'Muli-Bold' }}>
                                        Comments
                                        </Text>
                                </View>

                                {/* <View style={{ position: 'absolute', right: 10, top: 0, bottom: 0, justifyContent: 'center' }}>
                                        <TouchableOpacity onPress={() => this.closeCommentsModal()}>
                                            <Icon_AntDesign name={'close'} size={25} color={'#6A6A6A'} />
                                        </TouchableOpacity>
                                    </View> */}
                            </View>
                        </View>

                        <View style={{ paddingVertical: 1.5 }} />

                        <View style={{ height: '61%', }}>


                            <KeyboardAvoidingView>
                                <FlatList
                                    data={this.state.allComments}
                                    renderItem={({ item, index }) => this.renderAllComments(item, index)}
                                    keyExtractor={(item, index) => {
                                        return `${item}-${index}`;
                                    }}
                                    horizontal={false}
                                    showsVerticalScrollIndicator={false}
                                    showsHorizontalScrollIndicator={false}
                                />
                            </KeyboardAvoidingView>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    backgroundContainer: {
        backgroundColor: 'white',
        // alignItems: 'center',
        flex: 1,
    },

});