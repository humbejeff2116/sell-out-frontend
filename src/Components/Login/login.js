



   import React from 'react';
   import { Link, Redirect } from 'react-router-dom';
   import './login.css';



export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            valErrors: [],
            errMessage: '',
            blur: false,
            redirect : '',
            loginIn:false
        }
    }

    handleInputChange = (e) =>
        this.setState({[e.target.name]: e.target.value})

    toggleBlur = (e) => {
        if (e.target.value.length > 0) {
            return e.target.classList.add('not-empty');
        }
        return e.target.classList.remove('not-empty');
    }

    submitLogin = (e) => {
        e.preventDefault();
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        if (this.state.redirect) {
            return(
                <Redirect to={this.state.redirect} />
            )
        }
        return (
         
            <div className="login-container">
                <div className="login-panel ">
                    <div className="login-panel-heading">
                        <h2>Login </h2>
                    </div>
                    <div className="login-panel-body">
                        <form action="login" onSubmit={this.submitLogin} method="POST" autoComplete="off">

                        <div className="login-form-group">
                            <label htmlFor="email address">EMAIL ADDRESS</label>
                            <span className="login-error">this is a username error</span>
                        </div>
                        <input type="text"   name="email"  onChange={this.handleInputChange}/>

                        <div className="login-form-group">
                            <label htmlFor="password">PASSWORD</label>
                            <span className="login-error">this is a password error</span>
                        </div>
                        <input type="password" name="password"  onChange={this.handleInputChange}/>


                        <div className="login-forgot-pass">
                            <p>forgot your password?</p>
                        </div>

                        <div className="login-button">
                            <button type="submit" className="btn btn-success">
                            {this.state.loginIn ? 'Loging in...' : 'Log in'}
                            </button>
                        </div>

                        </form>
                    </div>
                </div>

                <div className="login-signup-panel">
                    <div className="signup-link">
                        <div className="signup-link-text">
                            <p>dont have an account yet ? </p>
                        </div>

                        <div className="signup-link-button">
                            <Link to="/signup"><button> sign up </button></Link>
                        </div>
                        
                    </div>    
                </div>
            </div>
        )
    }
}
