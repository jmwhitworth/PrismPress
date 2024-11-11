import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { useEffect } from 'react';
import {
	PanelBody,
	SelectControl,
	TextareaControl,
	ToggleControl,
} from '@wordpress/components';
import './style.scss';
import './view.js';

export default function Edit( { attributes, setAttributes } ) {
	const languageClass = `language-${ attributes.language }`;
	const lineNumbersClass = attributes.lineNumbers ? 'line-numbers' : '';

	// Function to initialize Prism.js
	const initializePrism = () => {
		window.Prism && window.Prism.highlightAll();
	};

	useEffect( () => {
		initializePrism();
	}, [ attributes.content, attributes.language, attributes.lineNumbers ] );

	return (
		<>
			<InspectorControls>
				<PanelBody title="Block Settings">
					<SelectControl
						label="Language"
						value={ attributes.language }
						options={ [
							{ label: 'Python', value: 'python' },
							{ label: 'PHP', value: 'php' },
							{ label: 'JavaScript', value: 'javascript' },
							{ label: 'JSON', value: 'json' },
							{ label: 'BASH', value: 'bash' },
							{ label: 'HTML', value: 'html' },
							{ label: 'SVG', value: 'svg' },
							{ label: 'YAML', value: 'yaml' },
							{ label: 'XML', value: 'xml' },
							{ label: 'Dockerfile', value: 'docker' },
							{ label: 'Plain Text', value: 'plaintext' },
						] }
						onChange={ ( language ) =>
							setAttributes( { language } )
						}
					/>
					<ToggleControl
						label="Show line numbers"
						checked={ attributes.lineNumbers }
						onChange={ ( lineNumbers ) =>
							setAttributes( { lineNumbers } )
						}
					/>
					<TextareaControl
						label="Text"
						value={ attributes.content }
						onChange={ ( content ) => setAttributes( { content } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...useBlockProps() }>
				<pre className={ lineNumbersClass }>
					<code className={ languageClass }>
						{ attributes.content }
					</code>
				</pre>
			</div>
		</>
	);
}
