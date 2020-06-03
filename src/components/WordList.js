import React from "react";

class WordList extends React.Component {
    render() {
        return (
            <table className="ui selectable celled table" style={{"overflow-y": "scroll", maxHeight: 2}}>
                <tbody>
                    {this.props.words.map(word =>
                        <tr><td>{word}</td></tr>
                    )}
                </tbody>
            </table>
        )
    }
}

export default WordList;