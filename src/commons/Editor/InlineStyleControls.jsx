import React, { PropTypes } from 'react';
import StyleButton from './StyleButton';
import { INLINE_STYLES } from './constants';

const InlineStyleControls = (props) => {
    const currentStyle = props.editorState.getCurrentInlineStyle();
    return (
        <div className="RichEditor-controls">
        {INLINE_STYLES.map(type =>
            <StyleButton
                key={type.label}
                active={currentStyle.has(type.style)}
                label={type.label}
                onToggle={props.onToggle}
                style={type.style}
            />
        )}
        </div>
    );
};

InlineStyleControls.propTypes = {
    editorState: PropTypes.object,
    style: PropTypes.string,
    label: PropTypes.string,
    onToggle: PropTypes.func
};

export default InlineStyleControls;
