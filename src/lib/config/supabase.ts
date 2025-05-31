import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

console.log(supabaseUrl)
console.log(supabaseKey)

export const supabase = createClient(supabaseUrl, supabaseKey);

type FeedbackResult = {
  data?: any;
  error?: {
    message: string;
    code: string;
    details?: string;
    hint?: string;
  } | null;
};

export async function submitFeedback(feedback: {
  title: string;
  message: string;
}): Promise<FeedbackResult> {
  try {
    const { data, error } = await supabase
      .from("messages")
      .insert([{
        title: feedback.title,
        message: feedback.message
      }])
      .select();

    if (error) {
      return { error };
    }

    return { data };
  } catch (error) {
    console.error("Error submitting feedback:", error);
    return {
      error: {
        message: "Failed to submit feedback",
        code: "UNKNOWN_ERROR"
      }
    };
  }
}