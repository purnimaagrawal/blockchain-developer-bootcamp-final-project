import AirbnbABI from './airbnbABI'
const Web3 = require('web3')

let metamaskWeb3 = new Web3('http://localhost:8545')
let account = null
let airbnbContract
let airbnbContractAddress = '0x25b1659DA62D1C9594f51f0456103a7Ad56D1089' // Paste Contract address here

export function web3() {
  return metamaskWeb3
}

export const accountAddress = () => {
  return account
}

export async function setProvider() {
  // TODO: get injected Metamask Object and create Web3 instance
  if (typeof window.ethereum !== 'undefined') {
    console.log("Metamask detected");
    // let mmdet4cted = document.getElementById("mm-detected")
    // mmdet4cted.innerHTML+= 'Metamak is available'
    alert("Metamak is available")
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
  // TODO: create and return contract Object
  airbnbContract = airbnbContract || new metamaskWeb3.eth.Contract(AirbnbABI.abi, airbnbContractAddress)
  return airbnbContract

}


export async function postProperty(name, description, price) {
  // TODO: call Airbnb.rentOutproperty
  const prop = await getAirbnbContract().methods.rentOutproperty(name, description, price).send({
    from: account[0]
  }).then((result) => {
    alert('Property Posted Successfully');
    postPropertyEvents(result.blockNumber);
  },(error) => {
    console.log("error while booking propoerty::",error);
  });
}



export async function bookProperty(spaceId, checkInDate, checkOutDate, totalPrice) {
  // TODO: call Airbnb.rentSpace
  const prop = await getAirbnbContract().methods.rentProperty(spaceId, checkInDate, checkOutDate).send({
    from: account[0],
    value: totalPrice,
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

export async function getBookingByID(bookingId){

  const Booking = await getAirbnbContract().methods.bookings(bookingId).call();
  return Booking;
  //console.log("Booking::",Booking);
}
export async function getPropertyByID(propertyId){

  const Property = await getAirbnbContract().methods. properties(propertyId).call();
  return Property;
  //console.log("Property::",Property);
}
export async function postPropertyEvents(blockNumber){
 getAirbnbContract().events.NewProperty({
  fromBlock: blockNumber
 },function(error,event){       
   console.log("new property::", event) 
      }).on('data', function(event){

    console.log("here",event); // same results as the optional callback above
    window.location.reload(true);
        
})
}

export async function bookPropertyEvents(blockNumber){
  console.log(blockNumber);
  getAirbnbContract().events.NewBooking({
   fromBlock: blockNumber
  },function(error,event){        
       }).on('data', function(event){
 
     console.log("here",event); // same results as the optional callback above
     window.location.reload(true);
         
 })
 }

 export async function getPropertiesByUserEvent(requiredUser){
  console.log("contract instance:",getAirbnbContract());
  var sample = new Array();
  getAirbnbContract().getPastEvents('NewBooking',{
    filter: {user: [requiredUser]},
    fromBlock: 0
  },  async function(error, events){
     console.log(events[0].returnValues.propertyId); 
    
     
     for(let i =0; i< events.length;i++){
        var obj = {};
        // sample.push({ Property :events[i].returnValues.propertyId,Booking :events[i].returnValues.bookingId});
         var booking =  await getBookingByID(events[i].returnValues.bookingId);
         console.log("booking :",booking);
         var property = await getPropertyByID(events[i].returnValues.propertyId)
         console.log("property :",property);
         obj.checkInDate = booking.checkInDate;
         obj.checkoutDate = booking.checkoutDate;
         obj.name = property.name;
          sample.push(obj);
     }
  
    }
     )
  .then(function(events){
      console.log(events) ;// same results as the optional callback above
  });
  return sample;
 }

export async function fetchAllProperties() {
  // TODO: call Airbnb.propertyId

  const propertyId = await getAirbnbContract().methods.propertyId().call()
  
  // iterate till property Id
  const properties = []
  for (let i = 0; i < propertyId; i++) {
    const p = await airbnbContract.methods.properties(i).call()
    properties.push({
      id: i,
      name: p.name,
      description: p.description,
      price: metamaskWeb3.utils.fromWei(p.price)
    })

  }
  return properties
  // push each object to properties array
}
