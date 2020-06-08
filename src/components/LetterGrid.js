import React from "react";
import { Grid, Button } from "semantic-ui-react";
import {containsSubarray} from "../logic/arrayUtils";

import { isBrowser, isMobile } from "react-device-detect";

/**
 * Displays the boggle board.
 *
 * Can accept a list of input coordinates to show
 * the tiles that correspond to the current valid word input.
 *
 * Clicking on tiles adds those letters to the text field, lets the user
 * trace out their word.
 */
class LetterGrid extends React.Component {
    render() {
        let rowCount = this.props.letters.length;
        let columnCount = this.props.letters[0].length;

        let rows = [];

        for (let i=0; i<rowCount; i++) {
            let columns = [];
            for (let j=0; j<columnCount; j++) {
                let isActive = containsSubarray(this.props.solvePath, [i, j]);
                let color = isActive ? "blue" : null;

                let letter = this.props.letters[i][j]
                columns.push(
                    <Grid.Column>
                        <Button fluid
                                size={isMobile ? "medium" : "massive"}
                                color={color}
                                content={letter}
                                onClick={() => this.props.addLetter(letter)}
                        />
                    </Grid.Column>
                );
            }
            rows.push(
                <Grid.Row columns={columnCount}>
                    {columns}
                </Grid.Row>
            );
        }

        return (
            <Grid celled="internally" rows={rowCount}>
                {rows}
            </Grid>
        );
    }
}

export default LetterGrid;