import React ,{useState,useEffect,useReducer,useContext} from 'react'
import Card from '../UI/Card'
import Button from '../UI/Button'
import classes from './Login.module.css'
import AuthContext from '../../store/auth-context';
const emailReducer = (state, action) => {
	if (action.type === 'USER_INPUT') {
	  return { value: action.val, isValid: action.val.includes('@') };
	}
	if (action.type === 'INPUT_BLUR') {
	  return { value: state.value, isValid: state.value.includes('@') };
	}
	return { value: '', isValid: false };
  };
  
  const passwordReducer = (state, action) => {
	if (action.type === 'USER_INPUT') {
	  return { value: action.val, isValid: action.val.trim().length > 6 };
	}
	if (action.type === 'INPUT_BLUR') {
	  return { value: state.value, isValid: state.value.trim().length > 6 };
	}
	return { value: '', isValid: false };
  };
const Login = (props) => {
	const authCtx = useContext(AuthContext);


	const [emailState, dispatchEmail] = useReducer(emailReducer, {
		value: '',
		isValid: null,
	  });
	  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
		value: '',
		isValid: null,
	  });
	const [formIsValid, setFormIsValid] = useState(false);

	const {isValid:emailIsValid}=emailState
	const {isValid:passwordIsValid}=passwordState

    useEffect(() => {
        const identifier = setTimeout(() => {
          console.log('Checking form validity!');
          setFormIsValid(
           emailIsValid&& passwordIsValid
          );
        }, 500);
    
        return () => {
          console.log('CLEANUP');
          clearTimeout(identifier);
        };
      }, [emailIsValid,passwordIsValid]);

	const emailChangeHandler = (event) => {
		dispatchEmail({ type: 'USER_INPUT', val: event.target.value });
		// setEnteredEmail(event.target.value);
	};
	const passwordChangeHandler = (event) => {
		dispatchPassword({ type: 'USER_INPUT', val: event.target.value });

		// setEnteredPassword(event.target.value);
	};
	const validateEmailHandler = () => {
		dispatchEmail({ type: 'INPUT_BLUR' });
		// setEmailIsValid(enteredEmail.includes('@'));
	};
	const validatePasswordHandler = () => {
		 dispatchPassword({ type: 'INPUT_BLUR' });
		// setPasswordIsValid(enteredPassword.trim().length > 6);
	};
    const submitHandler=(event)=>{
                event.preventDefault();
               authCtx.onLogin(emailState.value, passwordState.value);
    }
	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<div className={`${classes.control} ${emailIsValid === false ? classes.invalid : ''}`}>
					<label htmlFor="email">E-Mail</label>
					<input
						type="email"
						id="email"
						value={emailState.value}
						onChange={emailChangeHandler}
						onBlur={validateEmailHandler}
					/>
				</div>
				<div className={`${classes.control} ${passwordIsValid === false ? classes.invalid : ''}`}>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						value={passwordState.value}
						onChange={passwordChangeHandler}
						onBlur={validatePasswordHandler}
					/>
				</div>
				<div className={classes.actions}>
					<Button type="submit" className={classes.btn} disabled={!formIsValid}>
						Login
					</Button>
				</div>
			</form>
		</Card>
	);
};
export default Login;