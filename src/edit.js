import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { useEffect } from 'react';
import { PanelBody, SelectControl, TextareaControl } from '@wordpress/components';

import './style.scss';
import './view.js';

export default function Edit({ attributes, setAttributes }) {
	const languageClass = 'language-' + attributes.language;

	// Function to initialize Prism.js
	const initializePrism = () => {
		window.Prism && window.Prism.highlightAll();
	};

	// Initialize Prism.js when the component mounts or updates, including content as a dependency
	useEffect(() => {
		initializePrism();
	}, [attributes.content]);

	return (
		<>
			<InspectorControls>
				<PanelBody title="Block Settings">
					<SelectControl
						label="Language"
						value={attributes.language}
						options={[
							{ label: 'Python', value: 'python' },
							{ label: 'PHP', value: 'php' },
							{ label: 'JavaScript', value: 'javascript' },
							{ label: 'BASH', value: 'bash' },
							{ label: 'HTML', value: 'html' },
							{ label: 'SVG', value: 'svg' },
							{ label: 'XML', value: 'xml' },
							{ label: 'Plain Text', value: 'plaintext' },
						]}
						onChange={(language) => setAttributes({ language })}
					/>
					<TextareaControl
						label="Text"
						value={attributes.content}
						onChange={(content) => setAttributes({ content })}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...useBlockProps()}>
				<pre className={'line-numbers ' + languageClass}>
					<code className={languageClass} >
						{attributes.content}
					</code>
				</pre>
			</div>
		</>
	);
}
