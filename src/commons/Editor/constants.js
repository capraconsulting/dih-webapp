export const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2
    }
};

export const BLOCK_TYPES = [
    { label: 'H1', style: 'header-one' },
    { label: 'H2', style: 'header-two' },
    { label: 'H3', style: 'header-three' },
    { label: 'H4', style: 'header-four' },
    { label: 'H5', style: 'header-five' },
    { label: 'H6', style: 'header-six' },
    { label: 'Blockquote', style: 'blockquote' },
    { label: 'UL', style: 'unordered-list-item' },
    { label: 'OL', style: 'ordered-list-item' },
    { label: 'Code Block', style: 'code-block' }
];

export const INLINE_STYLES = [
    { label: 'Bold', style: 'BOLD' },
    { label: 'Italic', style: 'ITALIC' },
    { label: 'Underline', style: 'UNDERLINE' },
    { label: 'Monospace', style: 'CODE' }
];


export const blockTagMap = {
    'header-one': ['<h1>', '</h1>\n'],
    'header-two': ['<h1>', '</h1>\n'],
    unstyled: ['<p>', '</p>\n'],
    'code-block': ['<pre><code>', '</code></pre>\n'],
    blockquote: ['<blockquote>', '</blockquote>\n'],
    'ordered-list-item': ['<li>', '</li>\n'],
    'unordered-list-item': ['<li>', '</li>\n'],
    default: ['<p>', '</p>\n']
};

export const inlineTagMap = {
    BOLD: ['<strong>', '</strong>'],
    ITALIC: ['<em>', '</em>'],
    UNDERLINE: ['<u>', '</u>'],
    CODE: ['<code>', '</code>'],
    STRIKETHROUGH: ['<del>', '</del>'],
    default: ['<span>', '</span>']
};

export const entityTagMap = {
    link: ['<a href="<%= href %>">', '</a>']
};

export const nestedTagMap = {
    'ordered-list-item': ['<ol>', '</ol>'],
    'unordered-list-item': ['<ul>', '</ul>']
};
