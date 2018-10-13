import React, { Component } from 'react';
import './searchreturn.css';

class Searchreturn extends React.Component{
    
    constructor(props){
       super();
       this.state = {
           data: [], 
           defualtSearch: "Jolene",
           inputValue: '',
           retElement: 'null'
       }
    }
    
    

    getsong = () => {
        console.log(this.state.inputValue);
        let entered = this.state.inputValue; 
        let url = encodeURI("http://api.guitarparty.com/v2/songs/?query=" + entered);   
        fetch(url, {method: 'GET', headers: {'Content-Type': 'application/json', 'Guitarparty-Api-Key': '<API_KEY>'}}).then((res, ret, error) => {
            return res.json(); 
        }).then( (data) => {
            console.log(data);
            this.setState({retElement: data.objects[0].body}) ;
            console.log(this.state.retElement);
        })
    }

    updateInputValue(evt) {
        this.setState({
          inputValue: evt.target.value
        });
      }

    render() {
        
        return (
          <section className="searcharea" id="searcharea">
            <div className="return" id="return">
                <code>{this.state.retElement}</code>
            </div>
            <div className="search" id="search">
                <input type="text" className="bar" id="bar" value={this.state.inputValue} onChange={(evt) =>  {this.updateInputValue(evt)}}>
                </input>
                <button onClick={this.getsong} className="searchsubmit" id="searchsubmit">
                </button>
            </div>
          </section>
        );
      }
}

export default Searchreturn;