import React, { Component } from 'react';
import Appbar from './components/Appbar';
import SearchForm from './components/SearchForm';
import MusicPlayer from './components/MusicPlayer';
import MusicDetails from './components/MusicDetails';
import SimilarContent from './components/SimilarContent';
import RatingForm from './components/RatingForm';
import Ratings from './components/Ratings';

class App extends Component {
      render() {
            return (
                  <div className="App">
                        <Appbar/>
                        <div id="main">
                              <div className="music-wrapper">
                                    <div className="search">
                                          <SearchForm/>
                                          <MusicPlayer/>
                                    </div>
                                    <MusicDetails/>
                                    <RatingForm/>
                              </div>
                              <div className="side-content">
                                    <SimilarContent/>
                                    <Ratings/>
                              </div>
                        </div>
                  </div>
            );
      }
}

export default App;
