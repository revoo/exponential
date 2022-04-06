import React from 'react';


// TODO: needs figuring out how to tie this into the state that will eventually be shipped to nodeJS. 
// how do i sent this state back to the root component?
// need to pass in a function to call back to update root state
const SessionMetadata = (props) => {

    if (props.startPage) {
        return (
            <div style={{color: 'white', margin: '20px 10px 20px 10px', fontSize: '25px' }}>
                <input type="text" placeholder="Project" style={{ height: '30px', width: '300px', fontSize: '30px', textAlign: 'center', marginBottom: '15px' }}onChange={ e => props.setProject(e.target.value.toUpperCase()) }></input>
                <br/>

                <input type="radio" id="category-label-programming" name="category" value="PROGRAMMING" onChange={ e => props.setCategory(e.target.value) }></input>
                {/* htmlFor is JSX for HTML for -- for labels */}
                <label htmlFor="category-label-programming" style={{ marginRight: '20px' }}>Programming</label>
                
                <input type="radio" id="category-label-music" name="category" value="MUSIC-PRODUCTION" onChange={ e => props.setCategory(e.target.value) }></input>
                <label htmlFor="category-label-music">Music Production</label>
                </div>
        );
    }

    else {
        return null;
    }
}

export default SessionMetadata;