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
           retElement: 'null', 
           displayChords: 'null'
       }
    }
    
    parseTab = (tabbed) => {
        let tab = tabbed.replace(/\\n|\\r/, '').replace(/\s\s+/g, ' ');
        console.log(tab);
        let position = tab.indexOf('[');
        let changeArr = [];
        changeArr.push(position);
        let subtractor = 0; 
        while(tab.indexOf('[', position + 1) !== -1){
            position = tab.indexOf('[', position + 1);
            changeArr.push(position);
            
        }
        let subtractor = 0 
        console.log(changeArr);
        for(let i = 0; i < changeArr.length; i++){
            changeArr[i] = changeArr[i] - subtractor;
            subtractor += 4;
        }
        console.log(changeArr);
        return changeArr;
    }

    getChords = (tab) => {
        let chords = tab.match(/[^\[]+(?=\])/g);
        return chords; 
    }

    displayString = (tab) => {
        let tabbed = tab.replace(/\\n|\\r/, "");
        let lyrics = tabbed.replace(/\[(.*?)\]/g, ""); 
        return lyrics; 
    }

    addSpaceBetweenChords = (spaces, chords) => {
        let str = ""
        console.log(chords);
        let iterator = 0;
        let getChord = 0; 
        console.log(spaces[spaces.length - 1]);
        while(iterator <= spaces[spaces.length - 1]){
            if(spaces[getChord] === iterator){
                str += chords[getChord];
                getChord++;
                console.log("fired");
            }
            else{
                str += " ";
            }
            iterator++; 
        }
        console.log(str);
        return str; 
    }

    getsong = () => {
        console.log(this.props);
        console.log(document.getElementById("search").getBoundingClientRect().width)
        let entered = this.state.inputValue; 
        console.log(entered);
        let url = encodeURI("http://api.guitarparty.com/v2/songs/?query=" + entered);   
        fetch(url, {method: 'GET', headers: {'Content-Type': 'application/json', 'Guitarparty-Api-Key': '<API-KEY>'}}).then((res, ret, error) => {
            return res.json(); 
        }).then( (data) => {
            if(data.objects.length === 0){
                 this.setState({retElement: "No Song of that name is found"})
            }
            else{
            console.log(data.objects[0].body.length);
            let lyrics = this.displayString(data.objects[0].body);
            let chords = this.getChords(data.objects[0].body);
            let pacer = this.parseTab(data.objects[0].body);
            let chordsAbove = this.addSpaceBetweenChords(pacer, chords);
            console.log(chordsAbove);
            console.log(lyrics);
            return {"lyrics": lyrics, "chords": chords, "change": pacer, "chordsAbove": chordsAbove};
            }
        }).then( (data) => {
            this.setState({retElement: data.lyrics});
            this.setState({displayChords: data.chordsAbove});
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
            <div className="chordNames" id="chordName">
                {this.state.displayChords.replace(/ /g, "\u00a0")}
            </div>
            <div className="return" id="return">
                {this.state.retElement}
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