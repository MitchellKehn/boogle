import React from "react";
import { Grid, Button } from "semantic-ui-react";

class LetterGrid extends React.Component {
    render() {
        let rowCount = this.props.letters.length;
        let columnCount = this.props.letters[0].length;

        let rows = [];

        for (let i=0; i<rowCount; i++) {
            let columns = [];
            for (let j=0; j<columnCount; j++) {
                columns.push(
                    <Grid.Column>
                        <Button content={this.props.letters[i][j]}/>
                    </Grid.Column>
                );
            }
            rows.push(
                <Grid.Row>
                    {columns}
                </Grid.Row>
            );
        }

        console.log(this.props.letters);
        return (
            <Grid celled>
                {rows}
            </Grid>
        );
    }
}

export default LetterGrid;