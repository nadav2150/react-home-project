import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import API from '../utils/API';
import { useForm, Controller } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
	paper  : {
		marginTop     : theme.spacing(8),
		display       : 'flex',
		flexDirection : 'column',
		alignItems    : 'center',
	},
	avatar : {
		margin          : theme.spacing(1),
		backgroundColor : theme.palette.secondary.main,
	},
	form   : {
		width     : '100%',
		marginTop : theme.spacing(1),
	},
	submit : {
		margin : theme.spacing(3, 0, 2),
	},
}));

export default function SignIn (){
	const { control, errors: fieldsErrors, handleSubmit, register } = useForm();
	const classes = useStyles();
	const history = useHistory();
	const [ emailIsValid, setEmailIsValid ] = useState(false);
	const [ email, setEmail ] = useState(false);
	const [ firstName, setFirstName ] = useState('');
	const [ lastName, setLastName ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ errMessage, setErrMessage ] = useState('Please Fill All Field Correctly');
	const [ isErrMessage, setIsErrMessage ] = useState(false);
	const ValidateEmail = (email) => {
		if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
			setEmail(email);
			return setEmailIsValid(true);
		}
		return setEmailIsValid(false);
	};
	const onSubmitLogin = async (data) => {
		let { firstName, lastName, password } = data;
		try {
			await API.post('/login', {
				firstName,
				lastName,
				password,
			});
			history.push('/Home');
		} catch (err) {
			alert(`error is ${err}`);
		}
	};
	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Sign in
				</Typography>
				<form className={classes.form} noValidate onSubmit={handleSubmit(onSubmitLogin)}>
					<Controller
						name='email'
						as={
							<TextField
								error={fieldsErrors.email}
								variant='outlined'
								margin='normal'
								fullWidth
								required
								label='Email Address'
								autoComplete='email'
								autoFocus
							/>
						}
						control={control}
						defaultValue=''
						rules={{
							required : true,
							pattern  : {
								value   : /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
								message : 'invalid email address',
							},
						}}
					/>
					<Controller
						name='firstName'
						as={
							<TextField
								error={fieldsErrors.firstName}
								variant='outlined'
								margin='normal'
								required
								fullWidth
								label='First Name'
								autoFocus
							/>
						}
						control={control}
						defaultValue=''
						rules={{ required: true }}
					/>

					<Controller
						name='lastName'
						as={
							<TextField
								error={fieldsErrors.lastName}
								variant='outlined'
								margin='normal'
								required
								fullWidth
								label='Last Name'
								autoFocus
							/>
						}
						control={control}
						defaultValue=''
						rules={{ required: true }}
					/>

					<Controller
						name='password'
						as={
							<TextField
								error={fieldsErrors.password}
								variant='outlined'
								margin='normal'
								required
								fullWidth
								name='password'
								label='Password'
								type='password'
								autoComplete='current-password'
							/>
						}
						control={control}
						defaultValue=''
						rules={{ required: true }}
					/>
					<Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
						Sign In
					</Button>
					{isErrMessage ? <Alert severity='error'>{errMessage}</Alert> : null}
				</form>
			</div>
		</Container>
	);
}
