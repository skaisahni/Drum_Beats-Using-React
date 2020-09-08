import React from 'react';
import './style.css';

const drumPads = [{
  keyCode: 81,
  keyChar: 'Q',
  id: 'Cev_H2',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
}, {
  keyCode: 87,
  keyChar: 'W',
  id: 'Dry_Ohh',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
}, {
  keyCode: 69,
  keyChar: 'E',
  id: 'Dsc_Oh',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
}, {
  keyCode: 65,
  keyChar: 'A',
  id: 'Heater-6',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
}, {
  keyCode: 83,
  keyChar: 'S',
  id: "Kick-n'-Hat",
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
}, {
  keyCode: 68,
  keyChar: 'D',
  id: 'Bld_H1',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
}, {
  keyCode: 90,
  keyChar: 'Z',
  id: 'Punchy-Kick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
}, {
  keyCode: 88,
  keyChar: 'X',
  id: 'Side-Stick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
}, {
  keyCode: 67,
  keyChar: 'C',
  id: 'Snare',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
}
];

class DrumPad extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.changeDisplay = this.changeDisplay.bind(this);
        this.playSound = this.playSound.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyPress);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyPress);
    }

    handleClick(event) {
        this.playSound();
        this.changeDisplay(this.props.id);

        var linkToFocus = document.getElementById(this.props.id);
        linkToFocus.focus();
        setTimeout(function () { linkToFocus.blur(); }, 100);
    }

    handleKeyPress(event) {
        if (event.keyCode === this.props.keyCode) {
            this.playSound();
            this.changeDisplay(this.props.id);

            var linkToFocus = document.getElementById(this.props.id);
            linkToFocus.focus();
            setTimeout(function () { linkToFocus.blur(); }, 100);

        }
    }

    changeDisplay(value) {
        this.props.displayCallback(value);
    }

    playSound(e) {
        const sound = document.getElementById(this.props.keyChar);
        sound.currentTime = 0;
        sound.play();
    }

    render() {
        return (
            <button class="drum-pad" id={this.props.id} onClick={this.handleClick} onKeyDown={this.handleKeyPress}>
                {this.props.keyChar}
                <audio className='clip' id={this.props.keyChar} src={this.props.url}></audio>
            </button>
        )
    }
};



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "",
    };
    this.handleDisplay = this.handleDisplay.bind(this)
  }

  handleDisplay(childData) {
    this.setState({ display: childData })
  }

  render() {
    let drumPadsDisplayed = drumPads.map((drumObj, i, drumPadsArr) => {
      return (
        <DrumPad
          keyCode={drumPadsArr[i].keyCode}
          keyChar={drumPadsArr[i].keyChar}
          id={drumPadsArr[i].id}
          url={drumPadsArr[i].url}
          displayCallback={this.handleDisplay}
        />
      )
    });
    return (
      <div id="drum-machine">
        {/* TITLE */}
        <div id="header">
          <h1>Rock N Roll</h1>
          <h3>by <a href="https://codepen.io/skaisahni" > skaisahni</a></h3>
        </div>

        {/* DISPLAY */}
        <div id="display">
          <p>{this.state.display}</p>
        </div>


        {/* DRUM MACHINE */}
        <div id="keys">{drumPadsDisplayed}</div>
      </div>
    );
  }
};

export default App;
