import React, { useRef } from 'react';

import TimeDisplay from '../TimeDisplay';
import SessionInfoDisplay from '../SessionInfoDisplay';
import SessionMetadata from '../SessionMetadata';
import ActiveButtons from '../ActiveButtons';
import QuoteDecoration from '../QuoteDecoration';

const TimerPage = (props) => {

    // Decoration
	const NUMBER_OF_QUOTES = 26;
	let quoteSelection = useRef(Math.ceil(Math.random() * NUMBER_OF_QUOTES));

    return (
        <div>
            <h2 style={{ color: 'white' }}>{props.freshStart.current ? '' : (props.working ? ('WORKING | ' + props.category + ' - ' + props.project) : 'ON BREAK')}</h2>

            <TimeDisplay timeInSeconds={props.onBreak ? props.breakSecondsEarned : props.workSecondsElapsed} displayStyle={{ color: 'white', fontSize: '80px' }} hide={props.freshStart.current}/>

            <QuoteDecoration quoteSelection={quoteSelection.current} workSecondsElapsed={props.workSecondsElapsed} />

            <SessionMetadata setProject={props.setProject} setCategory={props.setCategory} metadataHandler={props.metadataHandler} startPage={props.freshStart.current} />

            <ActiveButtons
                working={props.working}
                onBreak={props.onBreak}
                breakEarned={props.breakSecondsEarned}
                freshStart={props.freshStart}
                startHandler={props.startHandler}
                stopHandler={props.stopHandler}
                breakHandler={props.breakHandler}
                finishHandler={props.finishHandler}
            />

            <SessionInfoDisplay
                focusIntervals={props.focusIntervals}
                shortBreaks={props.shortBreaks}
                longBreaks={props.longBreaks}
                totalBreakTime={props.totalBreakTime}
                sets={props.sets}
                display={!props.freshStart.current}
            />

        </div>
    );

}

export default TimerPage;