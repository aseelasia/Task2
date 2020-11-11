import React, { Component } from 'react';
import axios from "axios"; 
import image from './1.jpg';
import './login.css';

class Login extends Component {
  state = {
    email: '',
    password:''
  };

    handleSubmit = event => {
        event.preventDefault();
        if(this.state.email !== "" && this.state.password !== "")
        {
            axios.get('http://localhost:3000/users?email='+this.state.email+'&password='+this.state.password)
            .then(res=>{
            window.location = ""
            if(res.data[0] === undefined)
                alert("Login failed")
            else
                alert("Login succeeded")
            })        
        }
        else
            alert("Please enter all fields")
    }
    
    handleChange1 = event =>{
        this.setState({ email: event.target.value});
    }
    handleChange2 = event =>{
        this.setState({ password: event.target.value});
    }
    
    render() {
    return (
    <div>
        <div className="a-form">
            <div className="a-background">
                <img src={image} className="backgroundImage" alt="backgroundImage" ></img>
                <div className="container-form">
                    <span className="login-title">Account Login</span>
                    <form className="login-form" onSubmit = { this.handleSubmit }>
                        <div className="a-input validate-input" data-validate="Enter username">
                            <input className="a-input-text" type = "email" name = "email" placeholder="Email" onChange= {this.handleChange1}></input>
                        </div>
                        <div className="a-input validate-input" data-validate="Enter password">
                            <input className="a-input-text"type = "password" name = "password" placeholder="Password" onChange= {this.handleChange2}></input>
                        </div>
                        <div className="a-button">
                            <button className="a-button-text" type = "submit">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    );
  }
}
export default Login;