document.getElementById("scan").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "scanPage" }, async (response) => {
        if (response && response.text) {
          const questionAndAnswers = response.text;
          
          // Process the question with OpenAI API
          const answer = await getAnswerFromOpenAI(questionAndAnswers);
          
          document.getElementById("output").textContent = `Answer: ${answer}`;
        } else {
          document.getElementById("output").textContent = "Failed to scan the page.";
        }
      });
    });
  });
  
  // Function to call OpenAI API
  async function getAnswerFromOpenAI(questionAndAnswers) {
    const apiKey = "MY_API_KEY"; // Replace with your API key
    
    const requestBody = {
      model: "text-davinci-003", // You can use other models like gpt-3.5-turbo or gpt-4
      prompt: `Analyze the following question and options, and provide the correct answer:\n\n${questionAndAnswers}`,
      max_tokens: 150,
      temperature: 0
    };
  
    try {
      const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify(requestBody)
      });
  
      const data = await response.json();
      return data.choices[0].text.trim(); // Extract the answer from the API response
    } catch (error) {
      console.error("Error with OpenAI API:", error);
      return "Error retrieving answer.";
    }
  }
  