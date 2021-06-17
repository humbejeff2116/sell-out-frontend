



import React, {useState, useEffect} from 'react';
import './loginModal.css';
import {Link} from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {LoginTextInput, LoginPasswordInput} from '../Formik/formik';
import { Loader } from '../Loader/loader';





export default function LoginModal(props) {
    return ( 
        <LoginModalTemplate show={props.show} handleClose={props.handleClose}  >
            <Login showForm={props.showForm}/>
        </LoginModalTemplate>

    )
}

function LoginModalTemplate(props) {
    const showHideClassName = props.show ? 
    "login-modal-container display-block" : "login-modal-container display-none";
    return (
        <div className={showHideClassName} >
            <div className="login-modal-main">
                <div className="login-modal-close-cntr">
                    <div className="login-modal-close">
                        <button type="button" onClick={()=> props.handleClose() }>
                            <i>close</i>
                        </button>
                    </div> 
                </div>
                {props.children}
            </div>  
        </div>
    )
}



//  class Login extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             email: '',
//             password: '',
//             valErrors: [],
//             errMessage: '',
//             blur: false,
//             redirect : '',
//             loginIn:false,
//             showForm:false,
//         }
//         this.timer = null;
//     }

//     handleInputChange = (e) =>
//         this.setState({[e.target.name]: e.target.value})

//     submitLogin = (e) => {
//         e.preventDefault();
//     }

//     componentDidMount() {
//         this.timer = setTimeout(()=> {
//             return this.setState({
//                 showForm: true
//             })
//         }, 1000);
//     }

//     componentWillUnmount() {
//         if(this.timer) {
//             clearTimeout(this.timer);
//         }
//     }

//     render() {
//         if(!this.state.showForm ) {
//             return (
//             <div className="login-modal-loader-form-container">
//                <Loader 
//                loaderContainer={"login-modal-loader-container"}
//                loader={"login-modal-loader"} 
//                /> 
//             </div>

//             )
//         }
//         return (
         
//             <div className="login-modal-form-container">
//                 <div className="login-modal-panel ">
//                     <div className="login-modal-panel-heading">
//                         <h2>Login </h2>
//                     </div>
//                     <div className="login-modal-panel-body">
//                         <form action="login" onSubmit={this.submitLogin} method="POST" autoComplete="off">

//                         <div className="login-modal-form-group">
//                             <label htmlFor="email address">EMAIL ADDRESS</label>
//                         </div>
//                         <input type="text" placeholder="EXAMPLE@gmail.com"   name="email"  onChange={this.handleInputChange}/>
//                         {/* error reporting div */}
//                         <div className="login-modal-form-error">
//                             <span className="login-modal-error">this is a username error</span>
//                         </div>

//                         <div className="login-modal-form-group">
//                             <label htmlFor="password">PASSWORD</label>
//                         </div>
//                         <input type="password" name="password"  onChange={this.handleInputChange}/>
//                         {/* error reporting */}
//                         <div className="login-modal-form-error">
//                             <span className="login-modal-error">this is a password error</span>
//                         </div>


//                         <div className="login-modal-forgot-pass">
//                             <p>forgot your password?</p>
//                         </div>

//                         <div className="login-modal-button">
//                             <button type="submit" className="btn btn-success">
//                             {this.state.loginIn ? 'Loging in...' : 'Log in'}
//                             </button>
//                         </div>

//                         </form>
//                     </div>
//                 </div>

//                 <div className="login-modal-signup-panel">
//                     <div className="signup-modal-link">
//                         <div className="signup-modal-link-text">
//                             <p>dont have an account yet ? </p>
//                         </div>

//                         <div className="signup-modal-link-button">
//                             <Link to="/signup"><button> sign up </button></Link>
//                         </div>
                        
//                     </div>    
//                 </div>
//             </div>
//         )
//     }
// }


 function Login() {
    const [loginIn, setLoginIn] = useState(false);
    const [ showForm, setShowForm] = useState(false);

    useEffect(()=> {
        let timer
        timer = setTimeout(()=> {
            return setShowForm(true)
        }, 1000);

        return ()=>{
            if(timer) {
                clearTimeout(timer);
            }

        }
    },[])
    if(!showForm ) {
        return (
        <div className="login-modal-loader-form-container">
           <Loader 
           loaderContainer={"login-modal-loader-container"}
           loader={"login-modal-loader"} 
           /> 
        </div>

        )
    }
    return (
        <div className="login-modal-form-container">
            <div className="login-modal-panel ">
                <div className="login-modal-panel-heading">
                    <h2>Login </h2>
                </div>
                <div className="login-modal-panel-body">
                <Formik
                    initialValues = {{
                        email: '',
                        password: '',
                    }}

                    validationSchema = { Yup.object({
                        email: Yup.string().email('Invalid email address').required('Email is Required'),
                        password: Yup.string().required('password is required'),
                    })}

                    onSubmit = {(values, { setSubmitting }) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                        }, 400);
                    }}
                >
                <Form>
                    <LoginTextInput
                        label="EMAIL ADDRESS"
                        labelClassName="login-modal-form-group"
                        name="email"
                        type="email"
                        placeholder="example@gmail.com"
                        errorClassName="login-modal-form-error"
                    />
                    <LoginPasswordInput
                        label="PASSWORD"
                        labelClassName="login-modal-form-group"
                        name="password"
                        type="password"
                        errorClassName="login-modal-form-error"
                    />
                   <div className="login-modal-forgot-pass">
                        <p>forgot your password?</p>
                    </div>

                    <div className="login-modal-button">
                        <button type="submit" className="btn btn-success">
                        {loginIn ? 'Loging in...' : 'Log in'}
                    </button>
                    </div>
                </Form>
                </Formik>
                </div>
            </div>

            <div className="login-modal-signup-panel">
                <div className="signup-modal-link">
                    <div className="signup-modal-link-text">
                        <p>dont have an account yet ? </p>
                    </div>

                    <div className="signup-modal-link-button">
                        <Link to="/signup"><button> sign up </button></Link>
                    </div>
                    
                </div>    
            </div>
        </div>

    )
}
