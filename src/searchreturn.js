import React, { Component } from 'react';
import './searchreturn.css';

class Searchreturn extends React.Component{
    
    constructor(props){
       super();
       this.state = {
           data: [], 
           defualtSearch: "Jolene",
           inputValue: ''
       }
    }
    
    getsong = () => {
        console.log(this.state.inputValue);
        let entered = this.state.inputValue; 
        let url = 'http://api.guitarparty.com/v2/songs/?API_KEY=\'<API-KEY>\'&query=' + entered;   
        fetch(url).then((res) => {
            console.log(res); 
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