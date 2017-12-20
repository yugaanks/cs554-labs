import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import axiosInstance from "./utils/axiosInstance";
import GetBerries from "./utils/GetBerries";
import PaginationBasic from "./utils/PaginationBasic";

class Berries extends Component {
	constructor(props){
		super(props);
		this.state = {
			page: this.props.match.params.page,
			id: this.props.match.params.id
		}
		this.onChangePage=this.onChangePage.bind(this);
	}
	onChangePage(page) {
        // update state with new page of items
        //console.log(page);
        this.setState({ page: page });
    }

    render() {
    	if(this.state.id && this.state.id!==0){
			return <GetBerries id={this.state.id}/>
				
		}
		else if(this.state.page===0 || this.state.id===0)
			return null;
		else { 
    		return(
    			<div>
				<GetBerries page={this.state.page}/>
				<PaginationBasic page={this.state.page} onChangePage={this.onChangePage}/>
				</div>
    		);
    	}
    }
}
export default Berries