import React, { Component } from 'react';
import Metronome from './Metronome';
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
        let beatCount = 0
        for(let i = 0; i < tab.length; i++){
            if(tab.charAt(i) === "["){
                changeArr.push(true); 
                beatCount = 0;
            }
            else{
                beatCount++
                changeArr.push(beatCount);
            }
        }
        return changeArr;
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
        console.log(this.props);
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
            let pacer = this.parseTab(data.objects[0].body);
            console.log(pacer);
            return {"lyrics": lyrics, "chords": chords, "change": pacer};
            }
        }).then( (data) => {
            this.setState({retElement: data.lyrics});
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