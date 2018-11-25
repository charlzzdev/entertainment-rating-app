import React, {Component} from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import {connect} from 'react-redux';

class Ratings extends Component {
      state = {
            ratings: []
      };

      componentDidUpdate(prevProps){
            if(prevProps.music !== this.props.music){
                  const firestore = firebase.firestore();

                  firestore.settings({
                        timestampsInSnapshots: true
                  });

                  this.setState({
                        ratings: []
                  });
      
                  firestore.collection('ratings').onSnapshot(snapshot => {
                        this.setState({
                              ratings: []
                        });

                        snapshot.docs.forEach(doc => {
                              if(doc.data().music === this.props.music){
                                    this.setState({
                                          ratings: [
                                                ...this.state.ratings,
                                                {
                                                      id: doc.id,
                                                      name: doc.data().name,
                                                      music: doc.data().music,
                                                      stars: doc.data().stars,
                                                      rating: doc.data().rating
                                                }
                                          ]
                                    });
                              }
                        });
                  });
            }
      }

      render(){
            return(
                  <div className="ratings container">
                        <h1>Ratings</h1>
                        <div className="wrapper">
                              {
                                    this.props.music !== 'undefined by undefined' ? (
                                          this.state.ratings.length > 0 ? (
                                                this.state.ratings.map(rating => {
                                                      return(
                                                            <div className="item" key={rating.id}>
                                                                  <h2>{rating.name} - {rating.stars} stars</h2>
                                                                  <p>{rating.rating}</p>
                                                            </div>
                                                      )
                                                })
                                          ) : <p>{this.props.music} has no ratings yet. Be the first to rate it!</p>
                                    ) : null
                              }
                        </div>
                  </div>
            )
      }
}

const mapStateToProps = (state) => {
      return {
            music: `${state.searchResult.musicName} by ${state.searchResult.artistName}`
      }
}

export default connect(mapStateToProps)(Ratings);