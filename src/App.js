import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Stack from '@mui/material/Stack';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Paper from '@mui/material/Paper';

import InputAdornment from '@mui/material/InputAdornment';
import ClearIcon from '@mui/icons-material/Clear';


import './App.css';

function App() {
  const [listItems, setListItems] = useState([]);
  const [listItemsBackend, setListItemsBackend] = useState([]);

  const [value, setValue] = React.useState(new Date().toISOString().split('T')[0]);
  const handleChange = (newValue) => {
    const jsDate = new Date(newValue)
    if (!isNaN(jsDate.getTime())) {
      setValue(jsDate.toISOString().split('T')[0])
    };
  };

  const basicObjet = [
    {
      startTime: "08:00:00",
      "endTime": "09:00:00"
    },
    {
      startTime: "09:00:00",
      "endTime": "10:00:00"
    },
    {
      startTime: "10:00:00",
      "endTime": "11:00:00"
    },
    {
      startTime: "11:00:00",
      "endTime": "12:00:00"
    },
    {
      startTime: "12:00:00",
      "endTime": "13:00:00"
    },
    {
      startTime: "13:00:00",
      "endTime": "14:00:00"
    },
    {
      startTime: "14:00:00",
      "endTime": "15:00:00"
    },
    {
      startTime: "15:00:00",
      "endTime": "16:00:00"
    },
    {
      startTime: "16:00:00",
      "endTime": "17:00:00"
    },
    {
      startTime: "17:00:00",
      "endTime": "18:00:00"
    },

  ]




  const changeObjet = (listeObjet) => {

    const obj = {}

    listeObjet.map(listeObjetElem => {
      obj[listeObjetElem.startTime] = listeObjetElem.name
    })

    return obj
  }


  const addItem = async (newObj) => {
    try {
      const res = await axios.post("http://localhost:5500/api/put-item",
        newObj)
      // setListItems({ ...listItems, [res.startTime]: res.name });
    } catch (err) {
      console.log(err);
    }
  }


  useEffect(() => {
    const getItemList = async () => {
      try {
        const res = await axios.post("http://localhost:5500/api/get-items",
          {
            "date": value
          })
        setListItems(changeObjet(res.data));
        setListItemsBackend(changeObjet(res.data));
      } catch (err) {
        console.log(err);
      }
    }
    getItemList()
  }, [value]);



  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5500/api/item/${id}`)
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <div className="App">
      <h1 className='title'>Reserv'App</h1>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={3} className="date">
          <DesktopDatePicker
            label="Date desktop"
            inputFormat="YYYY-MM-DD"
            value={value.concat('T00:00:00.000Z')}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </LocalizationProvider>

      <div className="reservation">

        {basicObjet.map((hour) => {
          return (
            <Paper variant="outlined" className='horaire' key={hour.startTime}>
              {/* <p>Hourly : {hour.startTime.substring(0, 5)} - {hour.endTime.substring(0, 5)} </p> */}
              <TextField id="outlined-basic" label={hour.startTime.substring(0, 5)} variant="outlined" onChange={e =>
                setListItems({
                  ...listItems,
                  [hour.startTime]: e.target.value
                })}
                value={listItems[hour.startTime] || ''}
                className="input"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  endAdornment:
                    <InputAdornment>
                      <ClearIcon onClick={() => setListItems({
                        ...listItems,
                        [hour.startTime]: ""
                      })} />
                    </InputAdornment>,
                }}
              />

              <div className="button">


                <Button
                  style={{
                    color: 'white',
                    fontWeight: '40',
                    backgroundColor: listItems[hour.startTime] != listItemsBackend[hour.startTime] ? '#1E90FF' : 'lightgray',
                    height: "25px",
                    fontSize: "14px",
                  }}
                  variant="contained"
                  disabled={listItems[hour.startTime] == listItemsBackend[hour.startTime]}
                  onClick={() => {
                    setListItems({
                      ...listItems,
                      [hour.startTime]: listItemsBackend[hour.startTime]
                    })

                  }
                  }>Reset
                </Button>

                <Button
                  style={{
                    color: 'white',
                    fontWeight: '40',
                    backgroundColor: listItems[hour.startTime] != listItemsBackend[hour.startTime] ? '#1E90FF' : 'lightgray',
                    height: "25px",
                    fontSize: "14px",
                  }}
                  variant="contained"
                  disabled={listItems[hour.startTime] == listItemsBackend[hour.startTime]}
                  onClick={() => {
                    if (listItems[hour.startTime] != "") {
                      addItem({
                        startTime: hour.startTime,
                        endTime: hour.endTime,
                        name: listItems[hour.startTime] || '',
                        date: value
                      })

                    }
                    else {
                      deleteItem(value + 'T' + hour.startTime + '.000Z')
                    }
                    setListItemsBackend({
                      ...listItemsBackend,
                      [hour.startTime]: listItems[hour.startTime]
                    })

                  }
                  }>Save
                </Button>


              </div>



            </Paper>
          )
        })}

      </div>

    </div>

  );
}

export default App;
