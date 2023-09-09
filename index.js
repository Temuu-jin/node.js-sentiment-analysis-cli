import fs from 'node:fs';
import axios from 'axios';

// Function to analyze text
async function analyzeText(text) {
  try {
    const response = await axios.post(
      'http://text-processing.com/api/sentiment/',
      `text=${encodeURIComponent(text)}`, // Encode the text to safely include it in the URL
    );
    return response.data;
  } catch (error) {
    console.error('Error analyzing text:', error.message);
    return null;
  }
}

async function main() {
  try {
    let input = process.argv[2];

    if (input.endsWith('.txt')) {
      input = fs.readFileSync(input, 'utf8');
    }

    const result = await analyzeText(input);

    if (result) {
      console.log(`Your text has the following sentiment:`);
      console.log(`- Label: ${result.label}`);
      console.log(`- Positive: ${result.probability.pos * 100}%`);
      console.log(`- Neutral: ${result.probability.neutral * 100}%`);
      console.log(`- Negative: ${result.probability.neg * 100}%`);
    }
  } catch (error) {
    console.error('Error in main function:', error.message);
  }
}

main().catch((err) => console.error(err)); // Catch any unhandled promise rejections
