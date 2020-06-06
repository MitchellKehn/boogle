import React from "react";
import {Dropdown, Button, Dimmer, Header, Icon} from "semantic-ui-react";
import {randomChoice} from "../logic/arrayUtils";


function formatSeconds(sec_num) {
    sec_num = Math.round(sec_num);
    let hours   = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds = Math.round(sec_num - (hours * 3600) - (minutes * 60));

    if (seconds < 10) {seconds = "0"+seconds;}
    return `${minutes}:${seconds}`;
}

const timeoutMessages = [
    "Time's up!",
    "That's all, folks!",
    "Pencils down!",
    "Quit it!",
    "CEASE!",
]

const timeoutSubMessages = [
    "Better luck next time.",
    "Oi oi, no cheating!",
    "Don't make me come over there!",
    "Yes that does mean you, Helen.",
    "You should have quit while you were ahead.",
    "I'd offer you commiserations, but even that may be giving you a bit too much credit.",
    "Persistence is futile."
]

const timeoutIcons = [
    "hand spock outline",
    "eye",
    "bomb",
    "fire",
    "heart outline",
    "lightbulb outline",
    "camera",
    "stopwatch",
    "pencil",
]

const timerOptions = [
    // {
    //     key: 0,
    //     text: "3 seconds",
    //     value: 3,
    // },
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

            isDimmerActive: false,
            dimmerText: "",
            dimmerMessage: "",
            dimmerIcon: "",
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
        this.setState({
            isDimmerActive: true,
            dimmerText: randomChoice(timeoutMessages),
            dimmerMessage: randomChoice(timeoutSubMessages),
            dimmerIcon: randomChoice(timeoutIcons),
        })
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
        let content;

        if (!this.state.isActive) {
            content = (
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
            content = (
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

        return [
            content,
            <Dimmer active={this.state.isDimmerActive}
                    page
                    onClickOutside={()=>this.setState({isDimmerActive: false})}
            >
                <Icon name={this.state.dimmerIcon} size='massive' />
                <Header as="h1" inverted>{this.state.dimmerText}</Header>
                <span>{this.state.dimmerMessage}</span>
            </Dimmer>
        ]
    }
}


