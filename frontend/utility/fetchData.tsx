import { supabase } from "./supabaseClient";

const fetchData = async (collection: string) => {
    const { data } = await supabase.from(`${collection}`).select(`*`)
    return data
}
export default fetchData