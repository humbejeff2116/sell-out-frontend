






import React from 'react';
import {Redirect, Link} from 'react-router-dom';
import './signup.css';


export default class Signup extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            fullname: '',
            valErrors: [],
            errMessage: '',
            redirect : '',
            signingUp: false

        }
    }
    handleInputChange = (e) =>
        this.setState({[e.target.name]: e.target.value})

    submitSignup = (e) => { 
        e.preventDefault();
    }

    componentDidMount(){

    }

    render(){
        if (this.state.redirect) {
            return(
                <Redirect to={this.state.redirect} />
            )
        }
        return (
            <div className="signup-container">
                <div className="signup-panel ">
                    <div className="signup-panel-heading">
                        <h2> Create Account </h2>
                    </div>
                    <div className="signup-panel-body">
                        <form action="signup" onSubmit={this.submitSignup} method="POST" autoComplete="off">
                        {/* signup email */}
                        <div className="signup-form-group">
                            <label htmlFor="email address">EMAIL ADDRESS</label>
                        </div>
                        <input type="text" placeholder="example@gmail.com"  name="email"  onChange={this.handleInputChange}/>
                        <div className="signup-form-error">
                            <span className="signup-error">this is a email error</span>
                        </div>
                        {/* signup full name */}
                        <div className="signup-form-group">
                            <label htmlFor="full name">FULL NAMES</label>
                        </div>
                        <input type="text" placeholder="e.g John Doe" name="fullname"  onChange={this.handleInputChange}/>
                        <div className="signup-form-error">
                            <span className="signup-error">this is a full name error</span>
                        </div>
                        {/* signup full name */}
                        <div className="signup-form-group">
                            <label htmlFor="password">PASSWORD</label>
                        </div>
                        <input type="password" name="password"  onChange={this.handleInputChange}/>
                        <div className="signup-form-error">
                            <span className="signup-error">this is a full name error</span>
                        </div>
                        {/* date of birth */}


                        <div className="signup-button">
                            <button type="submit" className="btn btn-success">
                            {this.state.signingUp ? 'Creating Account...' : 'Create Account'}
                            </button>
                        </div>

                        </form>
                    </div>
                </div>

                <div className="signup-login-panel">
                    <div className="login-link">
                        <div className="login-link-text">
                            <p>Already have an account ? </p>
                        </div>

                        <div className="login-link-button">
                            <Link to="/login"><button> Login </button></Link>
                        </div>
                        
                    </div>    
                </div>
            </div>

        )
    }
}