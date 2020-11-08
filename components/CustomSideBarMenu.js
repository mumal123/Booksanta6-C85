import React ,{Component} from "react"
import { View, Text,StyleSheet,TouchableOpacity} from "react-native"
import {DrawerItem} from 'react-native-drawer'
import firebase from "firebase"
export default class CustomSideBarMenu extends Component {
    render() {
        return(
<View style={styles.container}>
<View style={styles.drawerItemContainer}>
<DrawerItem {...this.props} />
</View>
<View style={styles.logoutContainer}>
<TouchableOpacity onPress={() =>{ 
    firebase.auth().signOut();
    this.props.navigation.navigate('WelcomeScreen')
}}>
    <Text>Logout</Text>
</TouchableOpacity>
</View>
</View>
        )
    }
}