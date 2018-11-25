import React, {Component} from 'react';
import {connect} from 'react-redux';
import {similarContent} from '../actions';

class SimilarContent extends Component{
      state = {
            isLoading: false
      };

      componentDidUpdate(prevProps){
            let currentState = this.props.state;

            if(prevProps.state.searchResult !== currentState.searchResult){
                  this.setState({
                        isLoading: true
                  });
                  let allIds = '';
                  let tracks = [];

                  currentState.searchResult.genreIds.forEach(id => {
                        allIds += `${id},`;
                  });

                  fetch(`https://api.napster.com/v2.2/genres/${allIds}/tracks/top?apikey=MTFiZGY4NjgtMGM4Ni00YjIwLTk0OGYtYzI1ZWY4OGZjYTNk&limit=10`)
                        .then(res => res.json())
                        .then(data => {
                              data.tracks.forEach(track => {
                                    if(tracks.length < 10){
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
                              this.setState({
                                    isLoading: false
                              });
                        });
            }
      }

      searchThis = (e) => {
            let searchInput = document.getElementById('music-title');
            let searchBtn = document.getElementById('search-btn');

            searchInput.value = `${e.target.innerHTML} ${e.target.nextSibling.innerHTML}`;
            searchBtn.click();
      }

      render(){
            return(
                  <div className="similar-content container">
                        <h1>Similar Content</h1>
                        <div className="wrapper">
                              {
                                    this.state.isLoading === true ? (
                                          <div className="loading-spinner"></div>
                                    ) : (
                                          typeof this.props.state.similarContent !== 'undefined' ? (
                                                this.props.state.similarContent.map(content => {
                                                      return (
                                                            <div key={content.url} className="item">
                                                                  <h2 onClick={this.searchThis} className="blue">{content.name}</h2>
                                                                  <h3>{content.artistName}</h3>
                                                            </div>
                                                      )
                                                })
                                          ) : null
                                    )
                              }
                        </div>
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