import React from "react";
import {Grid, Statistic} from "semantic-ui-react";
import {getScore} from "../logic/game";

class Scoreboard extends React.Component {
    render() {
        let wordCount = 0;
        let score = 0;

        for (const word of this.props.wordList) {
            if (word.enabled) {
                wordCount++;
                score += getScore(word.text);
            }
        }

        return (
            <Statistic.Group widths="four">
                <Statistic label={"Word"+(wordCount!==1?"s":"")} value={wordCount} />
                <Statistic label={"Point"+(score!==1?"s":"")} value={score} />
            </Statistic.Group>
        )
    }
}

export default Scoreboard;