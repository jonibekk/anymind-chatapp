import Avatar from '../atoms/Avatar'


const getDateTimeString = (datetime: string) => {
    const date = new Date(datetime);

    const hour = date.getHours() < 10 ? '0'.concat(date.getHours().toString()) : date.getHours().toString();
    const mins = date.getMinutes() < 10 ? '0'.concat(date.getMinutes().toString()) : date.getMinutes().toString();

    return hour + ':' + mins;
}

const MessagItemStyle = {
    display: 'flex',
    columnGap: '18px',
    margin: '35px 0',
}
const MessageItemSection2 = {
    backgroundColor: '#f4f5fb',
    borderRadius: '4px',
    display: 'flex',
    columnGap: '15px',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '75%'
}
const MessageDateTimeStyle = {
    display: 'grid',
    gridColumnCount: '1',
    width: '60px',
}
const TextStyle = {
    margin: '0',
    lineHeight: '1.5em', padding: '10px 15px',
}
const DateTimeStyle = { top: '5px' }
const SendStyle = { bottom: '5px' }


function MessageItem(props: any) {

    const { userId, text, datetime, send, isMine } = props.message;

    const WrapperStyle = isMine
        ? { ...MessagItemStyle, justifyContent: 'flex-start' }
        : MessagItemStyle;

    const timePosition = isMine ? { ...DateTimeStyle, left: '5px' } : { ...DateTimeStyle, right: '5px' }
    const sendPosition = isMine ? { ...SendStyle, left: '5px' } : { ...SendStyle, right: '5px' }
    return (
        <div style={{ ...WrapperStyle, flexDirection: isMine ? 'row-reverse' : 'row' }}>

            <section style={{ textAlign: 'center' }}>
                <Avatar width='48px' height='48px' src={`./${userId}.png`} alt={userId} />
                <small style={{ color: 'darkgray' }}>{userId}</small>
            </section>

            <section style={{ ...MessageItemSection2, flexDirection: isMine ? 'row-reverse' : 'row', position: 'relative' }}>
                <p style={TextStyle}>{text}</p>
                <div style={{ ...MessageDateTimeStyle, paddingLeft: '10px', paddingRight: '10px' }}>
                    <small style={{ position: 'absolute', color: '#999', ...timePosition }}>{getDateTimeString(datetime)}</small>
                    {
                        isMine &&
                        <small style={{ position: 'absolute', color: send ? 'green' : 'red', ...sendPosition }}>
                            {send && <i className="far fa-check-circle"></i>}
                            {!send && <i className="fas fa-exclamation-circle"></i>}
                        </small>
                    }
                </div>
            </section>

        </div>
    )
}

export default MessageItem;
