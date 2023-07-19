import React, {Component} from "react";
import RouterView from "../RouterView";
import routes from '../index'
const routerList = [
    ...routes
]
export default class ViewRouter extends Component{
    render(){
        return(
            <div className="w100 h100">
                <RouterView routes={routerList} />
            </div>
        )
    }
}