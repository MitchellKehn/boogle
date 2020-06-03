import React from 'react';
import './App.css';
import LetterGrid from "./components/LetterGrid";
import { Container, Grid, Segment, Header } from "semantic-ui-react";
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
            <Segment>
                <Header as="h1">Boogle!</Header>
                <Grid columns={2} stackable>
                    <Grid.Row>
                        <Grid.Column>
                            <SearchBar />
                        </Grid.Column>
                        <Grid.Column/>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <LetterGrid letters={letters} />
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <WordList words={wordList} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </Container>
    </div>
  );
}

export default App;
