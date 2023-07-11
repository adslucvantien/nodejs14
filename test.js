
// Create an OAuth2 client using the credentials
const { client_secret, client_id, redirect_uris } = credentials.installed;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

// Set the token path (where the access token will be stored)
const TOKEN_PATH = 'token.json';

// Authorize the client
function authorize(callback) {
  // Check if a token already exists
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) {
      return getAccessToken(oAuth2Client, callback);
    }
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

// Get a new access token (if required)
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/gmail.send']
  });
  console.log('Authorize this app by visiting this URL:', authUrl);
  // User authorization flow
  // ...

  // After successful authorization, exchange the code for an access token
  const code = 'authorization_code'; // Replace with the authorization code obtained
  oAuth2Client.getToken(code, (err, token) => {
    if (err) return console.error('Error retrieving access token', err);
    oAuth2Client.setCredentials(token);
    // Store the token to disk for later program executions
    fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
      if (err) console.error(err);
      console.log('Token stored to', TOKEN_PATH);
    });
    callback(oAuth2Client);
  });
}


// Send an email
function sendEmail(auth) {
    const gmail = google.gmail({ version: 'v1', auth });
  
    // Define the email message
    const message = {
      requestBody: {
        raw: base64EncodedEmail
      },
      userId: 'me'
    };
  
    // Send the email
    gmail.users.messages.send(message, (err, res) => {
      if (err) {
        console.error('Error sending email:', err);
      } else {
        console.log('Email sent successfully!');
      }
    });
  }
  
  // Create a base64 encoded email message
  function createEmailMessage() {
    const email = [
      'From: ads.lucvantien@gmail.com',
      'To: like.vespa.lx1@gmail.com',
      'Subject: Testing Gmail API',
      '',
      'Hello from Gmail API!'
    ].join('\r\n');
  
    return Buffer.from(email).toString('base64').replace(/\+/g, '-').replace(/\//g, '_');
  }
  
  // Authorize and send the email
  authorize((auth) => {
    const base64EncodedEmail = createEmailMessage();
    sendEmail(auth);
  });