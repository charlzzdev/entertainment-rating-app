import React, {Component} from 'react';
import {connect} from 'react-redux';
import {searchMusic} from '../actions';

class SearchForm extends Component {
      state = {
            isLoading: false
      };
      
      submitSearch = (e) => {
            e.preventDefault();

            let musicTitle = document.getElementById('music-title');
            let searchError = document.getElementById('search-error');
            let searchResult = {
                  genres: [],
                  genreDescriptions: []
            };
            this.setState({
                  isLoading: true
            });

            fetch(`https://api.napster.com/v2.2/search/verbose?apikey=MTFiZGY4NjgtMGM4Ni00YjIwLTk0OGYtYzI1ZWY4OGZjYTNk&per_type_limit=1&query=${musicTitle.value}&type=track`)
                  .then(res => res.json())
                  .then(data => {
                        let musicData = data.search.data.tracks[0];
                        let allGenres = '';
                        searchError.innerHTML = '';

                        musicData.links.genres.ids.forEach(genre => {
                              allGenres += `${genre},`;
                        });

                        fetch(`https://api.napster.com/v2.2/genres/${allGenres}?apikey=MTFiZGY4NjgtMGM4Ni00YjIwLTk0OGYtYzI1ZWY4OGZjYTNk`)
                              .then(res => res.json())
                              .then(data => {
                                    data.genres.forEach(genre => {
                                          searchResult = {
                                                albumName: musicData.albumName,
                                                artistName: musicData.artistName,
                                                musicName: musicData.name,
                                                seconds: musicData.playbackSeconds,
                                                url: musicData.previewURL,
                                                genreIds: [
                                                      ...musicData.links.genres.ids
                                                ],
                                                genres: [
                                                      ...searchResult.genres,
                                                      genre.name
                                                ],
                                                genreDescriptions: [
                                                      ...searchResult.genreDescriptions,
                                                      genre.description
                                                ]
                                          };
                                          this.setState({
                                                isLoading: false
                                          });
                                    });

                                    this.props.searchMusic(searchResult);
                              });
                  }).catch(err => {
                        searchError.innerHTML = 'The entered music title was not found.';
                        this.setState({
                              isLoading: false
                        });
                  });

            musicTitle.value = '';
      }

      render(){
            return(
                  <div className="search-form container">
                        <form onSubmit={this.submitSearch}>
                              <input type="text" placeholder="Music title" id="music-title" className="search-input container"/>
                              <button className="btn container" id="search-btn">Search</button>
                        </form>
                        <p id="search-error"></p>
                        {
                              this.state.isLoading === true ? (
                                    <div className="loading-spinner"></div>
                              ) : null
                        }
                  </div>
            )
      }
}

const mapDispatchToProps = (dispatch) => {
      return {
            searchMusic: (music) => dispatch(searchMusic(music))
      }
}

export default connect(null, mapDispatchToProps)(SearchForm);