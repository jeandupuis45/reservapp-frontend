import React from "react";
import { useEffect, useState } from 'react';
import axios from 'axios';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';

import HttpsIcon from '@mui/icons-material/Https';
import PersonIcon from '@mui/icons-material/Person';


export function Header(props) {


    return (

        <div className="header">

            <div style={{
                width: "180px",

            }}>

                <Button
                    style={{
                        color: 'white',
                        fontWeight: '40',
                        backgroundColor: '#1E90FF',
                        fontSize: "14px",
                    }}
                    onClick={() => {
                        props.setDisplay("")
                    }
                    }
                >Home
                </Button>

            </div>


            <h1 className="title">Reserv'App</h1>

            <div style={{
                width: "180px",

            }}>

                <Button
                    style={{
                        color: 'white',
                        fontWeight: '40',
                        backgroundColor: '#1E90FF',
                        fontSize: "14px"
                    }}
                    onClick={() => {
                        if (props.connected == "true") {
                            props.setDisplay("")
                            props.setConnected("false")
                        } else {
                            props.setDisplay("register")
                        }
                    }
                    }
                >{props.connected == "true" ? "Logout" : 'Register'}
                </Button>

                <Button
                    style={{
                        color: 'white',
                        fontWeight: '40',
                        backgroundColor: '#1E90FF',
                        fontSize: "14px",
                    }}
                    onClick={() => {
                        props.setDisplay("login")
                    }
                    }
                >{props.connected == "true" ? props.loginUserName : 'Login'}
                </Button>

            </div>

        </div>

    )
}
