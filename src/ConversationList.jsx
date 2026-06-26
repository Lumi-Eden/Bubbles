import { useEffect, useState } from "react";
import { supabase } from "./utils/supabase/supabaseClient";

export default function ConversationList({ currentUser, onSelectConversation }) {
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const fetchConversations = async () => {
            const { data, error } = await supabase.rpc('get_user_conversations', {
                p_user_id: currentUser.id
            });

            if (error) {
                console.error("Failed to fetch conversations:", error);
                return;
            }

            setConversations(data);
            console.log("Fetched conversations:", data);
        };

        fetchConversations();
        console.log("Current user ID:", currentUser.id);
    }, [currentUser.id]);

    return (
        <div id="conversation-list">
            {conversations.map((convo) => (
                <div>
                    <div
                        key={convo.conversation_id}
                        className="conversation-icon-bubble"
                        onClick={() => onSelectConversation(convo.conversation_id, convo.display_name)}
                        title={convo.display_name}
                    >
                        <img src={convo.icon_url || "./assets/noi-placeholder-pfp.jpg"} />
                    </div>
                </div>
            ))}
        </div>
    )
}