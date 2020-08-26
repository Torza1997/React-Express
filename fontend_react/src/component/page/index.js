import React,{Component} from 'react';
import axios from 'axios';
export default class Test extends Component{
    state = {
        user:[]
    }
    componentDidMount(){
        //fetch("/test")
        axios.get("/api/test").then(res=>{
            console.log(res);
                this.setState({
                    user:res.data,
                })
            })
    }
    render(){
        return(
            <div style={{textAlign:"center"}}>
            <h1>USER</h1>
                <ul>
                    { this.state.user.map(user=><li key="{users.id}">{user.name}</li>)}
                </ul>
            </div>
        )
    }
}