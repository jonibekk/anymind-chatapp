
import { useChatContext } from "../../shared/AppContext";
import HorizontalDivider from '../atoms/HorizontalDivider'
import DropDownSelect from '../atoms/DropDownSelect'
import ContactItem from '../atoms/ContactItem'
import ChannelsList from '../../ChannelsList'
import { CHANGE_USER, CHANGE_CHANNEL } from '../../shared/ActionTypes';


const ContactListWrapperStyle = { height: 'calc(100vh - 20px)' };
const ContactListSection1 = { height: '130px', padding: '10px 15px' };
const ContactListSection2 = { display: 'block', overflow: 'scroll', height: 'calc(100vh - 140px)' };

const ContactsList = () => {

    const { state, dispatch } = useChatContext();

    const onUserSelect = (value: string) => {
        dispatch({ type: CHANGE_USER, payload: value });
    }

    const onChannelSelect = (channel: string) => {
        dispatch({ type: CHANGE_CHANNEL, payload: channel });
    }

    const getChannels = (channels: string[]) => {
        return channels.map(channel => {
            const itemdata = {
                id: channel,
                name: ChannelsList.get(channel)
            }
            return <ContactItem item={itemdata} onselect={onChannelSelect} active={state.currentChannel === channel} key={channel} />;
        });
    }

    return (
        <div style={ContactListWrapperStyle}>
            <section style={ContactListSection1}>
                <HorizontalDivider title={'User'} />
                <DropDownSelect list={state.users} value={state.currentUser} onchange={onUserSelect} />
                <HorizontalDivider title={'Channels'} />
            </section>
            <section style={ContactListSection2}>
                {getChannels(state.channels)}
            </section>
        </div>
    )
}

export default ContactsList;
