import React from "react";
import { List, Popup, Button} from "semantic-ui-react";
import WordDefinition from "./WordDefinition";

class WordList extends React.Component {
    render() {
        const enableWord = (word) => {
            word.enabled = true;
            this.props.onEnabledToggle();
        }
        const disableWord = (word) => {
            word.enabled = false;
            this.props.onEnabledToggle();
        }

        return (
            <List animated
                  celled
                  selection
                  relaxed
                  size="huge"
                  verticalAlign='middle'
                  style={{height: "auto", overflowY: "scroll"}}
            >
                {this.props.words.map(word =>
                    <List.Item>
                        <Popup wide
                               on="click"
                               position="bottom right"
                               onOpen={() => this.props.onPreview(word.text)}
                               onClose={this.props.onPreviewClose}
                               trigger={
                                        <List.Content floated='left'>
                                            <List.Header>
                                                {word.enabled ? word.text
                                                              : <del>{word.text}</del>}
                                            </List.Header>
                                        </List.Content>
                               }
                               style={{
                                   maxHeight: 350,
                                   overflowY: "scroll",
                               }}
                        >
                        <Popup.Content>
                            <WordDefinition word={word.text}/>
                        </Popup.Content>
                        </Popup>
                        <List.Content floated='right'>
                            {word.enabled ? <Button size="mini"
                                                    // color="red"
                                                    onClick={()=>disableWord(word)}
                                            >
                                                strike out
                                            </Button>
                                          : <Button size="mini"
                                                    color="teal"
                                                    onClick={()=>enableWord(word)}
                                            >
                                                unstrike
                                            </Button>}
                        </List.Content>
                    </List.Item>
                )}
            </List>
        )
    }
}

export default WordList;