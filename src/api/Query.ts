import { gql } from '@apollo/client';

export const QueryFetchLatestMessages = () => {
    return gql`
        query FetchLatestMessages($channelId: String!) {
            fetchLatestMessages(channelId: $channelId) {
                userId
                messageId
                text
                datetime
            }
        }
    `;
}

export const QueryFetchMoreMessages = () => {
    return gql`
        query FetchMoreMessages($channelId: String!, $messageId: String!, $old: Boolean!) {
            fetchMoreMessages(
                channelId: $channelId
                messageId: $messageId
                old: $old
            ) {
                userId
                messageId
                text
                datetime
            }
        }
    `;
}