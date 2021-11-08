import React from 'react';
class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerOn: false,
      timerStart: 0,
      timerTime: 0,
    };
  }

  startTimer = () => {
    this.setState({
      timerOn: true,
      timerStart: Date.now() - this.state.timerStart,
      timerTime: this.state.timerStart,
    });
    !this.state.timerOn &&
      (this.timer = setInterval(() => {
        this.setState({
          timerTime: Date.now() - this.state.timerStart,
        });
      }, 10));
  };

  stopTimer = () => {
    this.setState({
      timerOn: false,
    });
    clearInterval(this.timer);
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  resetTimer = () => {
    clearInterval(this.timer);
    this.setState({
      timerOn: false,
      timerStart: 0,
      timerTime: 0,
    });
  };

  render() {
    const { timerTime } = this.state;
    let centiseconds = ('0' + (Math.floor(timerTime / 10) % 100)).slice(-2);
    let seconds = ('0' + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ('0' + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    let hours = ('0' + Math.floor(timerTime / 3600000)).slice(-2);

    return (
      <div className="countdown">
        <button className="cross" onClick={() => this.props.close('stopwatch')}>
          X
        </button>
        <h2 className="coundown_title">Stopwatch</h2>
        <div className="display_time ">
          <span>{hours}</span> : <span>{minutes}</span> : <span>{seconds}</span>
          : <span> {centiseconds}</span>
        </div>
        <div className="flex justify-between">
          {this.state.timerOn === false && this.state.timerTime === 0 && (
            <button className="btn_primary" onClick={this.startTimer}>
              Start
            </button>
          )}
          {this.state.timerOn === true && (
            <button className="btn_primary" onClick={this.stopTimer}>
              Stop
            </button>
          )}
          {this.state.timerOn === false && this.state.timerTime > 0 && (
            <button className="btn_primary" onClick={this.startTimer}>
              Resume
            </button>
          )}

          {this.state.timerOn === false && this.state.timerTime > 0 && (
            <button className="btn_primary" onClick={this.resetTimer}>
              Reset
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Stopwatch;
