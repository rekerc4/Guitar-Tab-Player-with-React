import React, { Component } from 'react';
import './grid.css';
import Metronome from './Metronome';
import Searchreturn from './searchreturn'; 


class Layout extends Component {
  constructor(props){ 
    super(props);
    this.state = {
     playing: false,
     bpm: 100
    }
    this.handleBPM = this.handleBPM.bind(this);
    this.handleChangePlayState = this.handleChangePlayState.bind(this);
  }

  handleBPM(newbpm){
    this.setState({
      bpm: newbpm
    })
  }

  handleBpmChange = event => {
      const bpm = event.target.value;
      this.setState({ bpm });
    }

  handleChangePlayState(newTruth){
    this.setState({
      playing: newTruth
    })
  }

    render() {  
      return (
        <div className="grid">
                <Metronome
                bpm = {this.state.bpm}
                playing = {this.state.playing} 
                handleBpmChange = {this.handleBpmChange}
                handleChangePlayState = {this.handleChangePlayState} 
                />
                <Searchreturn
                bpm = {this.state.bpm}
                playing = {this.state.playing} 
                />
        </div>
      );
    }
  }
  
  export default Layout;