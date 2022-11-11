const { IncomingWebhook } = require('@slack/webhook')


const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK)


const loggerStream = {
    write: message => {
        webhook.send({
            text: message
        })
        console.log('Capturando el log', message);
    }
}

module.exports = loggerStream