const Airbnb = artifacts.require("Airbnb");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Airbnb", function (accounts) {

  it("should assert true", async function () {
    await Airbnb.deployed();
    return assert.isTrue(true);
  });

  it("should be able to list property",async() =>{
    
    const AirbnbInstance = await Airbnb.deployed();

     const resp = await AirbnbInstance.rentOutproperty("Gangas By river","hill Top","10000000000000000",{from:accounts[0]});
     console.log("resp",resp);
     expect(resp).to.have.property('tx')
     assert.equal(resp.logs[0].event,'NewProperty');
  });
  
  it("should be able to rent property",async() =>{
    
    const AirbnbInstance = await Airbnb.deployed();

     //const respListProp = await AirbnbInstance.rentOutproperty("Gangas By river","hill Top","10000000",{from:accounts[0]});
     const respRentProp = await AirbnbInstance.rentProperty(0,1,2,{from:accounts[1],value:10000000000000000});
     console.log("respRentProp",respRentProp);
     expect(respRentProp).to.have.property('tx')
     assert.equal(respRentProp.logs[0].event,'NewBooking');
  });
 it("fund should be trasferred to property owner once customer has booked it",async() =>{
    
    const AirbnbInstance = await Airbnb.deployed();

    let PrevBalanceOwner = await web3.eth.getBalance(accounts[0]);
     const resp = await AirbnbInstance.rentProperty(0,5,6,{from:accounts[1],value:10000000000000000});
     let CurrBalanceOwner = await web3.eth.getBalance(accounts[0]);
     CurrBalanceOwner = await web3.utils.fromWei(CurrBalanceOwner);
     PrevBalanceOwner = await web3.utils.fromWei(PrevBalanceOwner);
     console.log("BalanceOwner before in ether::",PrevBalanceOwner);
     console.log("BalanceOwner after in ether::",CurrBalanceOwner);
      assert.isAbove(parseFloat(CurrBalanceOwner),parseFloat(PrevBalanceOwner));
  });

  it("should be throw error if trying to rent property which has already been booked" ,async() =>{
    
    const AirbnbInstance = await Airbnb.deployed();
    const respRentPropErr='';
     //const respListProp = await AirbnbInstance.rentOutproperty("Gangas By river","hill Top","10000000",{from:accounts[0]});
     try{
     respRentPropErr = await AirbnbInstance.rentProperty(0,1,2,{from:accounts[2],value:10000000000000000});
     }
     catch(e){
      assert.equal(e.reason,"property is not available for the selected dates");
     }
  });

  it("should throw error if not sufficient amount while booking property", async() => {
    const AirbnbInstance = await Airbnb.deployed();
    let respRentPropError=null;
    try{
       respRentPropError = await AirbnbInstance.rentProperty(0,3,4,{from:accounts[1],value:100});
       
    }
    catch(e){
      assert.equal(e.reason,"Sent insufficient funds");
    }
  });
});
