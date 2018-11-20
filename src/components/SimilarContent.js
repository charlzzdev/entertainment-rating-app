import React, {Component} from 'react';
import {connect} from 'react-redux';
import {similarContent} from '../actions';

class SimilarContent extends Component{
      componentDidUpdate(prevProps){
            let currentState = this.props.state;

            if(prevProps.state.searchResult !== currentState.searchResult){
                  let allIds = '';
                  let tracks = [];

                  currentState.searchResult.genreIds.forEach(id => {
                        allIds += `${id},`;
                  });

                  fetch(`https://api.napster.com/v2.2/genres/${allIds}/tracks/top?apikey=MTFiZGY4NjgtMGM4Ni00YjIwLTk0OGYtYzI1ZWY4OGZjYTNk&limit=3`)
                        .then(res => res.json())
                        .then(data => {
                              data.tracks.forEach(track => {
                                    if(tracks.length < 3){
                                          tracks = [
                                                ...tracks,
                                                {
                                                      name: track.name,
                                                      artistName: track.artistName,
                                                      url: track.previewURL
                                                }
                                          ]
                                    }
                              });

                              this.props.similarContent(tracks);
                        });
            }
      }

      render(){
            return(
                  <div className="similar-content container">
                        <h1>Similar Content</h1>
                        {
                              typeof this.props.state.similarContent !== 'undefined' ?
                              (
                                    this.props.state.similarContent.map(content => {
                                          return (
                                                <div key={content.url} className="item">
                                                      <h2>{content.name}</h2>
                                                      <h3>{content.artistName}</h3>
                                                </div>
                                          )
                                    })
                              ) : null
                        }
                  </div>
            )
      }
}

const mapStateToProps = (state) => {
      return {
            state
      }
}

const mapDispatchToProps = (dispatch) => {
      return {
            similarContent: (content) => {dispatch(similarContent(content))}
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(SimilarContent);