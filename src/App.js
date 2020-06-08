import React from 'react';
import './App.css';
import LetterGrid from "./components/LetterGrid";
import {Button, Container, Form, Grid, Header, Icon, Segment} from "semantic-ui-react";
import SearchBar from "./components/SearchBar";
import WordList from "./components/WordList";
import {solve} from "./logic/solver";
import {generateGameBoard} from "./logic/generator";
import Scoreboard from "./components/Scoreboard";
import {Word} from "./logic/game";
import CountdownTimer from "./components/CountdownTimer";

import { isBrowser, isMobile } from "react-device-detect";

const letters = [
    ["A", "B", "C", "D"],
    ["E", "F", "G", "H"],
    ["I", "J", "K", "L"],
    ["M", "N", "O", "Qu"],
]


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            word: "",

            grid: letters,
            solvePath: null,

            wordList: [],

            inputIsDisabled: false,
        }

        this.isValid = this.isValid.bind(this);
        this.resetGame = this.resetGame.bind(this);
        this.addLetter = this.addLetter.bind(this);

        this.focusSearchField = this.focusSearchField.bind(this);

        this.handleWordUpdate = this.handleWordUpdate.bind(this);
        this.handleSearchFormSubmit = this.handleSearchFormSubmit.bind(this);

        this.handleWordPreview = this.handleWordPreview.bind(this);
        this.handleWordPreviewClose = this.handleWordPreviewClose.bind(this);

        this.onWordEnabledChange = this.onWordEnabledChange.bind(this);
        this.searchFieldRef = React.createRef();
    }

    resetGame() {
        this.setState({
            word: "",

            grid: generateGameBoard(4, 4),
            solvePath: null,

            wordList: []
        });
    }

    componentDidMount() {
        this.resetGame();
        this.focusSearchField(true);
    }

    handleWordUpdate(word) {

        let solvePath = solve(word, this.state.grid);
        this.setState({
            word: word,
            solvePath: solvePath,
        });

        this.focusSearchField();
    }

    handleSearchFormSubmit() {
        if (!this.state.word) { return; }
        if (!this.isValid()) { return; }
        this.setState({
            wordList: [...this.state.wordList, new Word(this.state.word)],
            solvePath: null,
            word: "",
        })
        this.focusSearchField();
    }

    /**
     * Preview the path of the highlighted word in the word list in the game board
     */
    handleWordPreview(word) {
        this.lastInput = this.state.word;
        this.handleWordUpdate(word);
        this.setState({inputIsDisabled: true})
    }

    handleWordPreviewClose() {
        this.handleWordUpdate(this.lastInput);
    }

    isValid() {
        return this.state.solvePath !== null || this.state.word.length === 0;
    }

    addLetter(letter) {
        this.handleWordUpdate(this.state.word + letter.toLowerCase());
    }

    /**
     * I'm pretty sure this is not good practice, but can't think of a better way.
     */
    onWordEnabledChange() {
        this.setState({
            wordList: this.state.wordList,
        })
    }

    render() {
        return (
            <div className="App">
                <Container>
                    <Segment>
                        <Grid divided stackable>
                            <Grid.Row>
                                <Grid.Column>
                                    <Header as="h1" size="huge">Boogle!</Header>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={10}>
                                    <Grid>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <Form onSubmit={this.handleSearchFormSubmit}>
                                                    <SearchBar word={this.state.word}
                                                               isValid={this.isValid()}
                                                               onUpdate={(word) => this.handleWordUpdate(word)}
                                                               ref={this.searchFieldRef}
                                                    />
                                                </Form>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <LetterGrid letters={this.state.grid}
                                                            solvePath={this.state.solvePath}
                                                            addLetter={this.addLetter}
                                                />
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <Button.Group floated="right">
                                                    <Button icon size="large" color="green" onClick={this.handleSearchFormSubmit}><Icon name="sign-in"/></Button>
                                                    <Button icon size="large" primary onClick={this.resetGame}><Icon name="refresh"/></Button>
                                                    <Button icon disabled size="large" secondary><Icon name="calculator"/></Button>
                                                </Button.Group>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Grid.Column>
                                <Grid.Column width={6}>
                                    <Grid verticalAlign='middle'>
                                        <Grid.Row columns={2}>
                                            <Grid.Column>
                                                <Scoreboard wordList={this.state.wordList}/>
                                            </Grid.Column>
                                            <Grid.Column>
                                                <CountdownTimer />
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <WordList words={this.state.wordList}
                                                          onPreview={this.handleWordPreview}
                                                          onPreviewClose={this.handleWordPreviewClose}
                                                          onEnabledToggle={this.onWordEnabledChange}
                                                />
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                </Container>
            </div>
        );
    }

    focusSearchField(force=false) {
        if (isBrowser || force) {
            this.searchFieldRef.current.focus();
        }
    }
}

export default App;
