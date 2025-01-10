// Function to extract questions and options
function extractText() {
    const allText = document.body.innerText; // Adjust to target specific elements for questions and answers
    return allText;
  }
  
  // Listen for messages from the popup
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "scanPage") {
      const extractedText = extractText();
      sendResponse({ text: extractedText });
    }
  });
  