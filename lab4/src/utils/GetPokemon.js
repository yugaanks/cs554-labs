import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import axiosInstance from "./axiosInstance";
import NoMatch from "./NoMatch";

class GetPokemon extends Component { 
	constructor(props) {
		super(props);
		//const page=this.props.page;
		//console.log(page);
		this.state={
			name: undefined,
			weight: undefined,
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
		    				weight: 'NaN',
		    				id: 'NaN'
		     });
			return null;
		}
	    try{
	    	const url = `pokemon/${searchQuery}`;
	    	const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchQuery}`);
	    	if(response.status===404){
	    		this.setState({ name: 'NaN',
		    					weight: 'NaN',
		    					id: 'NaN',
		    					nf: true
		     	});
		     	
	    	}
	    	else{
			    	const rc=await response.json();
				    //const response1 = await axiosInstance.get(url);
				    //console.log(rc);
				    const name=rc.name;
				    const weight=rc.weight;
				    const id=rc.id;
				    
				    this.setState({ name: name,
				    				weight: weight,
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
		if(!this.state.nf )
			return (
							<div className="pokemon-info">
								
									ID: {this.state.id}<br/>
									Name: {this.state.name}<br/>
									Weight: {this.state.weight}
								
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
export default GetPokemon;