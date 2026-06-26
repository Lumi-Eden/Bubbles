import { useState, useRef } from "react";
import { supabase } from "./utils/supabase/supabaseClient";

export default function MessageInput({ currentUser, activeConversationId }) {
    const [text, setText] = useState("");
    const textareaRef = useRef(null);

    const handleChange = (e) => {
        setText(e.target.value);

        e.target.style.height = "auto";
        e.target.style.height = e.target.scrollHeight + "px";
    };

    const handleSend = async () => {
        if (text.trim() === "") return;
        
        console.log("Sending message:", {
            conversation_id: activeConversationId,
            sender_id: currentUser.id,
            content: text
        });

        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        console.log("Session check:", sessionData?.session?.user?.id, sessionError);

        const { error } = await supabase
            .from('messages')
            .insert({
                conversation_id: activeConversationId,
                sender_id: currentUser.id,
                content: text
            });

        if (error) {
            console.error("Failed to send message:", error);
            return;
        }

        setText("");
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
        }
    };

    const handleKeyDown = (e) => {
        console.log("key pressed", e.key)

        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <textarea
            id="message-input"
            ref={textareaRef}
            value={text}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Message..."
        />
    );
}

// STYLING IN message-chain.css!!!