import { useEffect, useState, useRef } from "react";
import { supabase } from "./utils/supabase/supabaseClient";

export default function MessageChain({ activeConversationId }) {
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages])

    useEffect(() => {
        if (!activeConversationId) return;

        const fetchMessages = async () => {
            const { data, error } = await supabase.rpc('get_conversation_messages', {
                p_conversation_id: activeConversationId
            });

            if (error) {
                console.error("Failed to fetch messages:", error);
                return;
            }

            setMessages(data);
        };

        fetchMessages();

        const channel = supabase
            .channel(`messages-${activeConversationId}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages',
                    filter: `conversation_id=eq.${activeConversationId}`
                },
                async (payload) => {
                    const { data: profile } = await supabase
                        .from('user_profiles')
                        .select('username, icon_url')
                        .eq('user_id', payload.new.sender_id)
                        .single();

                    setMessages((current) => [
                        ...current,
                        {
                            id: payload.new.id,
                            content: payload.new.content,
                            created_at: payload.new.created_at,
                            sender_id: payload.new.sender_id,
                            username: profile?.username,
                            icon_url: profile?.icon_url
                        }
                    ]);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [activeConversationId]);

    return (
        <div id="message-chain">
            {messages.map((msg) => (
                <div key={msg.id} className="message">
                    <img src={msg.icon_url} className="message-icon" />
                    <div className="message-content">
                        <span className="message-username">{msg.username}</span>
                        <p className="message-text">{msg.content}</p>
                    </div>
                </div>
            ))}
            <div ref={messagesEndRef} />
        </div>
    )
}