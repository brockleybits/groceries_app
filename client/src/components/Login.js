// React
import React from 'react';

// Bootstrap and CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import '../App.css';

// FontAwesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDoorOpen} from '@fortawesome/free-solid-svg-icons';

// Import Axios calls
import axiosRequest from '../axios/UserAuth';

const Login = () => {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [alert, setAlert] = React.useState({
        alert: false,
        message: null,
        variant: null
    });

    const onChange = (evt) => {
        if (evt.target.type === 'text') setUsername(evt.target.value);
        if (evt.target.type === 'password') setPassword(evt.target.value);
    }

    const onSubmit = (evt) => {
        evt.preventDefault();
        if (!!username.length && !!password.length) {
            axiosRequest.verifyLogin({
                username,
                password
            })
            .then(result => {
                console.log(result);
                if (result.data.auth) window.location.pathname = result.data.location;
                else setAlert({
                    alert: true,
                    message: 'Invalid Login',
                    variant: 'danger'
                })
            })
            .catch(err => console.log(err));
        } else {
            setAlert({
                alert: true,
                message: 'Username & Password Required',
                variant: 'warning'
            })
        }

    }

    React.useEffect(() => {
        if (alert.alert) {
            localStorage.removeItem('alert');
            setTimeout(() => {
                setAlert({
                    alert: false,
                    message: null,
                    variant: null
                });
            }, 2000);
        }
    }, [alert]);

    return (
        <Container className="max-container-width login-background login-height">
            {
                alert.alert &&
                <Alert variant={alert.variant}>{alert.message}</Alert>
            }
            <h1 className="login-heading" hidden >Welcome to Groceries</h1>
            <h2 className="my-4 ps-3 login-title"><span className="pe-3"><FontAwesomeIcon icon={faDoorOpen} /></span>Login</h2>
            <Form onSubmit={onSubmit}>
                <Form.Group>
                    <Form.Control className="m-2" type="text" placeholder="Group Name" onChange={onChange} />
                    <Form.Control className="m-2" type="password" placeholder="Password" onChange={onChange} />
                </Form.Group>
                <Button className="p-2 m-3" variant="primary" type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default Login;