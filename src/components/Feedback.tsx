import { useState } from "react";
import { MessageCircle, X, Send, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { submitFeedback } from "../lib/config/supabase";

const FeedbackComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState({
    title: "",
    message: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFeedback((prev) => ({
      ...prev,
      [name]: value,
    }));
    setApiError(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setApiError(null);

    try {
      const { data, error } = await submitFeedback(feedback);

      if (error) {
        throw new Error(error.message || "Failed to submit feedback");
      }

      setIsSubmitted(true);
      
      setTimeout(() => {
        setFeedback({ title: "", message: "" });
        setIsOpen(false);
        setIsSubmitted(false);
      }, 2000);
    } catch (error) {
      console.error("Submission error:", error);
      setApiError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="feedback-container">
      <div className="feedback-button-wrapper">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="feedback-button"
          aria-label="Give feedback"
        >
          <MessageCircle className="feedback-icon" size={28} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="feedback-popover"
            >
              <div className="feedback-popover-content">
                <button
                  onClick={() => setIsOpen(false)}
                  className="feedback-close-button"
                  aria-label="Close feedback form"
                >
                  <X size={18} />
                </button>

                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="feedback-success-state"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500 }}
                        className="feedback-success-icon-wrapper"
                      >
                        <Check className="feedback-success-icon" size={32} />
                      </motion.div>
                      <h3 className="feedback-success-title">Thank you!</h3>
                      <p className="feedback-success-message">
                        Your feedback has been submitted successfully.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <h2 className="feedback-form-title">Share Your Feedback</h2>
                      <form onSubmit={handleSubmit} className="feedback-form">
                        <div className="feedback-input-group">
                          <label htmlFor="title" className="feedback-label">
                            Title
                          </label>
                          <input
                            type="text"
                            id="title"
                            name="title"
                            value={feedback.title}
                            onChange={handleChange}
                            className="feedback-input"
                            required
                          />
                        </div>

                        <div className="feedback-input-group">
                          <label htmlFor="message" className="feedback-label">
                            Message
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            value={feedback.message}
                            onChange={handleChange}
                            rows={3}
                            className="feedback-textarea"
                            required
                          />
                        </div>

                        {apiError && (
                          <div className="feedback-error-message">
                            {apiError}
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={isLoading}
                          className="feedback-submit-button"
                        >
                          {isLoading ? (
                            "Submitting..."
                          ) : (
                            <>
                              <Send size={16} className="feedback-submit-icon" />
                              Submit Feedback
                            </>
                          )}
                        </button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FeedbackComponent;