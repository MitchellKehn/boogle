import React from "react";
import {Dropdown, Button} from "semantic-ui-react";


function formatSeconds(sec_num) {
    sec_num = Math.round(sec_num);
    let hours   = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds = Math.round(sec_num - (hours * 3600) - (minutes * 60));

    if (seconds < 10) {seconds = "0"+seconds;}
    return `${minutes}:${seconds}`;
}

const timerOptions = [
    {
        key: 0,
        text: "30 seconds",
        value: 30,
    },
    {
        key: 1,
        text: "1 minute",
        value: 60,
    },
    {
        key: 2,
        text: "2 minutes",
        value: 120,
    },
    {
        key: 3,
        text: "3 minutes",
        value: 180,
    },
]

export default class CountdownTimer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isActive: false,
            duration: timerOptions[2].value,
            stopTime: null,
            displayText: "",
        }

        this.timerId = null;

        this.startTimer = this.startTimer.bind(this);
        this.handleTimerUpdate = this.handleTimerUpdate.bind(this);
        this.onTimerFinish = this.onTimerFinish.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
    }

    startTimer() {
        this.setState({
            isActive: true,
            stopTime: Date.now() + this.state.duration * 1000
        });

        this.timerId = setInterval(this.handleTimerUpdate, 1000);
        setTimeout(this.handleTimerUpdate, 0);
    }

    handleTimerUpdate() {
        let now = Date.now();
        let until = (this.state.stopTime - now) / 1000;  // time until timer end, in seconds

        this.setState({
            displayText: formatSeconds(Math.max(until, 0))
        })

        if (until <= 0) {
            this.onTimerFinish();
        }
    }

    onTimerFinish() {
        this.stopTimer();
        if (this.props.onFinish !== undefined) {
            this.props.onFinish()
        }
    }

    stopTimer() {
        this.setState({
            isActive: false,
            stopTime: null,
            displayText: "",
        });
        if (this.timerId !== null) {
            clearInterval(this.timerId);
        }
    }

    componentWillUnmount() {
        this.stopTimer();
    }

    render() {
        if (!this.state.isActive) {
            return (
                <span>
                    Set timer for{" "}
                    <Dropdown inline
                              options={timerOptions}
                              value={this.state.duration}
                              onChange={(event, data)=> this.setState({duration: data.value})}
                    />
                    <br/>
                    <Button color="green"
                            onClick={this.startTimer}
                    >
                        Go!
                    </Button>
                </span>
            )
        }
        else {
            return (
                <span>
                    <Button icon="times"
                            label={{style: {fontSize: 20}, as: "span", content: this.state.displayText}}
                            labelPosition="left"
                            size="huge"
                            onClick={this.stopTimer}
                    />
                </span>
            )
        }
    }
}


