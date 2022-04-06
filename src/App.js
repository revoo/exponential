import React, { useState, useEffect, useRef } from 'react';
// import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
// import { ipcRenderer } from 'electron';


// import useInterval from './Hooks/useInterval';

// TODO: keep state in App and distribute it to timer and finish pages. Use router to show the different pages.
import TimerPage from './Pages/TimerPage';
import FinishPage from './Pages/FinishPage';
import HistoryPage from './Pages/HistoryPage';

import History from './History';

import classes from './App.module.css';

// from what i understand, the 'window' object is a global JS object that is ignored by Webpack during compliation from
// JSX to javascript and other polyfills by babel. Because of this, ipcRenderer is loaded at 'runtime' rather than
// compliation time. The NodeJS envrionment during runtime is different than compliation time. 
// If this module is added during compliation time, some variables are not yet available in the NodeJS envrionment. 
// Because Webpack ignores the window object, this line runs during runtime by Electron. Running this in the 
// browser throws an error because the window object has no method called 'require', this is a method
// provided by NodeJS during runtime and must be run using NodeJS. 
// details from here: https://github.com/electron/electron/issues/7300
// use the ipcRenderer to communicate with the main electron process which has access to the OS API.
const { ipcRenderer } = window.require("electron");

const App = () => {
	// operational
	let [workSecondsElapsed, setSecondsElapsed] = useState(0);
	let [working, setWorking] = useState(false);
	let [onBreak, setOnBreak] = useState(false);
	// session info
	let [focusIntervals, setFocusIntervals] = useState(0);
	let [sets, setSets] = useState(0);
	let [shortBreaks, setShortBreaks] = useState(0);
	let [longBreaks, setLongBreaks] = useState(0);
	let [totalWorkTime, setTotalWorkTime] = useState(0);
	let [totalBreakTime, setTotalBreakTime] = useState(0);
	let [breakSecondsEarned, setBreakSecondsEarned] = useState(0);
	// session metadata
	let [project, setProject] = useState('N/A');
	let [category, setCategory] = useState('N/A');


	// ipcRenderer.send('session-data', 'hello');
	// ipcRenderer.on('reply', () => console.log('data confirmed'));

	let minutesPerInterval = 2;
	// 4 focus intervals per set
	// 25 minutes per focus interval
	// 5 minute break per focus interval
	// 30 minute break per set

	// initilization 
	let freshStart = useRef(true);

	const trackFocusIntervals = () => {
		if (workSecondsElapsed % (minutesPerInterval * 60) === 0 && workSecondsElapsed !== 0) {
			setFocusIntervals(++focusIntervals);
			// short breaks tracked with focus intervals
			setShortBreaks(++shortBreaks);
			setBreakSecondsEarned(breakSecondsEarned += 300);
		}
	}

	const trackLongBreaks = () => {
		if (shortBreaks % 4 === 0 && shortBreaks !== 0) {
			setLongBreaks(++longBreaks);
			setBreakSecondsEarned(breakSecondsEarned += 1800);
		}
	}

	const trackSets = () => {
		// set number of sets
		if (focusIntervals % 4 === 0 && focusIntervals !== 0) {
			setSets(++sets);
		}
	}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => trackFocusIntervals(), [workSecondsElapsed])
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => trackLongBreaks(), [shortBreaks])
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => trackSets(), [focusIntervals])



	// start the timer
	const startHandler = () => {
		setWorking(true);
		setOnBreak(false);
		freshStart.current = false;
	}

	const stopHandler = () => {
		setWorking(false);
	}

	const finishHandler = () => {
		setWorking(false);
		setOnBreak(false);

		// Link component within ActiveButtons component handles redirect to finished page.		
	}

	const historyHandler = () => {

	}

	const startNewSessionHandler = () => {
		freshStart.current = true;
		resetState();
	}

	const breakHandler = () => {
		setOnBreak(true);
		setWorking(false);
	}

	const metadataHandler = (project, category) => {
		setProject(project)
		setCategory(category);
	}

	const resetState = () => {
		console.log('Resetting State...');
		setSecondsElapsed(0);
		setWorking(false);
		setOnBreak(false);
		setFocusIntervals(0);
		setSets(0);
		setShortBreaks(0);
		setLongBreaks(0);
		setTotalWorkTime(0);
		setTotalBreakTime(0);
		setBreakSecondsEarned(0);
		setProject('N/A');
		setCategory('N/A');
	}

	// Clean up for subsequent runs hook but don't discard state data before it is saved.
	// using the useEffect here instead of a simple if statement is because 
	// the useEffect hook is run after the DOM is rendered so this won't trigger an infinite loop
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		if (freshStart.current) {
		}
	});

	// useEffect hook is for side effects like data fetching and manually manipulating the DOM
	// the second parameter listens to changes in a variable and runs the function when it changes
	// this will run everytime the num variable changes which is never in this example. 
	//useEffect(() => console.log("Side effect ran!"), [num])
	useEffect(() => {
		console.log("in timer effect hook");
		let interval;
		// TIMER LOGIC
		if (working) {
			interval = setInterval(() => {
				setSecondsElapsed(++workSecondsElapsed);
				setTotalWorkTime(++totalWorkTime);
			}, 1000);
		} else if (onBreak) {
			interval = setInterval(() => {
				setBreakSecondsEarned(--breakSecondsEarned);
				setTotalBreakTime(++totalBreakTime);
			}, 1000);
		}

		return () => clearInterval(interval);
		// not sure why i need to pass in secondsElapsed into the dependency array for second parameter, but if i dont its a eslint warning about missing dependency. still works
		// the same either way since its a interval function. Because with the secondsElapsed passed in as deps it clears the interval every second. this could cause
		// a time shift after a while i would assume so im going to remove it as a dep and supress the warning
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [working, onBreak]);

	// update state interval. pre-increment operator so that the function recieves the parameter after its been incremented.
	// useInterval(() => { setSecondsElapsed(++secondsElapsed) }, 1000);

	// console.log(workSecondsElapsed);
	// console.log('project: ', project);
	// console.log('category: ', category);
	// console.log('break:', breakSecondsEarned);

	return (
		// could use react context for elapsed seconds since it will be used in multiple components. for now I will distribute it manually.
		// NOTE: Question is, which state should be managed by TimerPage and which by the root app component? Should all state be managed by 
		// the root app, or just state which will be shared with other components? I'm leaning toward only including state in the top component (root app)
		// the state that needs to be shared among other components and component specific state can be managed within the component. 
		// this approach increases the complexity of the app because application state is modified in multiple components
		// but in a way it also manages complexity because component specific state is kept closer to the component reducing
		// clutter (like passing around state) and increases readability.
		<div className={classes.App}>
			<HashRouter>
				<Switch>
					<Route exact path="/">
						<TimerPage
							working={working}
							category={category}
							project={project}
							onBreak={onBreak}
							breakSecondsEarned={breakSecondsEarned}
							workSecondsElapsed={workSecondsElapsed}
							setProject={setProject}
							setCategory={setCategory}
							metadataHandler={metadataHandler}
							freshStart={freshStart}
							startHandler={startHandler}
							stopHandler={stopHandler}
							breakHandler={breakHandler}
							finishHandler={finishHandler}
							focusIntervals={focusIntervals}
							shortBreaks={shortBreaks}
							longBreaks={longBreaks}
							totalBreakTime={totalBreakTime}
							sets={sets}
						/>
						<History visible={freshStart.current}/>
					</Route>

					<Route path="/finish">
						<FinishPage
							startNewSessionHandler={startNewSessionHandler}
							totalWorkTime={totalWorkTime}
							totalBreakTime={totalBreakTime}
							breakSecondsEarned={breakSecondsEarned}
							focusIntervals={focusIntervals}
							shortBreaks={shortBreaks}
							longBreaks={longBreaks}
							sets={sets}
							category={category}
							project={project}	
						/>
					</Route>

					<Route path="/history">
						<HistoryPage historyHandler={historyHandler}/>
					</Route>


				</Switch>
			</HashRouter>
		</div>
	);
}

export default App;
