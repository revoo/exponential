import React from 'react';
import { Link } from 'react-router-dom';

import Button from './UI/Button/Button';

// which button to show during which state. very succicent compared to vanilla with the various if statements and element.visible = false statements everywhere. that approach
// took a while to work out all the bugs. this just worked instantly. 
const ActiveButtons = (props) => {

    let activeButtons = [<Button color="green" text="Start" key="1" onClickHandler={props.startHandler} />];
    if (props.working) {
        activeButtons.pop();
        activeButtons.push(<Button color="blue" text="Break" key="4" onClickHandler={props.breakHandler} />);
    }

    if (props.onBreak) {
        activeButtons.pop()
        activeButtons.push(<Button color="green" text="Resume Work" key="5" onClickHandler={props.startHandler} />);
    } else if (props.breakEarned > 0) {
        activeButtons.pop()
        activeButtons.push(<Button color="green" text="Break" key="4" onClickHandler={props.breakHandler} />);
    }


    // finish
    if (!props.freshStart.current) {
        activeButtons.push(
            <Link to="/finish" key="3">
                <Button color="orange" text="Finish" onClickHandler={props.finishHandler} />
            </Link>
        );
    }
    // on main screen
    else {
        activeButtons.push(
            <Link to="/history" key="4">
                <Button color="orange" text="View History" onClickHandler={props.historyHandler} />
            </Link>
        );
    }

    return (
        <div>
            {activeButtons}
        </div>
    )
}

export default ActiveButtons;