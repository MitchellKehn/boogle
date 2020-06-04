import React from 'react';
import './App.css';
import LetterGrid from "./components/LetterGrid";
import { Container, Grid, Segment, Header, Button, Icon } from "semantic-ui-react";
import SearchBar from "./components/SearchBar";
import WordList from "./components/WordList";
import {solve} from "./logic/solver";

const letters = [
    ["A", "B", "C", "D"],
    ["E", "F", "G", "H"],
    ["I", "J", "K", "L"],
    ["M", "N", "O", "P"],
]

const wordList = [
    "danger",
    "duck",
    "matte",
    "colon",
]

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            word: "",

            grid: letters,
            solvePath: null,

            wordList: wordList
        }

        this.handleWordUpdate = this.handleWordUpdate.bind(this);
    }

    handleWordUpdate(word) {
        console.log("handling new word! " + word);
        let solvePath = solve(word, this.state.grid);
        this.setState({
            word: word,
            solvePath: solvePath,
        });
    }

    render() {
        return (
            <div className="App">
                <Container>
                    <Segment>
                        <Header as="h1">Boogle!</Header>
                        <Grid columns={2} stackable>
                            <Grid.Row>
                                <Grid.Column>
                                    <SearchBar onUpdate={(word) => this.handleWordUpdate(word)}/>
                                </Grid.Column>
                                <Grid.Column/>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <LetterGrid letters={this.state.grid} solvePath={this.state.solvePath}/>
                                    <Button.Group floated="right">
                                        <Button primary><Icon name="refresh"/></Button>
                                        <Button secondary><Icon name="calculator"/></Button>
                                    </Button.Group>
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <WordList words={this.state.wordList} />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                </Container>
            </div>
        );
    }
}

export default App;
