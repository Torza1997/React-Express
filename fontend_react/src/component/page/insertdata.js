import React,{Component} from 'react';
import axios from 'axios';
import "../css/main.css";
const jwt_decode = require('jwt-decode');
export default class Test extends Component{
    state = {
        Users:[],
        UserInsert:{
            name: '',
            nickname:'',
            email:'',
            phone:'',

        }
    }
    componentDidMount(){
        this.getUSer();
    }
    getUSer =()=>{
        axios.get("/api/get/data")
        .then(res => {
           const userAll = res.data;
           this.setState({Users : userAll.data})
        })
        /*({data})*/
        /*fetch("/api/get/data")
        .then(res =>res.json())
        .then(res => this.setState({Users : res.data}))
        .catch(err => console.error(err))*/
        
    }
    Delete=(e)=>{
        const _0x3d90=['target','/api/delete/','then','catch','delete','error','getUSer'];
        (function(_0x342e9e,_0x3d9045){var _0x426974=function(_0x58e456){while(--_0x58e456){_0x342e9e['push'](_0x342e9e['shift']());}};_0x426974(++_0x3d9045);}(_0x3d90,0x13f));
        const _0x4269=function(_0x342e9e,_0x3d9045){_0x342e9e=_0x342e9e-0x0;var _0x426974=_0x3d90[_0x342e9e];return _0x426974;};
        axios[_0x4269('0x0')](_0x4269('0x4')+e[_0x4269('0x3')]['id'])[_0x4269('0x5')](this[_0x4269('0x2')])[_0x4269('0x6')](_0x4673f6=>{console[_0x4269('0x1')](_0x4673f6);});
    }
    Edite=()=>{
        alert("Edite");
    }
   addData =()=>{
        const { UserInsert } = this.state;
        axios.post('/api/add',UserInsert)
            .then(this.getUSer)
            .catch(err => console.error(err));
         
    }
    Test_jwt_decode=_=>{
        axios.post('/api/jwt/token')
            .then(res=>{
                const user_ = jwt_decode(res.data.token);
                console.log(user_.user.username);
            })
    }
    render(){
        const {Users,UserInsert} =this.state;
        return(
            <div style={{textAlign:"center"}}>
            <h1>USER</h1>
                <ul>    
                    <div className ="user-form">
                        <h3>name</h3>
                        <input value={UserInsert.name} onChange ={e => this.setState({UserInsert:{... UserInsert ,name:e.target.value}})}></input>
                        <h3>nickname</h3>
                        <input value={UserInsert.nickname} onChange ={e => this.setState({UserInsert:{... UserInsert ,nickname:e.target.value}})}></input>
                        <h3>email</h3>
                        <input value={UserInsert.email} onChange ={e => this.setState({UserInsert:{... UserInsert ,email:e.target.value}})}></input>
                        <h3>phone</h3>
                        <input value={UserInsert.phone} onChange ={e => this.setState({UserInsert:{... UserInsert ,phone:e.target.value}})}></input>
                        <a onClick ={this.addData} >add</a>
                    </div>
                    <div className ="table-user">
                        <table>
                            <thead>
                                 <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>NICKNAME</th>
                                    <th>EMAIL</th>
                                    <th>PHONE</th>
                                    <th>DELETE</th>
                                    <th>EDITE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.Users.map(user=>
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.nickname}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td><a id ={user.id} onClick = {this.Delete}>Delete</a></td>
                                    <td><a onClick = {this.Test_jwt_decode}>Edite</a></td>
                                </tr>
                                )}
                            </tbody>     
                            </table>
                        </div>
                </ul>
            </div>
        )
    }
}