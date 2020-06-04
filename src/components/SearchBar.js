import React from "react";
import { Input } from "semantic-ui-react";

/**
 * Lets the user type in words to visualise on the board.
 *
 * If the word is somehow invalid, can show an error.
 * Hitting enter on a valid word should add the word to a word list.
 */
class SearchBar extends React.Component {
    render() {
        return (
            <Input fluid
                   error={!this.props.isValid}
                   placeholder='Search...'
                   onChange={(event) => this.props.onUpdate(event.target.value)}
                   value={this.props.word}/>
        );
    }
}

export default SearchBar;