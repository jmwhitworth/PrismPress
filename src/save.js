export default function save({ attributes }) {
	const languageClass = 'language-' + attributes.language;

	return (
		<pre className={'line-numbers ' + languageClass} >
			<code className={languageClass}>
				{attributes.content}
			</code>
		</pre>
	);
}
