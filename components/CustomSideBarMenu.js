import React ,{Component} from "react"
import { View, Text,StyleSheet,TouchableOpacity} from "react-native"
import {DrawerItem} from 'react-native-drawer'
import {Avatar} from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker'
import firebase from "firebase"
export default class CustomSideBarMenu extends Component {
    constructor(){
        super()
        this.state={
            userId:firebase.auth().currentUser.email,
            image:'#',
            name:'',
            docId:''
        }
    }
    selectPicture=async()=>
    {
const {cancelled,uri}=await ImagePicker.launchImageLibraryAsync({
    mediaTypes:ImagePicker.MediaTypeOptions.All,
    allowesEditing:true,
    aspect:[4,3],
    quality:1
})
if(!cancelled){

    this.uploadImage(uri,this.state.userId)
}

    }
    uploadImage=async(uri,imageName)=>{
var response=await fetch(uri)
var blob=await response.blob()
var ref=firebase.storage().ref().child('user_profiles/'+imageName)
return ref.put(blob).then(response=>{
    this.fetchImage(imageName)
})
    }
    fetchImage(imageName){
var storageRef=firebase.storage().ref().child('user_profiles/'+imageName)
storageRef.getDownloadURL().then(response=>{
    this.setState({
        image:response
    })
    .catch(error=>{
        this.setState({
            image:'#'
        })
    })
})
    }
    getUserProfile(){
      db.collection('users').where('email_id','==',this.state.userId)
      .onSnapshot(snapshot=>{
          snapshot.forEach(doc=>{
              this.setState({
                  name:doc.data().first_name+' '+doc.data().last_name,
                  docId:doc.Id,
                  image:doc.data().image
              })
          })
      })
    }
    componentDidMount(){
    this.fetchImage(this.state.userId)
    this.getUserProfile(this.state.getUserProfile)
    }
    render() {
        return(
<View style={{flex:1}}>
    <View style={{flex:0.5}}>
<Avatar 
rounded source={{uri:this.state.image}}
size='medium'
onPress={()=>
this.selectPicture()

}
containerStyle={styles.imageContainer}
showEditButton

/>
<Text style={{fontWeight:'bold',padding:20,fontSize:20}}>{this.state.name}</Text>

    </View>
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
