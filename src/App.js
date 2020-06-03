import React from 'react';
import './App.css';
import LetterGrid from "./components/LetterGrid";
import { Container } from "semantic-ui-react";
import SearchBar from "./components/SearchBar";

const letters = [
    ["A", "B", "C", "D"],
    ["E", "F", "G", "H"],
    ["I", "J", "K", "L"],
    ["M", "N", "O", "P"],
]

function App() {
  return (
    <div className="App">
        <Container>
            <Container>
                <SearchBar />
            </Container>
            <Container>
                <LetterGrid letters={letters} />
            </Container>
        </Container>
    </div>
  );
}

export default App;
