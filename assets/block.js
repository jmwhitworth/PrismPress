var el = wp.element.createElement;
var registerBlockType = wp.blocks.registerBlockType;
var PlainText = wp.blockEditor.PlainText;
var SelectControl = wp.components.SelectControl;
var CheckboxControl = wp.components.CheckboxControl;

registerBlockType( 'prism/code', {
    title: 'Prism Code',
    icon: 'editor-code',
    category: 'formatting',
    attributes: {
        content: {
            type: 'string',
            source: 'text',
            selector: 'code',
        },
        language: {
            type: 'string',
            default: 'python',
        },
        lineNumbers: {
            type: 'boolean',
            default: true,
        },
    },
    edit: function( props ) {
        var content = props.attributes.content;
        var language = props.attributes.language;
        var lineNumbers = props.attributes.lineNumbers;
        
        var languageOptions = [
            { label: 'Python', value: 'python' },
            { label: 'PHP', value: 'php' },
            { label: 'JavaScript', value: 'javascript' },
            { label: 'BASH', value: 'bash' },
            { label: 'HTML', value: 'html' },
            { label: 'SVG', value: 'svg' },
            { label: 'XML', value: 'xml' },
            { label: 'Plain Text', value: 'plaintext' },
        ];

        return el('div', { className: 'wp-block-prism-code-editor' },
            el(SelectControl, {
                label: 'Language',
                value: language,
                options: languageOptions,
                onChange: function( selectedLanguage ) {
                    props.setAttributes( { language: selectedLanguage } );
                }
            }),
            el(CheckboxControl, {
                label: 'Line Numbers',
                checked: lineNumbers,
                onChange: function( isChecked ) {
                    props.setAttributes( { lineNumbers: isChecked } );
                }
            }),
            el(PlainText, {
                value: content,
                onChange: function( content ) {
                    props.setAttributes( { content: content } );
                },
                placeholder: 'Enter code here...',
                className: 'textEntry'
            })
        );
    },
    save: function( props ) {
        const content = props.attributes.content;
        const language = props.attributes.language;
        const lineNumbers = props.attributes.lineNumbers;
        const languageClass = 'language-' + language;

        return el('pre', { className: lineNumbers ? 'line-numbers' : '' }, 
            el('code', { className: languageClass }, 
                content
            )
        );
    },
} );
