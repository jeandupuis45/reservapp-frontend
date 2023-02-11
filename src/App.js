import * as React from 'react';
import { useState } from 'react';

import Account from './Code/Account';
import { Login } from './Code/login';
import { Calendar } from './Code/calendar';
import { Header } from './Code/header';


import './App.css';

const Body = (props) => {


  if (props.display == "register") {
    return (
      <Account />
    )
  }

  if (props.display == "login") {
    return (
      <Login setConnected={props.setConnected} loginUserName={props.loginUserName} setLoginUserName={props.setLoginUserName} setDisplay={props.setDisplay} />
    )
  }

  return (
    <Calendar />
  );
}

function App() {

  const [display, setDisplay] = useState("")
  const [connected, setConnected] = useState("")
  const [loginUserName, setLoginUserName] = useState("")
  const [open, setOpen] = React.useState(true)



  return (
    <div className="App">


      <Header connected={connected} setDisplay={setDisplay} setConnected={setConnected} loginUserName={loginUserName} setLoginUserName={setLoginUserName} />

      <Body open={open} setOpen={setOpen} display={display} setDisplay={setDisplay} setConnected={setConnected} loginUserName={loginUserName} setLoginUserName={setLoginUserName} />


    </div>
  )
}

export default App;