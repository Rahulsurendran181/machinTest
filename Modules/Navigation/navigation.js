import React from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PosterScreenView from '../Post/post';
import PostDetailsScreenView from '../PostDetails/postDetails';

const Stack = createNativeStackNavigator();


class NavigationView extends React.Component {

    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName={'postScreen'}>
                    <Stack.Screen name="postScreen"
                        options={{
                            title: 'Posts',
                            headerStyle: {
                                backgroundColor: '#003967',
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                        }}
                        component={PosterScreenView} />
                    <Stack.Screen name="postDetailsScreen"
                        options={{
                            title: 'Post Details',
                            headerStyle: {
                                backgroundColor: '#003967',
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                        }}
                        component={PostDetailsScreenView} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

// const ScreenStack = () => {
//     return (

//         <Stack.Navigator initialRouteName={'postScreen'}>
//             <Stack.Screen name="postScreen" component={PosterScreenView} />
//             <Stack.Screen name="postDetailsScreen" component={PostDetailsScreenView} />
//         </Stack.Navigator>

//     );
// }

const styles = StyleSheet.create({
    backgroundContainer: {
        backgroundColor: '#F6F4EA',
        alignItems: 'center',
        flex: 1,
    }
});

export default NavigationView;