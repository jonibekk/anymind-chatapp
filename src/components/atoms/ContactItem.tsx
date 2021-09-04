import { useState } from "react";

function ContactItem(props: any) {

    const [hover, setHover] = useState(false);
    const { item } = props;

    const ItemWrapperStyle = hover || props.active ? { ...ContactItemStyle, backgroundColor: '#eaedf8' } : ContactItemStyle;
    return (
        <div style={ItemWrapperStyle}
            onClick={() => props.onselect(item.id)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}>
            <span style={{ fontWeight: 'bold' }}>{item.name}</span>
        </div>
    )
}

const ContactItemStyle = {
    padding: '0 15px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #e6ecf3',
}

export default ContactItem;
