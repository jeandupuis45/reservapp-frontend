import React from "react";
import { useState } from 'react';

import axios from 'axios';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';

import HttpsIcon from '@mui/icons-material/Https';
import PersonIcon from '@mui/icons-material/Person';

const Login = (props) => {

    const [loginPassword, setLoginPassword] = useState("")

    const getUser = async () => {
        try {
            const res = await axios.post("http://localhost:5500/user/get-items",
                {
                    "userName": props.loginUserName,
                    "password": loginPassword
                })
            props.setDisplay("")
            props.setConnected(res.data.userExists.toString())
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>

            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <InputLabel>Username</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    startAdornment={
                        <InputAdornment position="start">
                            <PersonIcon />
                        </InputAdornment>
                    }
                    label="Password"
                    onChange={e => props.setLoginUserName(e.target.value)
                    }
                />
            </FormControl>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    startAdornment={
                        <InputAdornment position="start">
                            <HttpsIcon />
                        </InputAdornment>
                    }
                    label="Password"
                    onChange={e => setLoginPassword(e.target.value)
                    }
                />
            </FormControl>


            <Button
                style={{
                    color: 'white',
                    fontWeight: '40',
                    backgroundColor: '#1E90FF',
                    fontSize: "14px",
                }}
                onClick={() => getUser()
                }
            >Login</Button>

        </div>
    )
}

export default Login