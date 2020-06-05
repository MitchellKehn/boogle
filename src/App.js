import React from 'react';
import './App.css';
import LetterGrid from "./components/LetterGrid";
import {Button, Container, Form, Grid, Header, Icon, Segment} from "semantic-ui-react";
import SearchBar from "./components/SearchBar";
import WordList from "./components/WordList";
import {solve} from "./logic/solver";
import {generateGameBoard} from "./logic/generator";

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

        this.handleWordUpdate = this.handleWordUpdate.bind(this);
        this.handleSearchFormSubmit = this.handleSearchFormSubmit.bind(this);

        this.handleWordPreview = this.handleWordPreview.bind(this);
        this.handleWordPreviewClose = this.handleWordPreviewClose.bind(this);

        this.searchFieldRef = React.createRef();
    }

    resetGame() {
        this.setState({
            word: "",

            grid: generateGameBoard(4, 4),
            solvePath: null,

            wordList: ["test"]
        });
    }

    componentDidMount() {
        this.resetGame();
        this.searchFieldRef.current.focus();
    }

    handleWordUpdate(word) {
        let solvePath = solve(word, this.state.grid);
        this.setState({
            word: word,
            solvePath: solvePath,
        });

        this.searchFieldRef.current.focus();
    }

    handleSearchFormSubmit() {
        if (!this.isValid()) {
            return;
        }
        this.setState({
            wordList: [...this.state.wordList, this.state.word],
            solvePath: null,
            word: "",
        })
        this.searchFieldRef.current.focus();
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

    render() {
        return (
            <div className="App">
                <Container>
                    <Segment>
                        <Header as="h1">Boogle!</Header>
                        <Grid columns={2} stackable>
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
                                <Grid.Column/>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <LetterGrid letters={this.state.grid}
                                                solvePath={this.state.solvePath}
                                                addLetter={this.addLetter}
                                    />
                                    <Button.Group floated="right">
                                        <Button icon color="green" onClick={this.handleSearchFormSubmit}><Icon name="sign-in"/></Button>
                                        <Button icon primary onClick={this.resetGame}><Icon name="refresh"/></Button>
                                        <Button icon secondary><Icon name="calculator"/></Button>
                                    </Button.Group>
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <WordList words={this.state.wordList}
                                              onPreview={this.handleWordPreview}
                                              onPreviewClose={this.handleWordPreviewClose}
                                    />
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
