import React, { PropTypes } from 'react';
import StyleButton from './StyleButton';
import { BLOCK_TYPES } from './constants';

const BlockStyleControls = (props) => {
    const { editorState } = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    return (
        <div className="RichEditor-controls">
        {BLOCK_TYPES.map((type) =>
            <StyleButton
                key={type.label}
                active={type.style === blockType}
                label={type.label}
                onToggle={props.onToggle}
                style={type.style}
            />
        )}
        </div>
    );
};

BlockStyleControls.propTypes = {
    editorState: PropTypes.object,
    style: PropTypes.string,
    label: PropTypes.string,
    onToggle: PropTypes.func
};

export default BlockStyleControls;
