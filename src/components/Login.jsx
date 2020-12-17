import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import API from '../utils/API';

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
		width     : '100%', // Fix IE 11 issue.
		marginTop : theme.spacing(1),
	},
	submit : {
		margin : theme.spacing(3, 0, 2),
	},
}));

export default function SignIn (){
	const classes = useStyles();
	const history = useHistory();
	const [ emailIsValid, setEmailIsValid ] = useState(false);
	const [ firstName, setFirstName ] = useState('');
	const [ lastName, setLastName ] = useState('');
	const [ password, setPassword ] = useState('');
	const ValidateEmail = (email) => {
		if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
			return setEmailIsValid(true);
		}
		return setEmailIsValid(false);
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		alert('Submitted form!');
		let t = await API.post('/login', {
			firstName,
			lastName,
			password,
		});
		debugger;
		history.push('/Home');
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
				<form className={classes.form} noValidate onSubmit={(e) => handleSubmit(e)}>
					<TextField
						error={!emailIsValid}
						variant='outlined'
						margin='normal'
						fullWidth
						id='email'
						label='Email Address'
						name='email'
						autoComplete='email'
						autoFocus
						onChange={(event) => ValidateEmail(event.target.value)}
					/>
					<TextField
						error={!firstName}
						variant='outlined'
						margin='normal'
						required
						fullWidth
						id='Fname'
						label='First Name'
						name='Fname'
						autoFocus
						onChange={(event) => setFirstName(event.target.value)}
					/>
					<TextField
						error={!lastName}
						variant='outlined'
						margin='normal'
						required
						fullWidth
						id='Lname'
						label='Last Name'
						name='Lname'
						autoFocus
						onChange={(event) => setLastName(event.target.value)}
					/>
					<TextField
						error={!password}
						variant='outlined'
						margin='normal'
						required
						fullWidth
						name='password'
						label='Password'
						type='password'
						id='password'
						autoComplete='current-password'
						onChange={(event) => setPassword(event.target.value)}
					/>
					<Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
						Sign In
					</Button>
				</form>
			</div>
		</Container>
	);
}
