import React, { useState, useEffect } from 'react';

import TimeDisplay from './TimeDisplay';

// Shows the history component that takes data to display and formats it into a nice presentation
// I first thought whether I want to pass in session data into History rather than the History component connecting to the flat session DB itself, but decided that constantly passing in 
// session data would cause a lot of duplication. So this component connects to the flat session database by itself.

const { ipcRenderer } = window.require("electron");


const History = (props) => {

    let [sessionData, setSessionData] = useState("FETCHING HISTORY DATA...");
    let [lastSession, setLastSession] = useState(0);
    // get session data from session database
    // send data to renderer process using IPC
    useEffect(() => {
        console.log(' this hook should only run once');
        ipcRenderer.send('read-session-data');
        // [] means only execute once since we don't want to write out the same session twice and read the historical data only once.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // subscribe to this event only once with useEffect
    useEffect(() => {
        ipcRenderer.on('recieved-session-data', (event, data) => {
            // format date to remove GMT information. 
            data.forEach((record, i) => data[i].date = record.date.slice(0, 24));
            setSessionData(data);
            setLastSession(data[data.length - 1]);
            console.log("recieved data:", data);
        })
        // the return function is a 'cleanup' function that runs when a component unmounts or re-renders
        // listeners are functions that execute when an event is emitted on the channel and channels are stuff like 'recieved-session-data' 
        return () => ipcRenderer.removeAllListeners('recieved-session-data');
    }, []);

    if (props.visible) {
        return (
            <div style={{ color: "white", marginTop: "36px" }}>
                <p>Last Session: {lastSession.date} </p>
                <p>Project: <br /><span style={{ fontSize: "22px", fontWeight: "bold" }}>{lastSession.project} </span></p>
                <p>Category: {lastSession.category} </p>
                <div>
                    <div style={{ display: "inline-block", marginRight: "40px" }}>
                        <p>Time worked: </p>
                        <TimeDisplay displayStyle={{ display: "inline-block", fontSize: "20px" }} timeInSeconds={lastSession.totalWorkTime} />
                    </div>
                    <div style={{ display: "inline-block" }}>
                        <p>Break Time: </p>
                        <TimeDisplay displayStyle={{ display: "inline-block", fontSize: "20px" }} timeInSeconds={lastSession.totalBreakTime} />
                    </div>
                </div>
            </div>
        );
    }
    else {
        return null;
    }

};

export default History;