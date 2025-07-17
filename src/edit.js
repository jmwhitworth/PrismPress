import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { useEffect, useState } from 'react';
import {
	PanelBody,
	SelectControl,
	ToggleControl,
} from '@wordpress/components';
import './style.scss';
import './view.js';

import CodeMirror from '@uiw/react-codemirror';

/** Dynamic import map */
const languageLoaders = {
	python: () => import('@codemirror/lang-python').then((m) => m.python()),
	php: () => import('@codemirror/lang-php').then((m) => m.php()),
	javascript: () => import('@codemirror/lang-javascript').then((m) => m.javascript()),
	json: () => import('@codemirror/lang-json').then((m) => m.json()),
	html: () => import('@codemirror/lang-html').then((m) => m.html()),
	svg: () => import('@codemirror/lang-html').then((m) => m.html()), // fallback
	xml: () => import('@codemirror/lang-html').then((m) => m.html()),
	yaml: () => import('@codemirror/lang-yaml').then((m) => m.yaml()),
	bash: () => () => Promise.resolve([]),
	docker: () => () => Promise.resolve([]),
	plaintext: () => Promise.resolve([]),
};

export default function Edit({ attributes, setAttributes }) {
	const [extensions, setExtensions] = useState([]);

	const languageClass = `language-${attributes.language}`;
	const lineNumbersClass = attributes.lineNumbers ? 'line-numbers' : '';

	// Prism init
	const initializePrism = () => {
		window.Prism && window.Prism.highlightAll();
	};

	// Re-run Prism when content/language/line number changes
	useEffect(() => {
		initializePrism();
	}, [attributes.content, attributes.language, attributes.lineNumbers]);

	// Load CodeMirror extension dynamically
	useEffect(() => {
		const loadExtension = async () => {
			const loader = languageLoaders[attributes.language];
			if (!loader) {
				console.warn(
					`No CodeMirror extension found for language: "${attributes.language}". Falling back to plaintext.`
				);
				setExtensions([]);
				return;
			}
			try {
				const ext = await loader();
				setExtensions(ext ? [ext] : []);
			} catch (err) {
				console.error(`Failed to load extension for ${attributes.language}`, err);
				setExtensions([]);
			}
		};
		loadExtension();
	}, [attributes.language]);

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
							{ label: 'JSON', value: 'json' },
							{ label: 'BASH', value: 'bash' },
							{ label: 'HTML', value: 'html' },
							{ label: 'SVG', value: 'svg' },
							{ label: 'YAML', value: 'yaml' },
							{ label: 'XML', value: 'xml' },
							{ label: 'Dockerfile', value: 'docker' },
							{ label: 'Plain Text', value: 'plaintext' },
						]}
						onChange={(language) => setAttributes({ language })}
					/>
					<ToggleControl
						label="Show line numbers"
						checked={attributes.lineNumbers}
						onChange={(lineNumbers) =>
							setAttributes({ lineNumbers })
						}
					/>
					<CodeMirror
						value={attributes.content}
						height="240px"
						extensions={extensions}
						onChange={(value) =>
							setAttributes({ content: value })
						}
						theme="dark"
					/>
				</PanelBody>
			</InspectorControls>

			<div {...useBlockProps()}>
				<pre className={lineNumbersClass}>
					<code className={languageClass}>
						{attributes.content}
					</code>
				</pre>
			</div>
		</>
	);
}
