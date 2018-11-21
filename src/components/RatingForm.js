import React, {Component} from 'react';

class RatingForm extends Component{
      state = {
            rating: 0
      };

      smile = (rating) => {
            switch(parseInt(rating)){
                  case 0:
                        this.setState({ rating: 'far fa-angry' });
                        break;
                  case 1:
                        this.setState({ rating: 'far fa-frown' });
                        break;
                  case 2:
                        this.setState({ rating: 'far fa-meh' });
                        break;
                  case 3:
                        this.setState({ rating: 'far fa-smile' });
                        break;
                  case 4:
                        this.setState({ rating: 'far fa-smile-beam' });
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
                        <form>
                              <i className={this.state.rating}></i>
                              <input type="text" placeholder="Your name" className="search-input container"/>
                              <textarea placeholder="What did you think about this song?" className="container"></textarea>
                              <button className="btn container">Submit</button>
                        </form>
                  </div>
            )
      }
}

export default RatingForm;