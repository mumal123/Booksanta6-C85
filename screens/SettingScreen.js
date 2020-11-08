import React,{Component} from "react"
import {View,Text, Alert,TouchableOpacity,TextInput,StyleSheet} from "react-native"

import MyHeader from "../components/MyHeader"
export default class SettingScreen extends Component{
    constructor(){
        super()
        this.state={
emailId:"",
firstName:"",
lastName:"",
contact:"",
address:"",
docId:""
        }
    }
    getUsersDetail(){
        var user=firebase.auth().currentUser
        var email=user.email
        db.collection("users").where("email_id","==",email).get()
        .then(snapShot=>{
            var data=doc.data()
            this.setState({
                emailId:data.email_id,
                firstName:data.first_name,
                lastName:data.last_name,
                contact:data.contact,
                address:data.address,
                docId:doc.Id
            })
        })
    }
    componentDidMount(){
        this.getUsersDetail()
    }
    updateUsersDetail=()=>{
        db.collection("users").doc(this.state.docId)
        .update({
            'first_name':this.state.firstName,
            'last_name':this.state.lasttName,
            'contact':this.state.contact,
            'address':this.state.address
        })
        Alert.alert("Profile Updated Successfully")
    }
    render(){
        return(
            <View style={styles.container}>
<MyHeader title ="Settings" 
navigation={this.props.navigation}
/>
<View style={styles.formContainer}>
<TextInput style={styles.formTextInput}
placeHolder={"First Name"}
maxLength={8}
onChangeText={(text)=>{
    this.setState({
        firstName:text
    })
}}
value={this.state.firstName}
/>
<TextInput style={styles.formTextInput}
placeHolder={"Last Name"}
maxLength={8}
onChangeText={(text)=>{
    this.setState({
        lastName:text
    })
}}
value={this.state.lastName}
/>
<TextInput style={styles.formTextInput}
placeHolder={"Contact"}
maxLength={10}
keyboardType={"numeric"}
onChangeText={(text)=>{
    this.setState({
        contact:text
    })
}}
value={this.state.contact}
/>
<TextInput style={styles.formTextInput}
placeHolder={"Address"}
multiLine={true}

onChangeText={(text)=>{
    this.setState({
       address :text
    })
}}
value={this.state.address}
/>
<TouchableOpacity style={styles.button} onPress={()=>{
    this.updateUsersDetail()
}}>
<Text style={styles.buttonText}>Save</Text>

</TouchableOpacity>

</View>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        alignItems:"center",
        justifyContent:"center",
        flex:1
    },
    formContainer:{
        flex:1,
        width:"100%",
        alignItems:"center"
    },
    formTextInput:{
        width:"35%",
        height:35,
        alignSelf:"center",
        borderColor:"#ffab91",
        borderRadius:10,
        borderWidth:1,
        marginTop:10,
        padding:10
    },
    button: {
        width: 300,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: "#ff9800",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.30,
        shadowRadius: 10.32,
        elevation: 16,
        padding: 10
    },
    buttonText: {
        color: '#ffff',
        fontWeight: '200',
        fontSize: 20
    }
})


