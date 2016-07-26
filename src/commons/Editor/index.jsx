/* eslint-disable no-underscore-dangle */
import React, { Component, PropTypes } from 'react';
import Draft from 'draft-js';
import BlockStyleControls from './BlockStyleControls';
import InlineStyleControls from './InlineStyleControls';
import { getBlockStyle, htmlToContent, findEntities, draftRawToHtml } from './helpers';
import { styleMap } from './constants';
import Link from './Link';
import './editor.scss';

const decorator = new Draft.CompositeDecorator([{
    strategy: findEntities.bind(null, 'link'),
    component: Link
}]);

class DraftEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: props.html ? Draft.EditorState.createWithContent(
                Draft.ContentState.createFromBlockArray(htmlToContent(props.html)), decorator
            ) : Draft.EditorState.createEmpty(decorator)
        };
        this.focus = () => this.refs.editor.focus();
        this.onChange = (editorState) => {
            this.setState({ editorState });
            this.emitHTML(editorState);
        };
        this.handleKeyCommand = (command) => this._handleKeyCommand(command);
        this.toggleBlockType = (type) => this._toggleBlockType(type);
        this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    }

    emitHTML(editorState) {
        const raw = Draft.convertToRaw(editorState.getCurrentContent());
        const html = draftRawToHtml(raw);
        this.props.onChange(html);
    }

    _handleKeyCommand(command) {
        const { editorState } = this.state;
        const newState = Draft.RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    }

    _toggleBlockType(blockType) {
        this.onChange(
            Draft.RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        );
    }

    _toggleInlineStyle(inlineStyle) {
        this.onChange(
            Draft.RichUtils.toggleInlineStyle(
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
                    <Draft.Editor
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
    html: PropTypes.string,
    onChange: PropTypes.func
};

export default DraftEditor;
