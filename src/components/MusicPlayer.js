import React, {Component} from 'react';
import {connect} from 'react-redux';

class MusicPlayer extends Component {
      componentWillReceiveProps(){
            let musicPlayer = document.querySelector('.music-player');
            
            let newAudioTag = document.createElement('audio');
            newAudioTag.setAttribute('controls', '');

            let newSourceTag = document.createElement('source');
            newSourceTag.src = this.props.state.searchResult.url;
            newSourceTag.type = 'audio/mp3';

            newAudioTag.appendChild(newSourceTag);

            console.log('received props', newAudioTag, this.props);
            
            musicPlayer.children[0].remove();
            musicPlayer.appendChild(newAudioTag);
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