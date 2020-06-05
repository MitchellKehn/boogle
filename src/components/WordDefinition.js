import React from "react";

import { Header, Placeholder, Divider } from "semantic-ui-react";
import {getWordInfo} from "../language/dictionary";

class WordDefinition extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            info: null
        }
    }
    async componentDidMount() {
        const info = await getWordInfo(this.props.word);
        console.log(info);
        this.setState({info: info});
    }

    render() {
        if (this.state.info === null) {
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
        const meanings = [<Header as="h1">{this.props.word}</Header>]

        for (const response of this.state.info["results"]) {
            meanings.push(
                <>
                    <Divider horizontal />
                    <Header as="h3"><em>{response["partOfSpeech"]}</em></Header>
                    <p>{response["synonyms"].join(", ")}</p>
                    <p>{response["definition"]}</p>
                    <Placeholder.Paragraph />
                </>
            )
        }

        return meanings
    }
}

export default WordDefinition;