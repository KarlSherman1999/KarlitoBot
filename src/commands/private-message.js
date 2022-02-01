module.exports = (client,triggerText,replyText) =>{
    client.on('message', msg => {
        if(
            msg.content.toLowerCase() === triggerText.toLowerCase()
            ){
            msg.author.send(replyText)
        }
    })
}