import React from 'react';
import {connect} from 'react-redux';

const MusicDetails = (props) => {
      let {
            musicName,
            artistName,
            albumName,
            genres,
            genreDescriptions,
            seconds
      } = props.state.searchResult;
      let genreIndex = -1;

      return(
            <div className="music-details container">
                  {
                        typeof musicName === 'undefined' ? null :
                        (
                              <div>
                                    <h1>{musicName} by
                                          <a href={`https://www.google.com/search?q=${artistName}`} id="artist-name"> {artistName}</a>
                                    </h1>
                                    <h2>Album: {albumName}</h2>
                                    <ul>
                                          Genres:
                                          {
                                                genres.map(genre => {    
                                                      genreIndex++;
                                                      return <li key={genre} title={genreDescriptions[genreIndex]}>{genre}</li>
                                                })
                                          }
                                    </ul>
                                    <strong>Length: {seconds} seconds</strong>
                              </div>
                        )
                  }
            </div>
      )
}

const mapStateToProps = (state) => {
      return {
            state
      }
}

export default connect(mapStateToProps)(MusicDetails);