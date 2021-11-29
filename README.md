# Blockchain-developer-bootcamp-final-project

Anybody who uses or have used airbnb knows that guests pays too much and hosts are paid too little ,with aribnb as platform keeps some amount from what guests pay for a booking in order to maximize their profit and ensure their very survival. 
The Idea is to create Decentralized Airbnb. Home sharing is the ideal venue for a decentralized marketplace because travel is one of the world's biggest industries, and anyone with a home or a travel itinerary can participate. The underlying tech and infrastructure of blockchain is now scalable enough to accommodate the needs of such a marketplace. A decentralized platform for the home-sharing economy facilitating short and long-term stays .


## Workflow:
1) Property onwer can list the property 
2) Someone who wants to rent the property can place a new booking.
3) While placing the booking request , our Dapp will check if the property is available to rent for the dates or not .
5) Property can be booked either using ETH or using platform native token DAT. For simplicity , conversion is 1 ETH = 3000 DAT. 
6) Dapp will also check if the account which is trying to book has sufficient balance ( either ETH or DAT) , if not sufficient balance then Dapp will notify the user. 
7) Funds will be sent to the propoerty owner once booking has been confirmed .
8) Travellers can query the property they have booked 'Get Bookings' .
9) As project has been deployed in the Ropsten network,users can fund their account with DAT token using 'Get Funds' button . 


## Deploy Locally :

Prerequities:
 - Node JS ( >= 14 < 15)
 - Truffle
 - Ganache-cli

Steps:

1) Clone the Repository
2) Install dependencies
  `npm install`
3) Run Local blockchain 
` npm run test:ethereum`
 
4) Deploy your contracts
  - In another terminal from the project root folder:
    -  `truffle compile`
    -  `cd migrations`
    -  `truffle migrate`
  
5) Copy paste Airbnb contract address in line 14 of [utils.js](https://github.com/purnimaagrawal/blockchain-developer-bootcamp-final-project/blob/main/dapp-ui/plugins/utils.js#:~:text=let%20airbnbContractAddress%20%3D%20%270x2592Ea578f24D72e701151df1c3E7C3FD749eA5a%27//%20Paste%20Airbnb%20Contract%20address%20here).
6) Copy paste the ERC20 token contract address in line 15 of [utils.js](https://github.com/purnimaagrawal/blockchain-developer-bootcamp-final-project/blob/main/dapp-ui/plugins/utils.js#:~:text=let%20airbnbTokenContractAddress%20%3D%20%270x1979c404a44726722beaFC398B15395d2d55d306%27%20%20%20//%20Paste%20token%20Contract%20address%20here).
7) To fund requesting accounts from UI with ERC20 token(Get Funds button), Populate .env file. 
To Populate the .env file :
 - create .env file inside the dapp-ui folder , use [.env.sample](https://github.com/purnimaagrawal/blockchain-developer-bootcamp-final-project/blob/main/dapp-ui/.env.sample) .
 - values will be the public and private keys of the account which holds the ERC20 token and can fund other accounts. 
 
   ```
     PRIVATE_KEY_FUND = <private key>
     PUBLIC_KEY_FUND = <public key> 
    ```
 
  By default, the account which deployed the erc20 token will be having all the ERC20 token supply.

8) Steps to setup UI :
- From root directory , cd dapp-ui
- npm install
- npm run build
- npm run start

9) Navigate to http://localhost:3000/ to see the app running.
10) Install metamask in your browser and connect to the `Localhost 8545`( Port `8545`,chainID `1337`)  . You can also Import your accounts from your local blockchain into metamask using private key.
11) Import the account which deployed the contracts , this account will be having all the ERC20 token intial suuply .
12) Once account has been imported , you can import your erc20 in metamask by providing ERC20 token contract address deployed locally .  
13) Now having ETH and ERC20 token balance in your imported account , You can either host your home or you can book a property .
14) You can check the bookings made by this account using Get Booking button .

## Running test locally 
- To run tests locally ,run  `truffle test`

 ### Screencast Link
https://youtu.be/Us__KvqYERA
 
## Interact using publicly deployed web Interface
 URL :
 https://dairbnb-final-project-2021-purnimaagrawal.vercel.app/.     
    Note : Close button is missing from the pop ups, please refresh page to close the boxes. More UI improvements needs to be done .
 
 - Switch to Ropsten network in metamask.
 - It requires Ropsten ETH to interact . Get ETH here--> [https://faucet.dimensions.network/]
 - Import ERC20 token in metamask . Contract address provided [here](https://github.com/purnimaagrawal/blockchain-developer-bootcamp-final-project/blob/main/deployed_address.txt).

## Public Ethereum wallet for certification
  0x10f868Ed8d36352064323D3E9c4D832CB94fF44a
 
## Future Implementation scopes : 
- UI improvements.
- platform can support other tokens as well .
- Special discounts can be provided when booked using platform native token (DAT) .
- Reward system can be implemented . For example everytime a booking is completed , traveller can get back 2% of the total booking price back in his/her wallet .
- Can support booking cancellations and refunds (Manage Bookings)  . 
- Invite Program : User can refer friends and family and get rewarded for each referral .
- Travel packages
- Additional travel products like renting cars ,bus,transfers and other services.
- NFT ?
- Data analytics can be applied to decentralised data stores in order to suggest optimal room rates based on comparable properties.
 

