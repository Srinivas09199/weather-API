import React from 'react';
import { useEffect, useState } from 'react';
import Spinner from './Spinner';
import ErrorMessage from './ErrorMessage';
            

const Mainarea = (props) => {
    const apiKey = process.env.REACT_APP_API_KEY;
    console.log(apiKey)
    
    //process.env.REACT_APP_API_KEY

    const [userInput, setuserInput] = useState("")
    const [serverResponse, setServerResponse] = useState({})
    const [loading, setLoading] = useState(true)
    const [errorOcurred, setErrorOcurred] = useState(false)

    const handleOnChange = (event) => {
        setuserInput(event.target.value)
    }

    const handleFetchData = async (event) => {
        if (userInput !== "") {
            event.preventDefault()
            try {
                setLoading(true)
                setErrorOcurred(false)
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon=${userInput}&appid=${apiKey}`);
                const parsedData = await response.json();
                if (parsedData.cod !== "404") {
                    setServerResponse(parsedData)
                } else {
                    setErrorOcurred(true)
                }
                
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={kolkata}&appid=${apiKey}`);
                const parsedData = await response.json();
                setServerResponse(parsedData)    
                setLoading(false)
            } catch (error) {
                    console.log(error)   
                    setErrorOcurred(true)
                    setLoading(false)     
            }
        }
        fetchData()
        
    }, [apiKey])

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            document.getElementById("submitButton").click()
        }
    }

  return (
    <>
        <div className='container my-4'>
            <div className={`p-5 border border-${props.theme==="light"?"secondary":"light"} rounded bg-${props.theme}`}>
                <h1 className={`text-center text-${props.theme==="light"?"dark":"light"}`}> Welcome to Weather API Report</h1>
                <div className='my-4 p-5'>
                    <div className='d-flex'>
                        <input type="text" className="form-control me-2" onChange={handleOnChange} onKeyPress={handleKeyPress} value={userInput} id="cityInput"  placeholder="Enter city Name" />
                        <button className={`btn btn-${props.theme==="light"?"dark":"light"}`} id='submitButton' onClick={handleFetchData} type='submit' >Search!</button>
                    </div>
                    {loading? <div className='d-flex justify-content-center m-4'><Spinner theme={props.theme} /></div> : 

                    <div className='my-4'>
                        <h4 className={`text-center text-${props.theme==="light"?"dark":"light"}`}>Showing Resukts for: {`${serverResponse.name}`}</h4>
                        { errorOcurred?
                            <ErrorMessage />
                            :
                            <>
                                <h5 className={`text-center text-${props.theme==="light"?"dark":"light"}`}>Lantitude: {`${serverResponse.coord ? serverResponse.coord.lat : "N/A"}`} Longitude: {`${serverResponse.coord ? serverResponse.coord.lon : "N/A"}`} </h5>
                                <h5 className={`my-2 text-center text-${props.theme==="light"?"dark":"light"}`}>Weather Updates: </h5>
                                <ul>
                                    <li><p className={`text-capitalize text-${props.theme==="light"?"dark":"light"}`}>Mainly {serverResponse.weather && serverResponse.weather[0] ? serverResponse.weather[0].main : "N/A"}</p></li>
                                    <li><p className={`text-capitalize text-${props.theme==="light"?"dark":"light"}`}>{serverResponse.weather && serverResponse.weather[0] ? serverResponse.weather[0].description : "N/A"}</p></li>
                                    <li><p className={`text-capitalize text-${props.theme==="light"?"dark":"light"}`}>Max Temperature: {serverResponse.main ? serverResponse.main.temp_max : "N/A"}</p></li>
                                    <li><p className={`text-capitalize text-${props.theme==="light"?"dark":"light"}`}>Min Temperature: {serverResponse.main ? serverResponse.main.temp_min : "N/A"}</p></li>
                                    <li><p className={`text-capitalize text-${props.theme==="light"?"dark":"light"}`}>Average Temperature: {serverResponse.main ? serverResponse.main.temp : "N/A"}}</p></li>
                                    <li><p className={`text-capitalize text-${props.theme==="light"?"dark":"light"}`}>pressure: {serverResponse.main ? serverResponse.main.pressure : "N/A"}</p></li>
                                    <li><p className={`text-capitalize text-${props.theme==="light"?"dark":"light"}`}>Humidity: {serverResponse.main ? serverResponse.main.humidity : "N/A"}</p></li>
                                </ul>
                            </>
                        }
                    </div> }
                </div>
            </div>
            
        </div>
    </>
  )
}

export default Mainarea