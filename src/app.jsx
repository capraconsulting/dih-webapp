import React from 'react';
import ReactDOM from 'react-dom';
import { Button, ComboBox, Option, DatePicker, TextInput } from 'belle';

import './styles/main.scss';

class ExampleTextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exampleText: 'Hei'
        };

        this.handleTextChange = this.handleTextChange.bind(this);
        this.inputValueLink = this.inputValueLink.bind(this);
    }

    inputValueLink() {
        return {
            value: this.state.exampleText,
            requestChange: this.handleTextChange
        };
    }

    handleTextChange(newValue) {
        this.setState({ exampleText: newValue });
    }

    render() {
        return (
            <div>
                <TextInput
                    valueLink={this.inputValueLink()}
                    placeholder="Just fill in whatever you like :)"
                />

                <p><strong>Two-way data binding:</strong> {this.state.exampleText}</p>
            </div>
        );
    }
}

function FoundationTest() {
    return (
        <div className="callout success">
            <h5>This is a success callout</h5>
            <p>It has an easy to override visual style, and is appropriately subdued.</p>
            <a href="#">It's dangerous to go alone, take this.</a>
        </div>
    );
}

function HelloWorld() {
    return (
        <div>
            <Button>Hei</Button>
            <ComboBox placeholder="Choose a State">
                <Option value="Alabama">Alabama</Option>
                <Option value="Alaska">Alaska</Option>
                <Option value="Arizona">Arizona</Option>
                <Option value="Arkansas">Arkansas</Option>
            </ComboBox>
            <DatePicker />
            <ExampleTextInput />
            <FoundationTest />
        </div>
    );
}

ReactDOM.render(
  React.createElement(HelloWorld, null),
  document.getElementById('app')
);
