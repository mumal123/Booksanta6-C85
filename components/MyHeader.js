import React, { Component } from 'react';
import {Header,Badge,Icon} from "react-native-elements"

export default class MyHeader extends Component{
constructor(){
    super()
    this.state={
        value:''
    }
}
getNumberOfNotification(){
    db.collection('all_notifications').where('notification_status','==','unread')
    .onSnapshot((snapshot)=>{
        var unreadNotifications=snapshot.docs.map((doc)=>doc.data())
        this.setState({
            value:unreadNotifications.length
        })
    })
}
componentDidMount(){
    this.getNumberOfNotification()


}

 BellIconWithBadge=(props)=>{
return(
    <View>
        <Icon name='bell' type='font-awesome' color='#696969' size={25} onPress={()=>
            this.props.navigation.navigate('Notifications')
        }/>
        <Badge value={this.state.value} containerStyle={{position:'absolute', top:-4,  right:-4}}/>
    </View>
)
}
render(){
    return(
        <Header 
        leftComponent={<Icon name='bars' type='font-awesome' color='#696969' onPress={()=>
            this.props.navigation.toggleDrawer
        }/>}
        rightComponent={<BellIconWithBadge {...this.props}/>}
        centerComponent={{ text: this.props.title, style: { color: "#90a5a9", fontSize:20 ,fontWeight: "bold"}}}
            backgroundColor="#eaf8fe"
        />
    )
}

}
