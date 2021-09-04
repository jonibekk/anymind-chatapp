import { useChatContext } from "../../shared/AppContext";
import ChannelsList from '../../ChannelsList'
import HorizontalDivider from "../atoms/HorizontalDivider";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { QueryFetchLatestMessages, QueryFetchMoreMessages } from '../../api/Query';
import { MutationPostMessages } from '../../api/Mutation';
import { useEffect, useRef, useState } from "react";
import { Message, ErrorMessage } from '../../models/MessageType'
import MessageItem from '../molecules/MessageItem'
import Button from '../atoms/Button'
import TextArea from '../atoms/TextArea'

const MessageBodyStyle = { height: 'calc(100vh - 20px)', }
const MessageBodySection1 = { height: '60px', display: 'flex' }
const MessageBodySection2 = { height: 'calc(100vh - 240px)', padding: '10px 20px' }
const MessageBodySection3 = { height: '180px', width: '100%' }
const ChannelNameStyle = { padding: '20px 15px 10px' }
const MessageActionWrapper = { display: 'flex', columnGap: '10px', padding: '5px 20px' }
const MessageActionEditor = { border: '0', outline: 'none', flex: '1', fontSize: '1.2em' }
const MessageActionSend = { fontSize: '.9em', cursor: 'pointer' }
const MessageLoadOldMessagesStyle = {
    cursor: 'pointer', borderRadius: '99px',
    padding: '7px 15px', top: '70px', left: '50%',
    transform: 'translateX(-50%)',
    zIndex: '10',
    backgroundColor: 'white',
    boxShadow: '1px 2px 4px #d3d3d3'
}


const sortDesc = (a: Message, b: Message) => {
    const time1 = (new Date(a.datetime).getTime());
    const time2 = (new Date(b.datetime).getTime());
    if (time1 < time2) return -1;
    if (time1 > time2) return 1;
    return 0;
}
const setAsyncStorage = (key: string, value: string): void => {
    localStorage.setItem(key, value);
}
const getAsyncStorage = (key: string): string | null => {
    return localStorage.getItem(key);
}


const MessageBody = () => {

    const { state } = useChatContext();

    const [fetchMoreActive, setFetchMoreActive] = useState(false);
    const [editorText, setEditorText] = useState('');
    const [messages, setMessages] = useState([] as Message[]);
    const [errorMessages, setErrorMessages] = useState([] as ErrorMessage[]);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);
    const textRef = useRef<null | HTMLTextAreaElement>(null);

    const [sendMessage] = useMutation(MutationPostMessages(), { errorPolicy: 'all' });
    const FetchObject = useQuery(QueryFetchLatestMessages(), { variables: { channelId: state.currentChannel }, errorPolicy: 'all' });
    const [loadOldMessages, FetchPrevObject] = useLazyQuery(QueryFetchMoreMessages(), { errorPolicy: 'all' });

    const onChangeEditor = (value: string) => {
        setEditorText(value);
        if (textRef.current) {
            setAsyncStorage(`channel${state.currentChannel}/${state.currentUser}`, textRef.current.value);
        }
    }

    const onLoadOldMessages = async (): Promise<void> => {
        const lastMessage: Message = messages[messages.length - 1];
        await loadOldMessages({
            variables: {
                channelId: state.currentChannel,
                messageId: lastMessage.messageId,
                old: true
            }
        });
        if (FetchPrevObject.data) {
            const tmpMessages = FetchPrevObject.data.fetchMoreMessages;
            if (tmpMessages.length < 10) {
                setFetchMoreActive(false);
            }
            setMessages([...messages, ...tmpMessages]);
        }
    }

    const getAllMessageItems = (messages: Message[]) => {
        let tmpErrMessages: Message[] = [];
        errorMessages.map(errMsg => {
            if (errMsg.channelId === state.currentChannel) {
                tmpErrMessages.push(errMsg.message);
            }
            return true;
        });

        let tmpAllMessages = [...messages].reverse();
        tmpAllMessages = [...tmpAllMessages, ...tmpErrMessages].sort(sortDesc)
        return tmpAllMessages.map(msg =>
            <MessageItem key={msg.messageId + Math.random()} message={{ ...msg, send: msg.messageId !== 'null', isMine: msg.userId === state.currentUser }} />
        );
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    const onSubmit = async (): Promise<void> => {

        const response = await sendMessage({
            variables: {
                channelId: state.currentChannel,
                userId: state.currentUser,
                text: editorText.trim()
            }
        });

        if (response.errors) {
            setErrorMessages([...errorMessages, {
                message: {
                    messageId: 'null',
                    userId: state.currentUser,
                    text: editorText.trim(),
                    datetime: new Date().toString(),
                },
                channelId: state.currentChannel
            }]);
        } else {
            await FetchObject.refetch({ channelId: state.currentChannel });
            setAsyncStorage(`channel${state.currentChannel}/${state.currentUser}`, '');
            setEditorText('');
            scrollToBottom();
        }
    }

    useEffect(() => {
        if (FetchObject.data) {
            setMessages(FetchObject.data.fetchLatestMessages);
            setFetchMoreActive(FetchObject.data.fetchLatestMessages.length >= 10);
            setEditorText(getAsyncStorage(`channel${state.currentChannel}/${state.currentUser}`) || '');
            scrollToBottom();
        }
    }, [state, FetchObject, errorMessages]);

    return (
        <div style={{ ...MessageBodyStyle, position: 'relative' }}>
            <section style={{ ...MessageBodySection1, flexDirection: 'column' }}>
                <span style={{ ...ChannelNameStyle, fontWeight: 'bold' }}>
                    {ChannelsList.get(state.currentChannel)}
                </span>
                <HorizontalDivider title={null} />
            </section>

            <section style={{ ...MessageBodySection2, overflowY: 'scroll' }}>
                {
                    fetchMoreActive &&
                    <Button style={{
                        position: 'absolute',
                        ...MessageLoadOldMessagesStyle,
                    }} onclick={onLoadOldMessages} title='Load previous messages' />
                }
                {
                    FetchObject.loading && // Show "Loading..." if loading is true
                    <span style={{ fontSize: '2em', fontWeight: 'bold', color: 'green' }}>
                        Loading...
                    </span>
                }
                {
                    FetchObject.error && // Show error message if there is an error
                    <span style={{ fontSize: '2em', fontWeight: 'bold', color: 'red' }}>
                        Error Occured. Please try again
                    </span>
                }
                {
                    messages.length > 0 && // Show Messages if thare are any.
                    getAllMessageItems(messages)
                }
                <div ref={messagesEndRef} />
            </section>

            <section style={MessageBodySection3}>
                <HorizontalDivider title={null} />
                <div style={MessageActionWrapper}>
                    <TextArea
                        textRef={textRef}
                        rows={7}
                        style={MessageActionEditor}
                        value={editorText}
                        onchange={onChangeEditor}
                        placeholder='Type a message...' />
                    <Button style={{
                        ...MessageActionSend,
                        fontWeight: 'bold',
                        color: editorText.trim().length > 0 ? 'blue' : 'gray',
                        pointerEvents: editorText.trim().length > 0 ? 'all' : 'none'
                    }} onclick={onSubmit} title='Send' />
                </div>
            </section>
        </div>
    )
}


export default MessageBody;
