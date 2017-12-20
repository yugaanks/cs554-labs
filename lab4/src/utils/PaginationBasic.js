import React, { Component } from "react";
import axiosInstance from "./axiosInstance";
import GetPokemon from "./GetPokemon";
var Pagination = require('react-bootstrap/lib/Pagination');
class PaginationBasic extends Component {
	constructor(props) {
    	super(props);
    	this.state = {
    		activePage: Number(this.props.page)
    	};
    	this.handleSelect=this.handleSelect.bind(this);
    }

 
    componentDidUpdate() {
    	//console.log(this.props.page+" "+this.state.activePage);
    	if(this.props.page!==this.state.activePage){
    		this.props.onChangePage(this.state.activePage);
    		
    	}
    	
    }
	handleSelect(eventKey) {
	  	//console.log(eventKey)
	    this.setState({
	      activePage: eventKey
	    }); 
	    
	  }

	

	  render() {
		
	  	if(this.state.activePage===0){
	  		return (
		    	<div>
		    	<Pagination 
	        		next
	        		last
	        		maxButtons={5}
		          bsSize="large"
		          items={20}
		          activePage={this.state.activePage}
		          onSelect={this.handleSelect} />
		        <br />

		        
		      </div>
		    );
	  	}
	  	else 
		    return (
		    	<div>
		    	

		      
		        <Pagination prev
	        		next
	        		first
	        		last
	        		ellipsis
	        		boundaryLinks
					maxButtons={5}
		          bsSize="large"
		          items={20}
		          activePage={this.state.activePage}
		          onSelect={this.handleSelect} />
		        <br />

		        
		      </div>
		    );
	  }
}
export default PaginationBasic;