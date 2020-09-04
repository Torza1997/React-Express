import React from 'react';
import {observer  } from 'mobx-react';
import './App.css';
import TEST from './component/page/insertdata';
import UserStore from './store/UserStore';
import LoginFrom  from "./component/loginForm/login";
import InputField  from "./component/loginForm/inputField";
import  SubmitButton  from "./component/loginForm/submit";

class  App extends React.Component {
  async componentDidMount(){
      try{
        let res =await fetch('/isLoggedIn',{
          method:'POST',
          headers:{
            'Accecpt':'application/json',
            'content-type':'app;ication/json'
          }
        });
        let result = await res.json();
        if(result && result.success){
            UserStore.loading =false;
            UserStore.isLoggedIn =true;
            UserStore.username =result.username;
        }else{
          UserStore.loading = false;
          UserStore.isLoggedIn =false;
          
        }
      }catch(e){
        UserStore.loading =false;
        UserStore.isLoggedIn = false;
      }
  }

  async DologOut(){
    try{
      let res =await fetch('/loguot',{
        method:'POST',
        headers:{
          'Accecpt':'application/json',
          'content-type':'app;ication/json'
        }
      });
      let result = await res.json();
      if(result && result.success){
          UserStore.isLoggedIn =false;
          UserStore.username ='';
      }
    }catch(e){
      console.log(e)
    }
}
  render() {
    
    if(UserStore.loading){
      return(
      <div className = 'looading'>
        <div className ="container">
              <h1>loading please wait</h1>
        </div>
      </div>
      )
    }else{
      if(UserStore.isLoggedIn){
      return(
        <div className = 'looading'>
          <div className ="container"> 
                <TEST />
                <SubmitButton 
                text = {'Log Out'} 
                disabled={false}
                onClick = {()=>this.DologOut()} 
                />
               <p>amdin {UserStore.username}</p>
          </div>
        </div>
        )
      }
    }
    return (
      <div className = "app">
       <div className ="container">
          <LoginFrom />
       </div>
    </div>
    );

  }
}

export default observer (App);
