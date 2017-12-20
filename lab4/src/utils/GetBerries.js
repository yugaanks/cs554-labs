import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import axiosInstance from "./axiosInstance";
import NoMatch from "./NoMatch";

class GetBerries extends Component { 
	constructor(props) {
		super(props);
		//const page=this.props.page;
		//console.log(page);
		this.state={
			name: undefined,
			size: undefined,
			id: undefined,
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
			this.setState({ name: 'Not Found',
		    				size: 'NaN',
		    				id: 'NaN'
		     });
			return null;
		}
	    try{
	    	const url = `berry/${searchQuery}`;
	    	const response = await fetch(`https://pokeapi.co/api/v2/berry/${searchQuery}`);
	    	if(response.status===404){
	    		this.setState({ name: 'NaN',
		    					size: 'NaN',
		    					id: 'NaN',
		    					nf: true
		     	});
	    	}
	    	else {
		    	const rc=await response.json();
			    //const response1 = await axiosInstance.get(url);
			    //console.log(rc);
			    const name=rc.name;
			    const size=rc.size;
			    const id=rc.id;
			    
			    this.setState({ name: name,
			    				size: size,
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
			<div className="berry-info">
				
					ID: {this.state.id}<br/>
					Name: {this.state.name}<br/>
					Size: {this.state.size}
				
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
export default GetBerries;