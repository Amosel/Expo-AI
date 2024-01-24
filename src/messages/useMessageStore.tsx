import { useCallback } from 'react';
import { useEffect, useState } from 'react';
import { Profile } from '~/stub/persona';
import { Message } from './types';

const removeField = <T, K extends keyof T>(field: K) => (object: T): Omit<T,K> => {
    const c = { ... object};
    delete c[field];
    return c as Omit<T, K>;
};


/**
 * Messages Store for Multiple Chats
 */
export default function useMessageStore(persona: Profile, isDevMode: boolean): IuseMessageStore {
    // const [messages, setMessages] = useState<FullMessage[]>([]);    
    const [chat, setChat] = useState<{ [id: string]: Message[] }>({});
    const [messages, setMessages] = useState<Message[]>([]);
    const [waitingCount, setWaitingCount] = useState<{ [id: string]: number }>({});
    const [isWaiting, setIsWaiting] = useState(false);

    const setWaitingCountInt = useCallback((interval: number) => {
        setWaitingCount(current => {
            const clone = { ...current };
            if (current[persona.id] === undefined) clone[persona.id] = interval;
            else clone[persona.id] = current[persona.id] + interval;
            //Log
            // isDevelopment() && console.log(`(i) setWaitingCountInt() Waiting Count for:'${personaId}': ${clone[personaId]}`, {clone, personaId, interval});
            //Return
            return clone;
        });
    }, [persona.id]);

    const messagsAppend = (message: Message) => {
        const id = persona.id;
        setChat(current => {
            const clone = { ...current };
            if (current[id] === undefined) {
                clone[id] = [message];
            }
            else {
                // clone[id] = [ ...current[id], message ];
                clone[id] = current[id].concat(message);
            }
            return clone;
        });
        //Log
        isDevMode && console.log(`(i) messageAdd() Message Added by:'${message.sender}'`, { content: message.content });
    }

    useEffect(() => {
        if (persona) {
            const messagesArray = chat[persona.id] || [];
            //Introduction
            if (messagesArray.length == 0) {
                //Init Array
                if (persona.intro) {
                    messagsAppend({
                        sender: "assistant",
                        content: persona.intro,
                        timestamp: new Date().getTime(),
                    });
                }
            }
        }
    }, [persona])

    /// Load Messages on ID change
    useEffect(() => setMessages(chat[persona.id]), [chat, persona, persona.id]);

    /// Aggregate Waiting State on ID Change
    useEffect(() => setIsWaiting?.(!!waitingCount[persona.id] && waitingCount[persona.id] > 0), [waitingCount, persona.id])

    //Wrapper for Entire Convo Send Before Processing
    const convoSend = async (messages: Message[]): Promise<void> => convoSendGPT(
        messages.map(removeField('content'))
    )

    /// Send Message to Model (Server)
    const convoSendGPT = async (messages: GPTMessage[]): Promise<void> => {
        //Increment Waiting Count
        // setWaitingCount(current => current + 1);
        setWaitingCountInt(1);
        //Send
        return sendMessage(messages as ChatCompletionMessageParam[])
            .then((message) => {
                if (message?.content) {
                    //Success
                    messageAdd?.(message.content, message.role);
                    //Analytics
                    analyticsEvent('message_sent', { event_category: 'message', event_action: 'send', persona: personaId, model, message });
                }
                else {
                    //2nd Failure -- Maybe throw to the next one...
                    console.error("messageSend() Empty content received from API:", { message, messages });
                    showNotification('Message faild', 'error');
                    //TODO: Should maybe remove last message, or mark it as not-delivered...
                }
            })
            .catch((error) => {
                //Failure
                console.error("messageSend() Error in API Call", error);
                if (error?.error?.type == "insufficient_quota") {
                    showNotification(`Message faild: ${error?.error?.type}`, 'error');

                } else {
                    showNotification('Message faild', 'error');

                }
                //TODO: Should maybe remove last message, or mark it as not-delivered...
                analyticsEvent('message_failed', { event_category: 'error', event_action: 'send', persona: personaId, error, messages });
            })
            //Decrement Wiating Count
            // .finally(() => setWaitingCount(current => current + -1));
            .finally(() => setWaitingCountInt(-1));
    }

    /// Load Persona on ID change
    useEffect(() => {
        const newPersona = getPersonaById(personaId) || personas[0];
        setPersona(newPersona);
        newPersona?.model && setModel?.(newPersona.model);
    }, [personaId])

    /// Set suggestions on messages change
    useEffect(() => {
        setSuggestions(
            persona.suggestions?.(messages) || []
        )
    }, [messages, persona])

    return {
        chat,
        messagsAppend,
    }
}
