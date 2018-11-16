import React, {Component} from 'react';
import {connect} from 'react-redux';

class MusicPlayer extends Component {
      componentWillReceiveProps(){
            setTimeout(() => {
                  let musicPlayer = document.querySelector('.music-player');
            
                  let newAudioTag = document.createElement('audio');
                  newAudioTag.setAttribute('controls', '');

                  let newSourceTag = document.createElement('source');
                  newSourceTag.src = this.props.state.searchResult.url;
                  newSourceTag.type = 'audio/mp3';

                  newAudioTag.appendChild(newSourceTag);
                  
                  musicPlayer.children[0].remove();
                  musicPlayer.appendChild(newAudioTag);
            }, 1);
      }
      
      render(){
            return(
                  <div className="music-player container">
                        <audio controls></audio>
                  </div>
            )
      }
}

const mapStateToProps = (state) => {
      return {
            state
      }
}

export default connect(mapStateToProps)(MusicPlayer);