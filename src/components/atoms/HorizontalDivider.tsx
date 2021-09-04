

const HorizontalDivider = (props: { title: string | null }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', columnGap: '20px', padding: '10px 0' }}>
            {props.title && <span>{props.title}</span>}
            <div style={{ background: '#e6ecf3', height: '1px', flex: '1' }} />
        </div>
    )
}

export default HorizontalDivider;
