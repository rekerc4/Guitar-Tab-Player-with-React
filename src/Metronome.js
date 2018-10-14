import React, { Component } from 'react';
import './metronome.css';
import click1 from './click1.wav';

class Metronome extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
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
        console.log(this.state.playing);
  
    }

    startStop = () => {
        if(this.props.playing){
            console.log("fired");
            this.props.handleChangePlayState(false);
            clearInterval(this.timer); 
            console.log(this.state); 
            //this.setState({playing: false});
        }
        else{
            this.props.handleChangePlayState(true);
            console.log(this.props);
            this.timer = setInterval(this.beat,  (60 / this.state.bpm) * 1000);
            //this.setState({playing: true}); 
        }
       }
  
    render() {
      const { playing, bpm } = this.state;
  
      return (
        <section className="metronome">
          <div className="bpm-slider">
            <div>{bpm} BPM</div>
            <input type="range" min="60" max="240" value={bpm} onChange={this.handleBpmChange}/>
          </div>
          <button className="btn" onClick={this.startStop}>{playing ? 'Stop' : 'Play'}</button>
        </section>
      );
    }
  }
  
  export default Metronome;