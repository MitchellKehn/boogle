import React from "react";

import { Header, Placeholder, Divider } from "semantic-ui-react";
import {getWordInfo} from "../language/dictionary";

const compactStyle = {
    marginTop: 0,
    marginBottom: 0,
}

class WordDefinition extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            info: null
        }

        this.getPlaceholder = this.getPlaceholder.bind(this);
        this.getNoWordsFound = this.getNoWordsFound.bind(this);
    }
    async componentDidMount() {
        const info = await getWordInfo(this.props.word);
        this.setState({info: info});
    }

    getPlaceholder() {
        return (
            <>
                <Header as="h1">{this.props.word}</Header>
                <Placeholder style={{ minWidth: '200px' }}>
                    <Placeholder.Header>
                        <Placeholder.Line />
                    </Placeholder.Header>
                    <Placeholder.Paragraph>
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                    </Placeholder.Paragraph>
                </Placeholder>
            </>
        );
    }

    getNoWordsFound() {
        return (
            <>
                <Header as="h1">{this.props.word}</Header>
                <Header as='h4' color='red'>Word not found.</Header>
            </>
        );
    }

    render() {
        if (this.state.info === null) {
            return (this.getPlaceholder());
        }
        if (!this.state.info["found"]) {
            return (this.getNoWordsFound());
        }
        const meanings = [
            <Header size="huge" as="h1" style={compactStyle}>
                {this.props.word}
            </Header>,
        ]

        // add pronunciation
        try {
            meanings.push(<p>{this.state.info["pronunciation"]["all"]}</p>)
        } catch (e) {
            try {
                meanings.push(<p>{this.state.info["pronunciation"]}</p>)
            } catch (e) {}
        }

        // add definitions
        try {
            for (const response of this.state.info["results"]) {
                meanings.push(
                    <div>
                        <Divider />
                        <Header as="h3" style={compactStyle}>{response["partOfSpeech"]}</Header>
                        {response["synonyms"] !== undefined ?
                            <p style={compactStyle}><i>Synonyms: {response["synonyms"].join(", ")}</i></p>
                            : ""}
                        <p style={compactStyle}>{response["definition"]}</p>
                    </div>
                )
            }
        } catch (e) {}

        return meanings
    }
}

export default WordDefinition;