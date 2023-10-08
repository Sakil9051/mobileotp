const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const axios = require('axios'); // Import Axios

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.get('/', (req, res) => {
    res.send('Welcome to the home page');
});

// POST request handler for your own endpoint
app.post('/api/postData', async (req, res) => {
    try {
        // You can access the posted data in req.body
        const postData = req.body;

        // Perform some logic with postData (e.g., save it to a database, process it, etc.)
        // For demonstration purposes, let's just send a response echoing the data
        res.json({ message: 'Data received successfully', data: postData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST request handler to an external API
app.post('/api/sendToExternalAPI', async (req, res) => {
    try {
        // Define the external API endpoint
        const apiUrl = 'http://103.10.234.154/api/SendMesssgeAPI'; // Replace with the actual API URL

        // Data to send to the external API
        const postData = req.body; // You can send req.body or create your own data

        // Make a POST request to the external API using Axios
        const response = await axios.post(apiUrl, postData);

        // Handle the response from the external API
        console.log('Response from external API:');
        // console.log(response.data);

        res.json({ message: 'Data sent to external API successfully', responseData: response.data });
    } catch (error) {
        console.error('Error sending data to external API:');
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 8009;

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});
