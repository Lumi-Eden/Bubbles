import { useState } from "react";
import { supabase } from "./utils/supabase/supabaseClient";

export default function UserSearch({ currentUser, onSelectConversation }) {
    const [searchText, setSearchText] = useState("");
    const [error, setError] = useState("");

    const handleSearch = async (e) => {
        e.preventDefault();
        setError("");

        const { data: foundUser, error: searchError } = await supabase
            .from('user_profiles')
            .select('user_id, username')
            .ilike('username', searchText.trim())
            .single();

        if (searchError || !foundUser) {
            setError("User not found.");
            return;
        }

        if (foundUser.user_id === currentUser.id) {
            setError("That's you!");
            return;
        }

        const { data: conversationId, error: dmError } = await supabase.rpc('find_or_create_dm', {
            p_user_a: currentUser.id,
            p_user_b: foundUser.user_id
        });

        if (dmError) {
            console.error("Failed to start conversation:", dmError);
            setError("Something went wrong.");
            return;
        }

        onSelectConversation(conversationId, foundUser.username);
        setSearchText("");
    };

    return (
        <div id="user-search-styling-container">
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    id="user-search-field"
                    placeholder="Username..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </form>
            {error && <p className="user-search-error">{error}</p>}
        </div>
    )
}