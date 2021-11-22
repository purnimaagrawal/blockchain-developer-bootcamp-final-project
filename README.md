# Blockchain-developer-bootcamp-final-project

Anybody who uses or have used airbnb knows that guests pays too much and hosts are paid too little ,with aribnb as platform keeps some amount from what guests pay for a booking in order to maximize their profit and ensure their very survival. 
The Idea is to create Decentralized Airbnb. Home sharing is the ideal venue for a decentralized marketplace because travel is one of the world's biggest industries, and anyone with a home or a travel itinerary can participate. The underlying tech and infrastructure of blockchain is now scalable enough to accommodate the needs of such a marketplace. A decentralized platform for the home-sharing economy facilitating short and long-term stays .


### Workflow:
1) Property onwer can list the property 
2) Someone who wants to rent the property can place a new booking.
3) While placing the booking request , our Dapp will check if the property is available to rent for the dates or not .
5) Property can be booked either using ETH or using platform native token DAT. For simplicity , conversion is 1 ETH = 3000 DAT. 
6) Dapp will also check if the account which is trying to book has sufficient balance ( either ETH or DAT) , if not sufficient balance then Dapp will notify the user. 
7) Funds will be sent to the propoerty owner once booking has been confirmed .
8) Travellers can query the property they have booked 'Get Bookings' .
9) As project has been deployed in the Rposten network,users can fund their account with DAT token using 'Get Funds' button . 


### Deploy Locally :

Prerequities:
 - Node JS
 - Truffle
 - Gnache-cli

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
  
5) Copy paste the ERC20 token contract address in line 12 of uitls.js
6) Copy paste Airbnb contract address in line 11 of utils.js
7) To fund requesting accounts from UI with ERC20 token(Get Funds button), update the public and private key of any account with loaded token in line 13 and 14 of respectively of utils.js (any adress from your local running blockchain ). By default, the account which deployed the erc20 token will be having all the ERC20 token supply.
 
8) Steps to setup UI :
- cd dapp-ui
- npm install
- npm run build
- npm run start

9) Open in localhost:3000


Front end url :
https://dairbnb-final-project-2021.vercel.app/


### Future Implementation scopes : 
- Platform can have its own token that can be used to pay for the booking .
- platform can support other tokens as well .
- Special discounts can be provided when booked using platform native token .
- Reward system can be implemented . For example everytime a booking is completed , traveller can get back 2% of the total booking price back in his/her wallet .
- Can support booking cancellations and refunds . 
- Invite Program : User can refer friends and family and get rewarded for each referral .
- travel packages
- additional travel products like renting cars ,bus,transfers and other services.
- NFT ?
- Data analytics can be  applied to decentralised data stores in order to suggest optimal room rates based on comparable properties.

