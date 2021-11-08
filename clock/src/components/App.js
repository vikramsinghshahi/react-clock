import Countdown from './Countdown';
import Stopwatch from './Stopwatch';
import React from 'react';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stopwatch: false,
      countdown: false,
    };
  }
  close = (key) => {
    this.setState({ [key]: false });
  };

  render() {
    return (
      <div className="timer">
        <h1 className="timer_title">⏲️ Timers ⏲️</h1>
        <div className="btn_wrapper">
          {this.state.stopwatch ? (
            <Stopwatch close={this.close} />
          ) : (
            <button
              onClick={() => this.setState({ stopwatch: true })}
              className="btn_primary"
            >
              Show Stopwatch
            </button>
          )}
          {this.state.countdown ? (
            <Countdown close={this.close} />
          ) : (
            <button
              onClick={() => this.setState({ countdown: true })}
              className="btn_primary"
            >
              Show Countdown
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default App;
