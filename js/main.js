// Send the original reply text to the OpenAI API
async function optimizeReply(originalReply) {
  const API_KEY = "___API KEY__";
  const API_URL = `https://api.openai.com/v1/completions`;

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
        model: "text-curie-001",
      prompt: `Rewrite the following text to make it more customer service friendly: ${originalReply}`,
      max_tokens: 400
    })
  });

  const result = await response.json();
    return result.choices[0].text;
}

// Replace the original reply text with the optimized reply text
async function rewriteReply() {
  const originalReply = document.getElementById("reply-text").value;
  const optimizedReply = await optimizeReply(originalReply);
  document.getElementById("reply-text").value = optimizedReply;
}

// Add a button to trigger the reply optimization
const submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", rewriteReply);
