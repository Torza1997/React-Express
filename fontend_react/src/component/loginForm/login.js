import React,{Component} from 'react';
import UserStore from './../../store/UserStore';
import InputField  from "./inputField";
import  SubmitButton  from "./submit";
import Axios from 'axios';

 class LoginFrom extends Component{
     constructor(props) {
         super(props);
         this.state={
             username:'',
             password:'',
             buttonDisbled:false
         }
     }
     setInputValue(property,val){
        val = val.trim();
        //console.log(val);
        if(val.length >12){
            return;
        }
        this.setState({
            [property]: val
        })
     }
     resetFrom(){
         this.setState({
             username: '',
             password: '',
             buttonDisbled: false
         })
     }

     async doLogin(){
        if(!this.state.username){
            return;
        }
        if(!this.state.password){
            return;
        }
        this.setState({
            buttonDisbled: true
        })
        try{
            let res= await Axios.post('/api/login',{
                username: this.state.username,
                password: this.state.password
            })
            let result =await res.json();
            if(result && result.success){
                UserStore.isLoggedIn = true;
                UserStore.username = result.username;
            }else if(result && result.success === false){
                this.resetFrom();
                alert(result.msg);
            }
        }catch(e){
            console.log(e);
            this.resetFrom();

        }
    }
     
    render(){
        return(
            <div className ="loginForm">
                Log in 
                <InputField 
                    type ='text'
                    placeholder= 'Username'
                    value = {this.state.username ? this.state.username :''}
                    onChange = {(val)=>this.setInputValue('username',val)}
                />
                 <InputField 
                    type ='password'
                    placeholder= 'Password'
                    value = {this.state.password ? this.state.password :''}
                    onChange = {(val)=>this.setInputValue('password',val)}
                />
                <SubmitButton 
                text = {'login'} 
                disabled={this.state.buttonDisbled}
                onClick = {()=>this.doLogin()} 
                />
            </div>
        )
    } 
}

export default LoginFrom;
