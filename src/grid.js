import React, { Component } from 'react';
import './grid.css';
import Metronome from './Metronome';
import Searchreturn from './searchreturn'; 


class Layout extends Component {
    render() {  
      return (
        <div className="grid">
                <Metronome />
                <Searchreturn />
        </div>
      );
    }
  }
  
  export default Layout;