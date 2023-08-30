# Puddle-Network

Puddle is a decentralized layer of peer to peer nodes for broadcasting live podcast.it is a micro economy built on podcast.

## Tech stack
1. ENS/ENS widget - for usernames
1. SpruceId - for wallet authentication and storahe with kepler
1. Sort - get contracts transactions
1. Arbitrum - deployment blockchain for contracts
1. Union - voucher and lending contracts

## Network participant

1. Broadcaster - podcaster
2. Transcoder node- background workers for pushing and transcoding streams
3. Stakers - delegates token to Nodes and earn fee cut from nodes


## Contracts

1. Controller - adds and manages the nodes
1. Escrow - process payment for transcoding jobs
1. Erc20 contract - payment and job receipt
1. Voucher on Union

### Architecture

1. Frontend
2. Controller server - spruceId auth,interacting with nodes
3. Docker image - containerized and ran as nodes
4. Rtmp server - for broadcasting stream

