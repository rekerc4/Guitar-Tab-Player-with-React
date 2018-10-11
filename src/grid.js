import React, { Component } from 'react';
import './grid.css';
import Metronome from './Metronome';


class Layout extends Component {
    render() {  
      return (
        <div className="grid">
                <Metronome />
        </div>
      );
    }
  }
  
  export default Layout;