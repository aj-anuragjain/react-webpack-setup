/**
 * Created by jain-hub on 3/2/17.
 */

import React from "react"
import {render} from "react-dom"
import {Router, Route, Link, browserHistory} from "react-router"


import Page1 from "./page1"
import Page2 from "./page2"
import Page3 from "./page3"
import home from "./home"


import Nav from "../components/nav"
import AsideLeft from "../components/aside_left"


let AsideRight = React.createClass({
    render(){
        "use strict";
        return <section className="aside-right">
            <Router history={browserHistory}>
                <Route path="/" component={home} />
                <Route path="/page1" component={Page1} />
                <Route path="/page2" component={Page2} />
                <Route path="/page3" component={Page3} />
            </Router>
        </section>
    }
});


let TopModule =  React.createClass({
    render(){
        "use strict";
        return <div className="top-level-layer">
            <Nav/>
            <aside className="aside">
                <AsideLeft />
                <AsideRight />
            </aside>
        </div>
    }
});


render(<TopModule/>, document.getElementById("react-dom"));
