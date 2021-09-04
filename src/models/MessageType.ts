export type Message = {
    userId: string,
    text: string,
    messageId: string,
    datetime: string
}

export type ErrorMessage = {
    message: Message,
    channelId: string
}