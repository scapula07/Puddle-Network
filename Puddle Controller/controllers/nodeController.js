const Web3 = require("web3")
const controllerAbi = require('../contracts/abi/controller.json')
const HDWalletProvider =require("@truffle/hdwallet-provider")

const publicAddress="0x8bbb4498e0Db79F98944a1DeCbFB98baab87E39E"
const privateKey ="4d024692c1f4ec2bbb1d46b77f965abc847b99949f59f438126ff37f29cee64a"
const contractAddress= "0x99C6947AA6b504020c91926896cE5068240A9E7C"


const wss_provider = new HDWalletProvider(
     privateKey,
     "wss://goerli.infura.io/ws/v3/85fc7c4c61664a96808975adbb581787"
  )
const web3 = new Web3(wss_provider)

const contract = new web3.eth.Contract(
     controllerAbi,
     contractAddress
 )
exports.findActiveTranscoder= async (req, res, next) => {
    const {fee} =req.body
    console.log(fee)

    const response=await contract.methods.getAllActiveTranscoders().call({})
    const nodes=[]
    const transcoders=[]
    response.forEach(async(ress) => {
        nodes.push(ress[0])
      });
     
      nodes.forEach(async(node) => {
       const transcoder= await contract.methods.ActiveTranscoders(node).call()

       console.log(transcoder,"transcoder")
        transcoders.push(transcoder)
      
    
      });

    console.log(transcoders)

//     const nodes=[
//         {fee:6},
//         {fee:4},
//         {fee:1},
//         {fee:2},
        
//     ]



//     // // const node = activeNodes.reduce((least, current) => {
//     // //     return current.fee < least? current.fee : least;
//     // //   }, Infinity);
//     const node = activeNodes.reduce((closest, current) => {
//          const currentDiff = Math.abs(current.number - fee);
//         const closestDiff = Math.abs(closest.number - fee);
//         return currentDiff < closestDiff ? current : closest;
//       });
//          console.log(node)
//     try{
         
//          res.status(200).json({
//             status: 'success',
//             activeNode:node
//           });

//         }catch(e){
//            console.log(e)
//            res.status(200).json({
//             status: 'error'
//           });
//      }

}


exports.findActiveFiler= async (req, res, next) => {

}