import { supabase } from "./supabase/supabaseClient"

// Check and restore previous session
export function restoreUsrSession(setCurrentUser) {
    supabase.auth.getSession().then(async ({ data, error }) => {
        if (data.session) {
            const { data: profile, error: profileError } = await supabase
                .from('user_profiles')
                .select('*')
                .eq('user_id', data.session.user.id)
                .single();

            if (!profileError) {
                setCurrentUser({ ...data.session.user, ...profile });
            }
        }
    });
}