import React ,{Component}from "react"
import {View,Text,StyleSheet} from "react-native"
import firebase from "firebase"
import db from "../config"
import {ListItem} from "react-native-elements";
import MyHeader from "../components/MyHeader"
import { FlatList } from "react-native-gesture-handler";

export default class BookDonateScreen extends React.Component{
    constructor(){
        super()
        this.state = {
            requestedBookList:[]
        }
         this.requestRef=null;
    }
    getRequestedBookList=()=>{
        this.requestRef=db.collection("requested_books")
        .onSnapshot((snapShot)=>{
            var requestedBookList=snapShot.docs.map(document=>document.data())
            this.setState({requestedBookList:requestedBookList})
        })
    }
    componentDidMount(){
        this.getRequestedBookList()
    }
    componentWillUnmount(){
        this.requestRef()
    }
    keyExtractor=(item,index)=>index.toString()
    renderItem=({item,i})=>{
return(
    <ListItem
key={i}
subtitle={item.reason_to_request}
title={item.bookName}
titleStyle={{color:"black",fontWeight:"bold"}}
rightElement={
    <TouchableOpacity style={styles.button} onPress={()=>{this.props.navigation.navigate("RecieverDetailsScreen" ,{'details':item})}}>
<Text style={{color:"white",fontWeight:"bold"}}>View</Text>

    </TouchableOpacity>
}
bottomDivider
    />
)
    }
    render(){
        return(
<View style={{ flex: 1}}>
<MyHeader title= 'Donate Book'/>
<View style={{ flex: 1}}>
{
this.state.requestedBookList.length===0 
?(
    <View style={{ flex: 1,fontSize:20,justifyContent:'center',alignItems: 'center'}}>
    <Text style={{fontSize:20}}>List Of All Book Requests</Text>
    </View>
)
:(
    <FlatList
    keyExtractor = {this.keyExtractor}
    data={this.state.requestedBookList}
    renderItem={this.renderItem}
    />
)
}
</View>
</View>

        )
    }
}
const styles = StyleSheet.create({
    subContainer:{
        flex:1,
        fontSize: 20,
        justifyContent:'center',
        alignItems:'center'
      },
    button: {
        width: 100,
        height: 30,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: "#ff5722",
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 8,
        }
    }
})
    