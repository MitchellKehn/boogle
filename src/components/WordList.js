import React from "react";
import { List, Popup } from "semantic-ui-react";
import WordDefinition from "./WordDefinition";
import { debounce } from "lodash";

class WordList extends React.Component {
    render() {
        const onItemClick = (text) => console.log(text);

        return (
            <List animated
                  celled
                  selection
                  relaxed
                  size="huge"
                  verticalAlign='middle'
                  style={{height: "auto", maxHeight: "250px", overflowY: "scroll"}}
            >
                {this.props.words.map(word =>
                    <Popup wide
                           on="click"
                           position="bottom"
                           hideArrow
                           onOpen={() => this.props.onPreview(word)}
                           onClose={this.props.onPreviewClose}
                           trigger={
                                <List.Item>
                                    <List.Content floated='left'>
                                        <List.Header>{word}</List.Header>
                                    </List.Content>
                                </List.Item>
                           }
                           style={{
                               maxHeight: 350,
                               overflowY: "scroll",
                           }}
                    >
                    <Popup.Content>
                        <WordDefinition word={word}/>
                    </Popup.Content>
                    </Popup>
                )}
            </List>
        )
    }
}

export default WordList;