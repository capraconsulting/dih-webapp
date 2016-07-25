/* eslint-disable no-underscore-dangle */
import React, { Component, PropTypes } from 'react';
import { EditorState, RichUtils, Editor, ContentState, CompositeDecorator } from 'draft-js';
import BlockStyleControls from './BlockStyleControls';
import InlineStyleControls from './InlineStyleControls';
import { getBlockStyle, htmlToContent, findEntities } from './helpers';
import { styleMap } from './constants';
import Link from './Link';
import './editor.scss';

const decorator = new CompositeDecorator([{
    strategy: findEntities.bind(null, 'link'),
    component: Link
}]);

class DraftEditor extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            editorState: props.html ? EditorState.createWithContent(
                    ContentState.createFromBlockArray(htmlToContent(props.html)),
                    decorator
                ) : EditorState.createEmpty(decorator)
        };
        this.focus = () => this.refs.editor.focus();
        this.onChange = (editorState) => this.setState({ editorState });

        this.handleKeyCommand = (command) => this._handleKeyCommand(command);
        this.toggleBlockType = (type) => this._toggleBlockType(type);
        this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    }

    _handleKeyCommand(command) {
        const { editorState } = this.state;
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    }

    _toggleBlockType(blockType) {
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        );
    }

    _toggleInlineStyle(inlineStyle) {
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );
    }

    render() {
        const { editorState } = this.state;
        let className = 'RichEditor-editor';
        const contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className += ' RichEditor-hidePlaceholder';
            }
        }

        return (
            <div className="RichEditor-root">
                <BlockStyleControls
                    editorState={editorState}
                    onToggle={this.toggleBlockType}
                />
                <InlineStyleControls
                    editorState={editorState}
                    onToggle={this.toggleInlineStyle}
                />
                <div className={className} onClick={this.focus}>
                    <Editor
                        editorState={editorState}
                        handleKeyCommand={this.handleKeyCommand}
                        blockStyleFn={getBlockStyle}
                        customStyleMap={styleMap}
                        onChange={this.onChange}
                        ref="editor"
                        spellCheck
                    />
                </div>
            </div>
        );
    }
}

DraftEditor.propTypes = {
    html: PropTypes.string
};

export default DraftEditor;
