import React from "react";
import { List, Popup } from "semantic-ui-react";
import WordDefinition from "./WordDefinition";

class WordList extends React.Component {
    render() {
        const onItemClick = (text) => console.log(text);

        return (
            <List animated celled selection relaxed verticalAlign='middle' style={{height: "auto", maxHeight: "250px", overflowY: "scroll"}}>
                {this.props.words.map(word =>
                    <Popup on="click"
                           trigger={
                                <List.Item onClick={() => onItemClick(word)}>
                                    <List.Content floated='left'>{word}</List.Content>
                                </List.Item>
                           }
                            >
                        <WordDefinition word="Semantic"/>
                    </Popup>
                )}
            </List>
        )
    }
}

export default WordList;