import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TextInput, KeyboardAvoidingView, Dimensions, TouchableOpacity, AsyncStorage, FlatList, Button, ActivityIndicator } from 'react-native'
import Icon_AntDesign from 'react-native-vector-icons/AntDesign'
import axios from 'axios';
import Modal from 'react-native-modal';

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;


export default class PosterScreenView extends Component {

    // static navigationOptions = ({ navigation }) => ({
    //     title: "Posts",
    //     headerStyle: {
    //         backgroundColor: '#003967'
    //     },
    //     headerTintColor: '#fff',
    //     // headerBackground: '',
    //     headerTitleStyle: {
    //         fontSize: 20
    //     },

    // })



    constructor() {
        super();
        this.state = {
            myList: [],
            isAddPostModalVisible: false,
            title: '',
            bodyInfo: '',
            spinnerStatus: false,
            buttonSpinner: false
        }
    }

    async componentDidMount() {
        
        await this.getData()

    }

    getData = async () => {
        this.setState({
            spinnerStatus: true
        })
        let url = `https://jsonplaceholder.typicode.com/posts`
        axios.get(url)
            .then(response => {
                if (response.status == 200) {
                    this.setState({
                        myList: response.data,
                        spinnerStatus: false
                    })
                }


            })
            .catch(function (error) {
                alert(error)
            });
    }


    openAddPostModalVisible = () => {

        this.setState({
            isAddPostModalVisible: true,
            title: '',
            bodyInfo: ''
        })

    }

    closeAddPostModalVisible = () => {

        this.setState({
            isAddPostModalVisible: false,
            buttonSpinner: false,
            title: '',
            bodyInfo: ''
        })

    }

    updateTitle = (text) => {
        this.setState({
            title: text
        })
    }

    updateBody = (text) => {
        this.setState({
            bodyInfo: text
        })
    }

    addNewPost = async () => {
        this.setState({
            buttonSpinner: true
        })
        let url = 'https://jsonplaceholder.typicode.com/posts'
        let postJson = JSON.stringify({
            title: this.state.title,
            body: this.state.bodyInfo,
            userId: 1
        })

        axios.post(url, postJson, {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then((resp) => {
                if ((resp.status == 200 || resp.status == 201)) {
                    this.closeAddPostModalVisible()
                    this.getData()
                }
            })
            .catch((err) => {
                console.log(err)

            })
    }

    renderMyList = (item, index) => {
        return (
            <View>
                <View style={styles.renderListContainer}>
                    <View style={{}}>
                        <View style={{ flexDirection: 'row', }}>

                            <View style={{ justifyContent: 'center' }} >
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('postDetailsScreen', { 'data': item.id })} >
                                    <View style={{ flexDirection: 'row', }}>
                                        <View>
                                            <Text style={{ fontSize: 14 }}>
                                                {item.title}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>

                                <View>
                                    <View style={{ marginTop: 10 }} />
                                    <View
                                        style={{ width: '100%', borderBottomWidth: 0.5, }}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>

                </View>
            </View>
        )
    }



    render() {
        return (
            <View style={styles.backgroundContainer}>

                <KeyboardAvoidingView>
                    <View style={styles.addPost}>

                        <TouchableOpacity style={styles.button} onPress={() => this.openAddPostModalVisible()}>
                            <Text style={styles.text}>
                                Click here for Add New Post
                        </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        {this.state.spinnerStatus ?
                            <View style={{ justifyContent: 'center' }}>
                                <ActivityIndicator size="small" color={'#003967'} />
                            </View>
                            :
                            <View >
                                {this.state.myList.length > 0 ?
                                    <View >
                                        <FlatList
                                            data={this.state.myList}
                                            renderItem={({ item, index }) => this.renderMyList(item, index)}
                                            onEndReachedThreshold={0.7}
                                        />
                                    </View>
                                    :
                                    <View>
                                        <Text>Loading ...</Text>
                                    </View>
                                }
                            </View>
                        }

                    </View>
                    {/* Open Add Post Modal */}
                    <Modal isVisible={this.state.isAddPostModalVisible} style={{ justifyContent: 'center', alignItems: 'center' }} backdropOpacity={0.15} onBackButtonPress={() => this.closeAddPostModalVisible()} onBackButtonPress={() => this.closeAddPostModalVisible()}>
                        <View style={{ borderRadius: 5, backgroundColor: 'white', paddingHorizontal: 10, paddingBottom: 15, paddingTop: 10 }}>
                            <View style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                                <TouchableOpacity onPress={() => this.closeAddPostModalVisible()}>
                                    <Icon_AntDesign name={'closecircle'} size={20} color={'#003967'} />
                                </TouchableOpacity>
                            </View>

                            <View>
                                <View>
                                    <Text style={{ color: '#6A6A6A', fontSize: 14, }}>
                                        Title
                </Text>
                                </View>
                                <View>
                                    <TextInput
                                        style={styles.inputTitleText}
                                        value={this.state.title}
                                        placeholder={"Write your title here.."}
                                        onChangeText={(text) => this.updateTitle(text)}
                                    />
                                </View>
                            </View>

                            <View style={{ marginTop: 5 }} />

                            <View>
                                <View>
                                    <Text style={{ color: '#6A6A6A', fontSize: 14, }}>
                                        Body
                                    </Text>
                                </View>
                                <View>
                                    <TextInput
                                        style={styles.inputBodyText}
                                        underlineColorAndroid="transparent"
                                        placeholder={"Write your body here.."}
                                        placeholderTextColor={"#9E9E9E"}
                                        numberOfLines={10}
                                        multiline={true}
                                        value={this.state.bodyInfo}
                                        onChangeText={(text) => this.updateBody(text)}
                                    />
                                </View>
                            </View>

                            <View style={{ marginTop: 10 }} />
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                {this.state.buttonSpinner ?
                                    <TouchableOpacity style={styles.button} >
                                        <ActivityIndicator size="small" color={'white'} />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity style={styles.button} onPress={() => this.addNewPost()}>
                                        <Text style={styles.text}>
                                            Add Post
                                    </Text>
                                    </TouchableOpacity>
                                }
                            </View>
                            <View style={{ marginTop: 5 }} />
                        </View>
                    </Modal>
                </KeyboardAvoidingView>
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    backgroundContainer: {
        backgroundColor: 'white',
        alignItems: 'center',
        // flex: 1,
    },

    renderListContainer: {
        backgroundColor: 'white',
        paddingLeft: '0.5%',
        paddingRight: '0.5%',
        paddingVertical: '1.5%'
    },
    bottomStyleContainer: {
        width: '100%',
        borderBottomWidth: 0.5,
        marginBottom: 10
    },
    button: {
        width: deviceWidth - 155,
        fontSize: 12,
        backgroundColor: '#003967',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    text: {
        color: 'white',
        fontSize: 12,
        paddingTop: 7,
        paddingBottom: 7,
        textAlign: 'center',
    },
    addPost: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    inputTitleText: {
        borderRadius: 4,
        borderColor: '#6A6A6A',
        borderWidth: 0.7,
        height: 35,
        width: deviceWidth - 40,
        paddingVertical: 1,
        fontSize: 14,
    },
    inputBodyText: {
        borderRadius: 4,
        borderColor: '#6A6A6A',
        borderWidth: 0.7,
        height: 35,
        width: deviceWidth - 40,
        paddingVertical: 1,
        textAlignVertical: 'top',
        height: 60,
        fontSize: 14,
    }

});