import React from 'react';
import './App.css';
import LetterGrid from "./components/LetterGrid";
import { Container, Grid } from "semantic-ui-react";
import SearchBar from "./components/SearchBar";
import WordList from "./components/WordList";

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
    "danger",
    "duck",
    "matte",
    "colon",
    "danger",
    "duck",
    "matte",
    "colon",
]

function App() {
  return (
    <div className="App">
        <Container>
            <Grid centered celled>
                <Grid.Row columns={2}>
                    <Grid.Column width={4}>
                        <SearchBar />
                    </Grid.Column>
                    <Grid.Column/>
                </Grid.Row>
                <Grid.Row columns={2}>
                    <Grid.Column width={4}>
                        <LetterGrid letters={letters} />
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <WordList words={wordList} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    </div>
  );
}

export default App;
