import React from "react";
import { List, Popup } from "semantic-ui-react";
import WordDefinition from "./WordDefinition";

class WordList extends React.Component {
    render() {
        const onItemClick = (text) => console.log(text);

        return (
            <List animated
                  celled
                  selection
                  relaxed
                  size="mega"
                  verticalAlign='middle'
                  style={{height: "auto", maxHeight: "250px", overflowY: "scroll"}}
            >
                {this.props.words.map(word =>
                    <Popup on="click"
                           position="bottom left"
                           onOpen={() => this.props.onPreview(word)}
                           onClose={this.props.onPreviewClose}
                           trigger={
                                <List.Item>
                                    <List.Content floated='left'>
                                        <List.Header>{word}</List.Header>
                                    </List.Content>
                                </List.Item>
                           }
                            >
                        <WordDefinition word={word}/>
                    </Popup>
                )}
            </List>
        )
    }
}

export default WordList;