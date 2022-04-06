import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Button from '../UI/Button/Button';
import HistoryCard from '../HistoryCard';
import Pagination from '../Pagination';

import useBackendConnection from '../Hooks/useBackendConnection';

const HistoryPage = (props) => {
    let [sessionData, setSessionData] = useState([]);

    const itemsPerPage = 10;

    // custom hook for connection with electron backend 
    const backendConn = useBackendConnection();

    useEffect(() => {
        console.log('viewing history');
        backendConn.ipcRenderer.send('read-session-data');


        backendConn.ipcRenderer.on('recieved-session-data', (event, data) => {
            setSessionData(data);
        });

        return () => backendConn.ipcRenderer.removeAllListeners('recieved-session-data');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let historyCards = [];
    // NOTE: the custom pagination does not automatically display the data, you first have to choose which page you want to see.
    // this can be fixed but it would require building the routes ahead of time. perhaps theres a better way?
    for (let record of sessionData) {
        historyCards.push(<HistoryCard
            key={record.date}
            date={record.date}
            project={record.project}
            category={record.category}
            totalWorkTime={record.totalWorkTime}
            totalBreakTime={record.totalBreakTime}
            breakTimeNotTaken={record.breakTimeNotTaken}
        />)
    }

    // backendConn.ipcRenderer.on('recieved-session-data', (event, data) => {

    return (
        <div>
            <p style={{ color: "white", fontWeight: "bold", fontSize: "22px" }}>Historical Session Data</p>

            <Pagination
                items={historyCards.reverse()}
                itemsPerPage={itemsPerPage}
                basePath="/history"
            />

            <br />
            <Link to="/">
                <Button marginTop="15px" color="blue" text="Back"></Button>
            </Link>
        </div>
    );
}

export default HistoryPage;