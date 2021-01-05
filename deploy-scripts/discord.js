const fetch = require("node-fetch");

function sendMessage() {
    console.log(process.env);
    fetch("https://discord.com/api/webhooks/796151378706825256/rynIzh5as_vLlyiPkCK7kY1alPdHWsW3ejrPMRIeeuI-HDt2_SCFn_47lXfPv_a52nv_", {
        method: "POST",
        body: JSON.stringify({
                username: "Now.SH Deploy Bot",
                avatar_url: "",
                content: "The message to send test"
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