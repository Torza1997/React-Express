import React,{Component} from 'react';
import axios from 'axios';
import "../css/main.css";
export default class Test extends Component{
    state = {
        Users:[],
        UserInsert:{
            name: '',
            nickname:'',
            email:'',
            phone:'',

        },
        callback:''
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
    Delete=()=>{
        alert("delete");
    }
    Edite=()=>{
        alert("Edite");
    }
   addData =()=>{
        const { UserInsert } = this.state;
        const res = axios.post('/api/add',UserInsert)
            .then(this.getUSer)
            .catch(err => console.error(err))
         
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
                                    <td><a onClick = {this.Delete}>Delete</a></td>
                                    <td><a onClick = {this.Edite}>Edite</a></td>
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