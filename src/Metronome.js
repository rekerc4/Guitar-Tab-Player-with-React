import React, { Component } from 'react';
import './metronome.css';
import click1 from './click1.wav';

class Metronome extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        playing: false,
        count: 0,
        bpm: 100,
        beatsPerMeasure: 4
      };

      this.click1 = new Audio(click1);
    }

    handleBpmChange = event => {
        const bpm = event.target.value;
        this.setState({ bpm });
      }
    
    beat = () => {
        this.click1.play();
    }

    startStop = () => {
        if(this.state.playing){
            clearInterval(this.timer); 
            this.setState({playing: false});
        }
        else{
            this.timer = setInterval(this.beat,  (60 / this.state.bpm) * 1000);
        }
       }
  
    render() {
      const { playing, bpm } = this.state;
  
      return (
        <div className="metronome">
          <div className="bpm-slider">
            <div>{bpm} BPM</div>
            <input type="range" min="60" max="240" value={bpm} onChange={this.handleBpmChange}/>
          </div>
          <button className="btn" onClick={this.startStop}>{playing ? 'Stop' : 'Start'}</button>
        </div>
      );
    }
  }
  
  export default Metronome;