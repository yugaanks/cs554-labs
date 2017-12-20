import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import axiosInstance from "./axiosInstance";
import NoMatch from "./NoMatch";

class GetMachines extends Component { 
	constructor(props) {
		super(props);
		//const page=this.props.page;
		//console.log(page);
		this.state={
			id: undefined,
			move: undefined,
			version: undefined,
			nf: false
		};
	}
 	async componentDidMount() {
   	 	const page = this.props.page;
   	 	if(page)
    		await this.searchForPage(page);
    	else if(this.props.id)
    		await this.searchForPage(this.props.id);
  }
  	async componentWillReceiveProps(nextProps) {
   	 	const page = this.props.page;
   	 	const id=this.props.id;
    	if(page && page!==nextProps.page)
    		await this.searchForPage(nextProps.page);
    	else if(id && id!==nextProps.id)
    		await this.searchForPage(nextProps.id);
  	}
	async searchForPage(searchQuery) {
		if(searchQuery===0){
			this.setState({ id: 'Not Found',
		    				move: 'NaN',
		    				version: 'NaN'
		     });
			return null;
		}
	    try{
	    	const url = `machine/${searchQuery}`;
	    	const response = await fetch(`https://pokeapi.co/api/v2/machine/${searchQuery}`);
	    	if(response.status===404){
	    		this.setState({ move: 'NaN',
		    					version: 'NaN',
		    					id: 'NaN',
		    					nf: true
		     	});
	    	}
	    	else{
		    	const rc=await response.json();
			    //const response1 = await axiosInstance.get(url);
			    //console.log(rc);
			    const move=rc.move.name;
			    const version=rc.version_group.name;
			    const id=rc.id;
			    
			    this.setState({ version: version,
			    				move: move,
			    				id: id,
				    			nf: false
			     });
			}
		}
		catch(e){
			console.log(e);
		}
	  }

	render() {
		if(!this.state.nf)
		return (
			<div className="machine-info">
				
					ID: {this.state.id}<br/>
					Version: {this.state.version}<br/>
					Move: {this.state.move}
				
			</div>
		);
		else if(this.props.page==0){
			return <div/>
		}
		else {
			return <NoMatch />
		}
	}
}
export default GetMachines;