const fetch = require('node-fetch');

module.exports = async function (context, req) {
    const code = req.body.code;
    if (!code) {
        context.res = {
            status: 400,
            body: "No code provided"
        };
        return;
    }

    const clientId = process.env.CLIENT_ID;  
    const clientSecret = process.env.CLIENT_SECRET;  
    const redirectUri = 'http://localhost:5173/stats_for_todoist/';  

    try {
        const response = await fetch('https://todoist.com/oauth/access_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `client_id=${clientId}&client_secret=${clientSecret}&code=${code}&redirect_uri=${redirectUri}`,
        });

        if (!response.ok) {
            throw new Error('Token exchange with Todoist failed');
        }

        const data = await response.json();
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: data
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: "Internal server error"
        };
    }
};
