
function Button(props: any) {

    const { title, style, onclick } = props;

    return <div style={style} onClick={onclick}>{title}</div>
}

export default Button
