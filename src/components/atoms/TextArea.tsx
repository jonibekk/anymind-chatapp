
function TextArea(props: any) {

    const { textRef, rows, style, value, onchange, placeholder } = props;

    return (
        <textarea
            ref={textRef}
            rows={rows}
            style={style}
            value={value}
            onChange={e => onchange(e.target.value)}
            placeholder={placeholder} />
    )
}

export default TextArea
