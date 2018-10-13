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
    
    parseTab = (tab) => {
        let changeArr = []
        for(let i = 0; i < tab.length; i++){
            if(tab.charAt(i) === "["){
                changeArr.push(true); 
            }
            else{
                changeArr.push(false);
            }
        }
    }

    getChords = (tab) => {
        let chords = tab.match(/[^\[]+(?=\])/g);
        return chords; 
    }

    displayString = (tab) => {
        let lyrics = tab.replace(/\[(.*?)\]/g, ""); 
        return lyrics; 
    }

    getsong = () => {
        let entered = this.state.inputValue; 
        console.log(entered);
        let url = encodeURI("http://api.guitarparty.com/v2/songs/?query=" + entered);   
        fetch(url, {method: 'GET', headers: {'Content-Type': 'application/json', 'Guitarparty-Api-Key': 'cb698fa1f661c22f983099a299c0a525d5847d18'}}).then((res, ret, error) => {
            return res.json(); 
        }).then( (data) => {
            if(data.objects.length === 0){
                 this.setState({retElement: "No Song of that name is found"})
            }
            else{
            let lyrics = this.displayString(data.objects[0].body);
            let chords = this.getChords(data.objects[0].body);
            console.log(chords);
            console.log(lyrics); 
            this.parseTab(data.objects[0].body);
            this.setState({retElement: data.objects[0].body});
            }
        }).then( (data) => {

        });
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