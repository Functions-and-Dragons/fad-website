const https = require("https");

function sendMessage() {
    const {
        VERCEL_ENV,
        VERCEL_URL,
        VERCEL_GIT_COMMIT_REF,
        VERCEL_GIT_COMMIT_SHA,
        VERCEL_GIT_COMMIT_AUTHOR_NAME,
    } = process.env;

    let messageStart = `You ${VERCEL_ENV} deployment to `;
    let messageURL = "";
    let messageEnd = ` for commit ${VERCEL_GIT_COMMIT_SHA} by ${VERCEL_GIT_COMMIT_AUTHOR_NAME} has completed.`

    switch (VERCEL_GIT_COMMIT_REF) {
        case "dev":
            messageURL = `**DEV** at https://dev.functionsdragons.com`;
            break;
        case "stage":
            messageURL = `**STAGE** at https://stage.functionsdragons.com`;
            break;
        case "prod":
            messageURL = `**PROD** at https://functionsdragons.com`;
            break;
        default:
            messageURL = VERCEL_URL;
    }

    const postData = JSON.stringify({
        username: "Now.SH Deploy Bot",
        avatar_url: "",
        content: `${messageStart}${messageURL}${messageEnd}`
    });

    const req = https.request({
        hostname: "discord.com",
        port: 443,
        path: "/api/webhooks/796151378706825256/rynIzh5as_vLlyiPkCK7kY1alPdHWsW3ejrPMRIeeuI-HDt2_SCFn_47lXfPv_a52nv_",
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'Content-Length': postData.length },
    }, (res) => {
        if (res.statusCode < 300 && res.statusCode >= 200) {
            console.log(`Deployment message successfully sent to Discord with a ${res.statusCode} status.`)
        } else {
            console.warn(`Deployment message failed to send to Discord with a ${res.statusCode} status.`)
        }

        res.on('data', (d) => {
            process.stdout.write(d);
        });
    });

    req.on('error', (e) => {
        console.log("There was an error sending a message to Discord.");
    });

    req.write(postData);
    req.end();
}

sendMessage();