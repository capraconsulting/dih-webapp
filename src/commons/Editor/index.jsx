import React, { Component, PropTypes } from 'react';
import ReactQuill from 'react-quill';
import '../../../node_modules/react-quill/dist/quill.snow.css';

class DraftEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: props.html
        };
    }

    onTextChange(content) {
        this.setState({ content });
        this.props.onChange(content);
    }

    render() {
        return (
            <div className="RichEditor-root">
                <ReactQuill
                    theme="snow"
                    value={this.state.content}
                    onChange={(value) => this.onTextChange(value)}
                />
            </div>
        );
    }
}

DraftEditor.propTypes = {
    html: PropTypes.string,
    onChange: PropTypes.func
};

export default DraftEditor;
