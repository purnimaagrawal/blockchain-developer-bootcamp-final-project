import AirbnbABI from './airbnbABI'
import AirbnbTokenABI from './airbnbTokenABI.json'
const Web3 = require('web3')
const axios = require('axios');
const BigNumber = require('bignumber.js');
let metamaskWeb3 = new Web3('http://localhost:8545')
const HttpException = require('http-exception')
let account = null
let airbnbContract
//1 ETH = 3000 DAT token assumed.
let RATE = 3000;

let airbnbTokenContract
//Ropsten
let airbnbContractAddress = '0x2592Ea578f24D72e701151df1c3E7C3FD749eA5a'// Paste Airbnb Contract address here
let airbnbTokenContractAddress = '0x1979c404a44726722beaFC398B15395d2d55d306'   // Paste token Contract address here 

let TokenOwneraddress = process.env.NEXT_PUBLIC_PUB_KEY_FUND;        // Fund other account from this account
let TokenOwnerPrivateKey = process.env.NEXT_PUBLIC_PRI_KEY_FUND;  // DO NOT PUT PRIVATE KEY HERE in production setup , use cloud service + encryption and salt to protect private key .
export function web3() {
  return metamaskWeb3
}

export const accountAddress = () => {
  return account
}

export async function setProvider() {
  if (typeof window.ethereum !== 'undefined') {
    console.log("Metamask detected");
    // alert("Metamak is available")
}
else {
    console.log("metamask not detected");
    alert("you need to install metamask !")
}

  if (window.ethereum) {
    metamaskWeb3 = new Web3(ethereum);
    try {
      // Request account access if needed
      await ethereum.enable();
    } catch (error) {
      // User denied account access...
    }
  }
  else if (window.web3) {
    metamaskWeb3 = new Web3(web3.currentProvider);
  }
  account = await metamaskWeb3.eth.getAccounts()
}

function getAirbnbContract() {
  // create and return contract Object
  airbnbContract = airbnbContract || new metamaskWeb3.eth.Contract(AirbnbABI.abi, airbnbContractAddress)
  return airbnbContract

}

function getAirbnbTokenContract() {
  // create and return contract Object
  airbnbTokenContract = airbnbTokenContract || new metamaskWeb3.eth.Contract(AirbnbTokenABI.abi, airbnbTokenContractAddress)
  return airbnbTokenContract

}

export async function fundAccount(account) {
  const query = await getAirbnbTokenContract().methods.transfer(account,"30000000000000000000");
  const encodedABI = query.encodeABI();
  const signedTx = await metamaskWeb3.eth.accounts.signTransaction(
    {
      data: encodedABI,
      from: TokenOwneraddress,
      gas: 3000000,
      to: airbnbTokenContractAddress,
    },
    TokenOwnerPrivateKey,
    false,
  );
const sendSignedTx = await metamaskWeb3.eth.sendSignedTransaction(signedTx.rawTransaction)
console.log("sendSignedTx",sendSignedTx);
      if(sendSignedTx.transactionHash!=null){
        alert(`Account funded with 30 DAT token, tx hash: ${sendSignedTx.transactionHash}`);
      }
}

export async function postProperty(name, description, price) {
  const prop = await getAirbnbContract().methods.rentOutproperty(name, description, price).send({
    from: window.ethereum.selectedAddress
  }).then((result) => {
    alert('Property Posted Successfully');
    postPropertyEvents(result.blockNumber);
  },(error) => {
    console.log("error while booking propoerty::",error);
  });
}

export async function bookProperty(spaceId, checkInDate, checkOutDate, totalPrice) {
  const prop = await getAirbnbContract().methods.rentProperty(spaceId, checkInDate, checkOutDate).send({
    from: window.ethereum.selectedAddress,
    value: totalPrice,  //wei
  }).then((result)=> {
   
    alert('Property Booked Successfully');
    bookPropertyEvents(result.blockNumber);

   
  },(error) =>{
     let err = error.message;
    if(err.includes("property is not available")){
      alert("Property not available for selected dates")
    }
 });
}

export async function bookPropertyDAT(spaceId, checkInDate, checkOutDate, totalPrice) {
   try {

    let priceDAT = totalPrice * RATE;
    let x = (new BigNumber(priceDAT)).toFixed();
    let checkBalance = await getAirbnbTokenContract().methods.balanceOf(window.ethereum.selectedAddress).call();
    if(checkBalance<x){
      throw new HttpException("Not enough balance");
      }
      let approveResp = await getAirbnbTokenContract().methods.approve(airbnbContractAddress,x.toString()).send({
        from : window.ethereum.selectedAddress
       });
       if(approveResp.status!==true){
        throw new HttpException("Request not Approved");
       }
       const prop = await getAirbnbContract().methods.rentPropertyDAT(spaceId, checkInDate, checkOutDate).send({
        from : window.ethereum.selectedAddress,
       value: totalPrice,  //wei
     });
     alert('Property Booked Successfully');
     bookPropertyEvents(prop.blockNumber);
   }//end try
   catch(e){
    console.log("exception",e);
    if(e.toString().includes("Not enough balance")){
       alert("Not enough token balance ");
    }
    let err = e.message;
    if(err.includes("property is not available")){
      alert("Property not available for selected dates")
    }
   }
}


export async function getBookingByID(bookingId){
  const Booking = await getAirbnbContract().methods.bookings(bookingId).call();
  return Booking;
}
export async function getPropertyByID(propertyId){
  const Property = await getAirbnbContract().methods. properties(propertyId).call();
  return Property;
}
export async function postPropertyEvents(blockNumber){
 getAirbnbContract().events.NewProperty({
  fromBlock: blockNumber
 },function(error,event){       
   console.log("new property::", event) 
      }).on('data', function(event){
    window.location.reload(true);
        
})
}
export async function bookPropertyEvents(blockNumber){
  getAirbnbContract().events.NewBooking({
   fromBlock: blockNumber
  },function(error,event){        
       }).on('data', function(event){
     window.location.reload(true);
         
 })
 }
 export async function getPropertiesByUserEvent(requiredUser) {
  let sample = new Array();
  let AllEvents = await getAirbnbContract().getPastEvents('NewBooking',{
    filter: {user: [requiredUser]},
    fromBlock: 0
  });
  let id = 0;
    for(let i =0; i< AllEvents.length;i++){
        var obj = {};
         var booking =  await getBookingByID(AllEvents[i].returnValues.bookingId);
         var property = await getPropertyByID(AllEvents[i].returnValues.propertyId)
         obj.checkInDate = booking.checkInDate;
         obj.checkoutDate = booking.checkoutDate;
         obj.name = property.name;
         obj.id = id;
          sample.push(obj);
          id++;
          
     }
     console.log("sample:",sample);
   return sample;
 }

export async function fetchAllProperties() {
  
  const propertyId = await getAirbnbContract().methods.propertyId().call()
    
  // iterate till property Id
  const properties = []
  for (let i = 0; i < propertyId; i++) {
    const p = await airbnbContract.methods.properties(i).call()
    properties.push({
      id: i,
      name: p.name,
      description: p.description,
      price: metamaskWeb3.utils.fromWei(p.price),
      priceUSD: await getUSDfromETH(metamaskWeb3.utils.fromWei(p.price))
    })

  }
  return properties
  // push each object to properties array
}

async function getUSDfromETH(ethprice){
  let url = 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD'
  var response =  await axios.get(url)
  var result = response.data.USD;
    let totalUSD = ethprice*result;
     return parseFloat(totalUSD.toFixed(2));
}


//TODO : Manage booking to be implemented in future. 
async function manageBookings(bookingId){

}