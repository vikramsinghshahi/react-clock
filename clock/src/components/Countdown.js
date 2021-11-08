import React from 'react';
class Countdown extends React.Component {
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
      timerTime: this.state.timerTime,
      timerStart: this.state.timerTime,
    });
    this.timer = setInterval(() => {
      const newTime = this.state.timerTime - 10;
      console.log(`Time left is 🚀 ${newTime}`);
      if (newTime >= 0) {
        this.setState({
          timerTime: newTime,
        });
      } else {
        clearInterval(this.timer);
        this.setState({ timerOn: false });
        alert('Countdown ended');
      }
    }, 10);
  };

  stopTimer = () => {
    clearInterval(this.timer);
    this.setState({ timerOn: false });
  };
  resetTimer = () => {
    clearInterval(this.timer);
    if (this.state.timerOn === false) {
      this.setState({
        timerTime: 0,
      });
    }
  };

  adjustTimer = (input) => {
    const { timerTime, timerOn } = this.state;
    if (!timerOn) {
      if (input === 'incHours' && timerTime + 3600000 < 216000000) {
        this.setState({ timerTime: timerTime + 3600000 });
      } else if (input === 'decHours' && timerTime - 3600000 >= 0) {
        this.setState({ timerTime: timerTime - 3600000 });
      } else if (input === 'incMinutes' && timerTime + 60000 < 216000000) {
        this.setState({ timerTime: timerTime + 60000 });
      } else if (input === 'decMinutes' && timerTime - 60000 >= 0) {
        this.setState({ timerTime: timerTime - 60000 });
      } else if (input === 'incSeconds' && timerTime + 1000 < 216000000) {
        this.setState({ timerTime: timerTime + 1000 });
      } else if (input === 'decSeconds' && timerTime - 1000 >= 0) {
        this.setState({ timerTime: timerTime - 1000 });
      }
    }
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    const { timerTime, timerStart, timerOn } = this.state;
    let seconds = ('0' + (Math.floor((timerTime / 1000) % 60) % 60)).slice(-2);
    let minutes = ('0' + Math.floor((timerTime / 60000) % 60)).slice(-2);
    let hours = ('0' + Math.floor((timerTime / 3600000) % 60)).slice(-2);
    return (
      <div className="countdown">
        <button className="cross" onClick={() => this.props.close('countdown')}>
          X
        </button>
        <h2 className="coundown_title">Countdown</h2>
        <div className="display_time ">
          <span>Hours</span> : <span>Minutes</span> : <span>Seconds</span>
        </div>
        <div className="flex countdown_wrapper">
          <div className="col">
            <button onClick={() => this.adjustTimer('incHours')} className="">
              ⬆
            </button>
            <span className="countdown_time">{hours}</span>
            <button onClick={() => this.adjustTimer('decHours')}>⬇</button>
          </div>
          :
          <div className="col">
            <button onClick={() => this.adjustTimer('incMinutes')} className="">
              ⬆
            </button>
            <span className="countdown_time">{minutes}</span>
            <button onClick={() => this.adjustTimer('decMinutes')}>⬇</button>
          </div>
          :
          <div className="col">
            <button onClick={() => this.adjustTimer('incSeconds')} className="">
              ⬆
            </button>
            <span className="countdown_time">{seconds}</span>
            <button onClick={() => this.adjustTimer('incSeconds')}>⬇</button>
          </div>
        </div>

        <div className="flex justify-between">
          {timerOn === false && (timerStart === 0 || timerTime === timerStart) && (
            <button className="btn_primary" onClick={this.startTimer}>
              Start
            </button>
          )}
          {timerOn === true && timerTime >= 1000 && (
            <button className="btn_primary" onClick={this.stopTimer}>
              Stop
            </button>
          )}
          {timerOn === false &&
            timerStart !== 0 &&
            timerStart !== timerTime &&
            timerTime !== 0 && (
              <button className="btn_primary" onClick={this.startTimer}>
                Resume
              </button>
            )}

          {(timerOn === false || timerTime < 1000) &&
            timerStart !== timerTime &&
            timerStart > 0 && (
              <button className="btn_primary" onClick={this.resetTimer}>
                Reset
              </button>
            )}
        </div>
      </div>
    );
  }
}

export default Countdown;
