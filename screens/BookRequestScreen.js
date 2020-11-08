import React,{Component} from "react"
import { View, Text,TextInput,KeyboardAvoidingView,StyleSheet,TouchableOpacity,Alert } from "react-native"
import firebase from "firebase"
import db from "../config"
import MyHeader from "../components/MyHeader"

export default class BookRequestScreen extends React.Component {
    constructor(){
        super()
        this.state={
            userId:firebase.auth().currentUser.email,
            bookName:"",
            reasonToRequest:""
        }
    }
    createUniqueId() {
        return Math.random().toString(36).substring(7)
        
    }
    addRequest=(bookName,reasonToRequest)=>{
        var userId=this.state.userId
        var randomRequest=this.createUniqueId()
        db.collection("requested_books").add({
            "user_id":userId,
            "book_name":bookName,
            "reason_to_request":reasonToRequest,
            "request_id":randomRequestId
        })
        this.setState({
            bookName: "",
            reasonToRequest: ""
        })
        return Alert.alert("Book Requested Successfully")
    }
    render() {
       
        return (
            <View style={{ flex: 1 }}>
                <MyHeader title="Book Request" />
                <KeyboardAvoidingView style={styles.keyBoardStyle}>
                    <TextInput
                        style={styles.formTextInput}
                        placeholder={"Enter Book Name"}
                        onChangeText={(text) => {
                            this.setState({
                                bookName: text
                            })
                        }}
                        value={this.state.bookName}
                    />
                    <TextInput
                        style={styles.formTextInput,{height:300}}
                        placeholder={"Reason to Request"}
                        multiline
                        numberOfLines={8}
                        onChangeText={(text) => {
                            this.setState({
                                reasonToRequest: text
                            })
                        }}
                        value={this.state.reasonToRequest}
                    />
                    <TouchableOpacity style={styles.button} onPress={() => { this.addRequest(this.state.bookName, this.state.reasonToRequest) }}>
                        <Text >Request</Text>

                    </TouchableOpacity>




                </KeyboardAvoidingView>
            </View>
            
        )
    }
}
const styles=StyleSheet.create({
    keyBoardStyle : {
        flex:1,
        alignItems:'center',
        justifyContent:'center'
      },
      formTextInput:{
        width:"75%",
        height:35,
        alignSelf:'center',
        borderColor:'#ffab91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10,
      },
      button:{
        width:"75%",
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        backgroundColor:"#ff5722",
        shadowColor: "#000",
        shadowOffset: {
           width: 0,
           height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
        marginTop:20
        },
      }
    )
