import React,{Component} from "react"
import {View,Text,FlatItem,ScroolView,TouchableOpacity,StyleSheet} from "react-native"
import { FlatList } from "react-native-gesture-handler"
import {ListItem,Card,Icon} from 'react-native-elements'
import MyHeader from "../components/MyHeader"
export default class MyDonationScreen extends Component{
    static navigationOptions={header:null}
    constructor(){
        super()
        this.state={
userId:firebase.auth().currentUser.email,
allDonations:[],
donorName:''
        }
        this.requestRef=null
    }
    getAllDonations=()=>
    {
        this.requestRef=db.collection('all_donations').where('donor_id','==',this.state.userId)
        .onSnapshot(snapshot=>{
            var allDonations=snapshot.doc.map(document=>document.data())
            this.setState({
                allDonations:allDonations
            })
        })
    }
    componentDidMount(){
        this.getDonorDetails(this.state.donorId)
        this.getAllDonations()
    }
    componentWillUnmount(){
        this.requestRef()
    }
    sendBook=(bookDetails)=>{
if(bookDetails.request_status==='Book Sent'){
    var requestStatus='Donor Interseted'
    db.collection('all_donations').doc(bookDetails.doc_id).update({
        'request_status':'Donor Interseted'
    })
    this.sendNotifications(bookDetails,requestStatus)
}
else{
    var requestStatus='Book Sent'
    db.collection('all_donations').doc(bookDetails.doc_id).update({
        'request_status':'Book Sent'
    })
    this.sendNotifications(bookDetails,requestStatus)
}

    }
    sendNotifications=(bookDetails,requestStatus)=>{
        var requestId=bookDetails.request_id
       var donorId=bookDetails.donor_id
       db.collection('all_notifications').where('request_id','==',requestId)
       .where('donor_id','==',donorId).get()
       .then((snapshot)=>{
           snapshot.forEach(doc=>{
               var message=''
               if(requestStatus==='Book Sent'){
                   message=this.state.donorName + ' sent you the book'
               }
               else{
                   message=this.state.donorName + ' has shown interest in donating the book'
               }
               db.collection('all_notifications').doc(doc.id).update({
                   'message':message,
                  ' notification_status':'unread',
                  'date':firebase.firestore.FieldValue.serverTimestamp()
               })
           })
               
           });
       }
    
    getDonorDetails=(donorId)=>{
        db.collection('users').where('email_id','==',donorId).get()
        .then((snapshot)=>{
            snapshot.forEach(doc=>{
                this.setState({
                    donorName:doc.data().first_name+ ' '+doc.data().last_name
                })
            })
        })
    }
    keyExtractor=(item,index)=>index.toString()
    renderItem=({item,i})=>(
        <ListItem
        key={i}
        title={item.book_name}
        subtitle={'requested by'+ item.requested_by +'\n status:'+item.request_status }
leftElememt={<Icon name='book' type='font-awesome' color='#696969'/>}
titleStyle={{color:'black', fontWeight:'bold'}}
rightElememt={<TouchableOpacity style={[styles.button,{backgroundColor:item.request_status==='Book Sent'?'green':'#ff5722'}]}
onPress={()=>{
    this.sendBook(item)
}}
>
    <Text style={{color:'white'}}>{item.request_status==='Book Sent'?'Book Sent':'Send Book'}</Text>
    </TouchableOpacity>}
    bottomDivider
         />
    )
    render(){
        return(
            <View style={{flex:1}}>
<MyHeader navigation={this.props.navigation}
title='My donations'/>
<View style={{flex:1}}>
{
    this.state.allDonations.length===0
    ?(
        <View style={styles.subtitle}>
            <Text style={{fontSize:20}}>List Of All Book Donations</Text>
             </View>
    )
    :(
        <FlatList keyExtractor={this.keyExtractor} data={this.state.allDonations} renderItem={this.renderItem}/>
    )
}
</View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    button:{
      width:100,
      height:30,
      justifyContent:'center',
      alignItems:'center',
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8
       },
      elevation : 16
    },
    subtitle :{
      flex:1,
      fontSize: 20,
      justifyContent:'center',
      alignItems:'center'
    }
  })