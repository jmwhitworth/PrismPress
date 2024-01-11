export default function save({ attributes }) {
	const languageClass = `language-${attributes.language}`;
	const lineNumbersClass = attributes.lineNumbers ? 'line-numbers' : '';

	return (
		<pre className={ lineNumbersClass }>
			<code className={ languageClass }>
				{ attributes.content }
			</code>
		</pre>
	);
}
