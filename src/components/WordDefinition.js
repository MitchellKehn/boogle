import React from "react";

import { Container, Header} from "semantic-ui-react";

class WordDefinition extends React.Component {
    render() {
        return (
            <>
                <Header as="h3">{this.props.word}</Header>
                <Header as="h4"><em>adj. /sɪˈmantɪk/</em></Header>
                <p>relating to meaning in language or logic.</p>
            </>
        )
    }
}

export default WordDefinition;