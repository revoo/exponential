import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Link, useLocation } from 'react-router-dom';

import classes from './Pagination.module.css';

// takes components to render and number of components per page as props
const Pagination = (props) => {

    let [activePage, setActivePage] = useState(0);
    let [activePath, setActivePath] = useState(0);
    const routes = [];
    const items = [];
    let segment = [];

    const links = [];
    // segment items into 2d array and iterate over that with routes
    for (let i = 0; i < props.items.length; i += props.itemsPerPage) {
        segment = [];

        for (let j = i; j < props.itemsPerPage + i; j++) {
            segment.push(props.items[j]);
        }

        items.push(segment);
    }



    // generate routes but skip the first entry
    for (let i = 1; i <= items.length; i++) {
        routes.push(
            <Route key={i} path={`${props.basePath}/${Number(i) + 1}`}>
                {items[i]}
            </Route>
        );
    }

    // <p style={{ display: "inline-block", marginRight: "25px", fontSize: "22px" }}> {i + 1} </p>
    // <button className={(activePage === i) ? `${classes.link} ${classes.activeLink}` : classes.link}  onClick={(event) => { setActivePage(i); }}>{i + 1}</button>
    // generate links to pages
    for (let i = 0; i < routes.length; i++) {
        links.push(
            <Link key={i} to={`${props.basePath}/${Number(i) + 1}`} className={(activePage === i) ? `${classes.link} ${classes.activeLink}` : classes.link}  onClick={(event) => {  setActivePage(i); }}>
                {i + 1}
            </Link >
        );
    }

    // console.log("routes: ", routes);
    // console.log("links: ", links);

    // display the first results 
    // console.log(location.pathname, props.basePath);
    // useEffect( () => console.log(location.pathname, props.basePath), [location.pathname]);


    return (
        <BrowserRouter>
            { (activePage === 0) ? items[0] : null}
            <Switch>
                {routes}
            </Switch>

            {links}
        </BrowserRouter>
    );
}

export default Pagination;