/**
 * Created by jain-hub on 3/2/17.
 */

import React from "react"
import {render} from "react-dom"
import {Router, Route, Link, browserHistory} from "react-router"


import Page1 from "./page1"
import Page2 from "./page4"
import Page3 from "./page2"
import Page4 from "./page3"


import Nav from "../components/nav"
import AsideLeft from "../components/aside_left"


let AsideRight = React.createClass({
    render(){
        "use strict";
        return <section className="aside-right">
            <Router history={browserHistory}>
                <Route path="/" component={Page1} />
                <Route path="/user/plan/chooser" component={Page2} />
                <Route path="/user/plan/booking" component={Page3} />
                <Route path="/user/plan/booking/complete" component={Page4} />
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
