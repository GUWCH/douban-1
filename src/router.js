import React from 'react'
import {Router, Route, Switch} from 'react-router-dom'
import Test from './components/test'
// import PageContainer from '../components/pageContainer'
// import DownLoad from '../containers/download'
export default function (history) {
    return (
       <Router history = {history}>
           <Switch>
               <Route path = '/test' component = {Test} />
               {/* <Route path = '/download' component = {DownLoad} /> */}
               {/* <Route path = '/' component = {PageContainer}> */}
            </Switch>
        </Router>
    )
}