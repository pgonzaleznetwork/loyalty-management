const fs = require('fs');

let slackPayload = {
    text: 'Deployment validation on Production',
    blocks: []
}

let summaryBlock = {
    type: 'section',
    text: {
        type: 'mrkdwn',
        text: 'A deployment validation has started in Production. The following files are being deployed:'
    }
}

slackPayload.blocks.push(summaryBlock);

// Specify the path to your text file
const filePath = 'changed_files.txt';

try {
  // Read the file synchronously
  const data = fs.readFileSync(filePath, 'utf8');

  // Split the content into an array of lines
  const lines = data.split('\n');

  // Process each line
  lines.forEach((line) => {

    console.log('Processing line:', line)

    let block = {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: '`'+line+'`'
        }
    }

    slackPayload.blocks.push(block);

  });

  console.log('Finished reading the file.');
} catch (err) {
  console.error('Error reading the file:', err);
}

console.log(slackPayload)

// Convert the object to a JSON string
const jsonData = JSON.stringify(slackPayload); 

// Write the JSON string to the file
fs.writeFileSync('slackPayload.json', jsonData, 'utf-8');
