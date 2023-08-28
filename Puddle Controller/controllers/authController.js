const { generateNonce, SiweMessage } =require('siwe') ;


exports.getNonce= async (req, res, next) => {
    try{

        const nonce=generateNonce()
        console.log(nonce,"nonce")
        res.status(200).json({
            status: 'success',
            nonce:nonce
        });

        }catch(e){
            console.log(e)
        }
}



exports.verify= async (req, res, next) => {
        const { message, signature } = req.body;
        const siweMessage = new SiweMessage(message);

    try{

       await siweMessage.verify({ signature });
        res.status(200).json({
            status: 'success',
            data:true
        });

        }catch(e){
            console.log(e)
        }
}



