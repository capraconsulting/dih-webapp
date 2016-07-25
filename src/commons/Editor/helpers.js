import { processHTML } from 'draft-js/lib/DraftPasteProcessor';
import { Entity } from 'draft-js';

export function findEntities(entityType, contentBlock, callback) {
    contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null &&
                Entity.get(entityKey).getType() === entityType
            );
        },
        callback
    );
}

export function htmlToContent(html) {
    return processHTML(html);
}

export function getBlockStyle(block) {
    switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
    }
}
