/* eslint-disable prefer-template */
import { processHTML } from 'draft-js/lib/DraftPasteProcessor';
import { Entity } from 'draft-js';
import processInlineStylesAndEntities from './processInlineStylesAndEntities';
import { nestedTagMap, blockTagMap, entityTagMap, inlineTagMap } from './constants';

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


export function draftRawToHtml(raw) {
    let html = '';
    const nestLevel = [];
    const lastIndex = raw.blocks.length - 1;
    raw.blocks.forEach((block, index) => {
        // close tag if not consecutive same nested
        if (nestLevel.length > 0 && nestLevel[0] !== block.type) {
            const type = nestLevel.shift();
            html += nestedTagMap[type][1] + '\n';
        }
        // open tag if nested
        if (nestedTagMap[block.type] && nestLevel[0] !== block.type) {
            html += nestedTagMap[block.type][0] + '\n';
            nestLevel.unshift(block.type);
        }
        const blockTag = blockTagMap[block.type];
        html += blockTag ?
        blockTag[0] +
        processInlineStylesAndEntities(inlineTagMap, entityTagMap, raw.entityMap, block) +
        blockTag[1] :
        blockTagMap.default[0] +
        processInlineStylesAndEntities(inlineTagMap, block) +
        blockTagMap.default[1];
        // close any unclosed blocks if we've processed all the blocks
        if (index === lastIndex && nestLevel.length > 0) {
            while (nestLevel.length > 0) {
                html += nestedTagMap[nestLevel.shift()][1];
            }
        }
    });
    return html;
}
