import React from "react";

import Button from '@mui/material/Button';


const Header = (props) => {


    return (

        <div style={{
            backgroundColor: '#1E90FF',
            width: '100%',
            maxHeight: '60px',
            minHeight: '60px',
            marginBottom: '20px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        }}>

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


            <h1 style={{
                textAlign: 'center',
                color: 'white',
                padding: '10px',
                margin: '0px',
                flex: 1,
            }}>Reserv'App</h1>

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

        </div >

    )
}

export default Header