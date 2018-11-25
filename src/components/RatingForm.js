import React, {Component} from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import {connect} from 'react-redux';

class RatingForm extends Component{
      state = {
            rating: '',
            stars: 0
      };

      smile = (rating) => {
            switch(parseInt(rating)){
                  case 0:
                        this.setState({ rating: 'far fa-angry', stars: 1 });
                        break;
                  case 1:
                        this.setState({ rating: 'far fa-frown', stars: 2 });
                        break;
                  case 2:
                        this.setState({ rating: 'far fa-meh', stars: 3 });
                        break;
                  case 3:
                        this.setState({ rating: 'far fa-smile', stars: 4 });
                        break;
                  case 4:
                        this.setState({ rating: 'far fa-smile-beam', stars: 5 });
                        break;
                  default:
                        return null;
            }
      }

      fillStar = (e) => {
            if(e.target.className === 'far fa-star'){
                  for(let i = e.target.id; i >= 0; i--){
                        e.target.parentNode.childNodes[i].setAttribute('class', 'fas fa-star');
                  }
                  this.smile(e.target.id);
            } else{
                  for(let i = parseInt(e.target.id)+1; i <= 4; i++){
                        e.target.parentNode.childNodes[i].setAttribute('class', 'far fa-star');
                  }
                  this.smile(e.target.id);
            }
      }

      submitForm = (e) => {
            e.preventDefault();
            let name = e.target.childNodes[1];
            let rating = e.target.childNodes[2];
            
            const firestore = firebase.firestore();

            firestore.settings({ timestampsInSnapshots: true });

            if(typeof name.value !== 'undefined' && name.value !== '' && this.state.stars !== 0 && this.props.music !== 'undefined by undefined'){
                  firestore.collection('ratings').add({
                        name: name.value,
                        rating: rating.value,
                        stars: this.state.stars,
                        music: this.props.music
                  });

                  rating.value = '';
                  document.querySelector('.stars').childNodes.forEach(child => child.className = 'far fa-star');
                  this.setState({ rating: '', stars: 0 });
            }
      }

      render(){
            return(
                  <div className="rating-form container">
                        <div className="stars">
                              <i className="far fa-star" onClick={this.fillStar} id="0"></i>
                              <i className="far fa-star" onClick={this.fillStar} id="1"></i>
                              <i className="far fa-star" onClick={this.fillStar} id="2"></i>
                              <i className="far fa-star" onClick={this.fillStar} id="3"></i>
                              <i className="far fa-star" onClick={this.fillStar} id="4"></i>
                        </div>
                        <form onSubmit={this.submitForm}>
                              <i className={this.state.rating}></i>
                              <input type="text" placeholder="Your name" className="search-input container"/>
                              <textarea placeholder="What did you think about this song? (Optional)" className="container"></textarea>
                              <button className="btn container">Submit</button>
                        </form>
                  </div>
            )
      }
}

const mapStateToProps = (state) => {
      return {
            music: `${state.searchResult.musicName} by ${state.searchResult.artistName}`
      }
}

export default connect(mapStateToProps)(RatingForm);