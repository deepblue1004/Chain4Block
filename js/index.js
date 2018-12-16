
// address of your smart contract deployed on the blockchain
var smartContractAddress = "0x8bcb6de5c25a58d7d44e444c0bc7c0c91d990b0f";

// ABI is a JSON formatted list of contract's function and arguments required to create the EVM bytecode required to call the function
var abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "from1",
				"type": "address"
			},
			{
				"name": "to",
				"type": "address"
			},
			{
				"name": "qty",
				"type": "uint256"
			},
			{
				"name": "data",
				"type": "string"
			}
		],
		"name": "setDetails",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "start",
				"type": "address"
			},
			{
				"name": "hashNo",
				"type": "address"
			}
		],
		"name": "setGenesisHash",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "hashNo",
				"type": "address"
			}
		],
		"name": "getDetails",
		"outputs": [
			{
				"name": "from1",
				"type": "address"
			},
			{
				"name": "to",
				"type": "address"
			},
			{
				"name": "qty",
				"type": "uint256"
			},
			{
				"name": "prevhash",
				"type": "address"
			},
			{
				"name": "data",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

var myAccount;
var web3;

function initApp(){
  myAccount = web3.eth.accounts[0];
  myContract = web3.eth.contract(abi);
  contractInstance = myContract.at(smartContractAddress);
}

function backTrack(msgString) {
  /*msgString = document.getElementById("productHash").value;
  if(!msgString){
    return window.alert("MESSAGE VALUE IS EMPTY");
  }*/

  contractInstance.getDetails(msgString,{ 
    from: myAccount
    //gasPrice: "20000000000", // amount of wei you're paying for every unit of gas
    //gas: "41000", //maximum gas to be spent on this transaction
    //to: textetheraddress, 
    //value: textetheramount,
    //data: ""
   }, function(err, result) {
        if (!err){
        console.log('BACKTRACKED SUCCESSFULLY',result); 
        document.getElementById("result").innerText=result;
        }
        else{
        console.log(err);
        }
  });
}
function createToken(){
    receiver= document.getElementById("receiver").value;
    amount= document.getElementById("amount").value;
    data= '{'+'\"Date\":'+document.getElementById("date").value+"}";
    contractInstance.createToken(receiver,amount,data,{
        from:myAccount,
        gasPrice: "20000000000", // amount of wei you're paying for every unit of gas
        gas: "41000", //maximum gas to be spent on this transaction

    }, function(err, result) {
        if (!err){
            console.log('BACKTRACKED SUCCESSFULLY',result); 
            document.getElementById("returnHash").innerText=result;
        }
        else{
            console.log(err);
        }
    });
}
window.addEventListener('load', function() {
// Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    web3 = new Web3(web3.currentProvider);
  } else {
    // Handle the case where the user doesn't have web3. Probably 
    // show them a message telling them to install Metamask in 
    // order to use our app.
    // For example
    // connect to eth node running locally
    // web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    // or connect the web3 to the ethereum node running on infura.io
    //var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/'));
    console.log('METAMASK NOT DETECTED');
  }
  // Now you can start your app & access web3js freely:
  initApp();
})


