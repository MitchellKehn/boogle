import React from "react";
import { List } from "semantic-ui-react";

class WordList extends React.Component {
    render() {
        return (
            <List celled selection verticalAlign='middle' style={{height: "auto", maxHeight: "250px", overflowY: "scroll"}}>
                {this.props.words.map(word =>
                    <List.Item>
                        <List.Content floated='left'>{word}</List.Content>
                    </List.Item>
                )}
            </List>
        )
    }
}

export default WordList;