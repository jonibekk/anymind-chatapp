
import ContactsList from '../organisms/ContactsList';
import MessageBody from '../organisms/MessageBody';
import useWindowDimentions from '../../hooks/useWindowDimentions';
import { MIN_TABLET_SIZE } from '../../enums/WindowSizing'


const MessageContainerStyle = { width: '100%', height: '100vh', display: 'flex', alignItem: 'center' }
const ContactsListStyle = { flex: '.35', borderRight: '1px solid #e6ecf3', background: 'white', }
const MessageBodyStyle = { flex: '.65', background: 'white', }


const Messages = () => {

    const { width } = useWindowDimentions();

    const SectionContactListStyle = width <= MIN_TABLET_SIZE ? { ...ContactsListStyle, flex: '1' } : ContactsListStyle;
    const SectionMessageBodyStyle = width <= MIN_TABLET_SIZE ? { ...MessageBodyStyle, display: 'none' } : MessageBodyStyle;
    return (
        <div style={MessageContainerStyle}>
            <section style={SectionContactListStyle}>
                <ContactsList />
            </section>
            <section style={SectionMessageBodyStyle}>
                <MessageBody />
            </section>
        </div>
    )
}

export default Messages;
