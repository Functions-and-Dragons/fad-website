const fetch = require("node-fetch");

function sendMessage() {
    const {
        VERCEL_ENV,
        VERCEL_URL,
        VERCEL_GIT_COMMIT_REF,
        VERCEL_GIT_COMMIT_SHA,
        VERCEL_GIT_COMMIT_AUTHOR_NAME,
    }

    let messageStart = `You ${VERCEL_ENV} deployment to `;
    let messageURL = "";
    let messageEnd = ` for commit ${VERCEL_GIT_COMMIT_SHA} by ${VERCEL_GIT_COMMIT_AUTHOR_NAME} has started.`

    switch (VERCEL_GIT_COMMIT_REF) {
        case "dev":
            messageURL = `https://dev.functionsdragons.com`;
            break;
        case "stage":
            messageURL = `https://stage.functionsdragons.com`;
            break;
        case "prod":
            messageURL = `https://functionsdragons.com`;
        default:
            messageURL = VERCEL_URL;
    }

    fetch("https://discord.com/api/webhooks/796151378706825256/rynIzh5as_vLlyiPkCK7kY1alPdHWsW3ejrPMRIeeuI-HDt2_SCFn_47lXfPv_a52nv_", {
        method: "POST",
        body: JSON.stringify({
                username: "Now.SH Deploy Bot",
                avatar_url: "",
                content: `${messageStart}${messageURL}${messageEnd}`
            }),
        headers: { 'Content-Type': 'application/json' },
    }).then(res => {
        if (res.status < 300 && res.status >= 200) {
            console.log(`Deployment message successfully sent to Discord with a ${res.status} status.`)
        } else {
            console.warn(`Deployment message failed to send to Discord with a ${res.status} status.`)
        }
    });
}

sendMessage();