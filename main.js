var message = document.getElementById("message"),
    blocks = document.getElementById("blocks"),
    valid = document.getElementById("isValid"),
    pending = document.getElementById("pending"),
    miner = document.getElementById("miningRewardAddress"),
    getBalance = document.getElementById("getBalance"),
    showBalance = document.getElementById("showBalance"),
    // miningDifficulty = document.getElementById("miningDifficulty"),
    sender = document.getElementById("from"),
    reciever = document.getElementById("to"),
    label = document.getElementById("label"),
    coins = document.getElementById("amount");



function setMessage(alert, text) {
  message.setAttribute("class", "badge badge-"+alert);
  message.innerHTML = text;
}




function drawBlocks() {

      let output = "";
      // draw blocks
      for (const block of blockchain.chain) {
          output+= "<div class=\"card text-white bg-dark mb-3\">";
           output+="<div class=\"card-header\">";
            output+="block height: "+blockchain.chain.indexOf(block)+"<br>";
            // output+="timestamp: "+block.timestamp+"<br>";
            output+="<strong>block hash</strong>:  "+block.hash+"<br>";
            output+="<small>previous hash</small>:  "+block.previousHash+"<br>";
            output+="nonce: "+block.nonce;
            output+="</div>";
          output+="<div class=\"card-body\"><h5 class=\"card-title\">Transactions:</h5>";
          
          for(const transaction of block.transactions) {

            output+= "From: " + transaction.fromAddress + "<br>";
            output+= "To: " + transaction.toAddress + "<br>";
            output+= "Amount: " + transaction.amount + "<br>";
            output+= "Label: " + transaction.label + "<br>";
            output+= "<hr>";
          }

        output+="</div></div>";     
    }
      blocks.innerHTML = output;
  }


function drawBlock() {
 // adds a single block
 let block = blockchain.getLatestBlock();
 let output="";

          output+= "<div class=\"card text-white bg-dark mb-3\">";
           output+="<div class=\"card-header\">";
            output+="block height: "+blockchain.chain.indexOf(block)+"<br>";
            // output+="timestamp: "+block.timestamp+"<br>";
            output+="<strong>block hash</strong>:  "+block.hash+"<br>";
            output+="<small>previous hash</small>:  "+block.previousHash+"<br>";
            output+="nonce: "+block.nonce;
            output+="</div>";
          output+="<div class=\"card-body\"><h5 class=\"card-title\">Transactions:</h5>";
          
          for(const transaction of block.transactions) {

            output+= "From: " + transaction.fromAddress + "<br>";
            output+= "To: " + transaction.toAddress + "<br>";
            output+= "Amount: " + transaction.amount + "<br>";
            output+= "Label: " + transaction.label + "<br>";
            output+= "<hr>";
          }

        output+="</div></div>";     

// with .insertAdjacentHTML, preserves event listeners
blocks.insertAdjacentHTML('afterbegin', output);

}


function showPendingTranactions() {

    let output ="<p>";
    for (const transaction of blockchain.pendingTransactions) {
        output+= transaction.fromAddress + " <i class=\"fas fa-long-arrow-alt-right\"></i> " + transaction.toAddress + " <i class=\"fab fa-bitcoin\"></i> " + transaction.amount + "<br>";
        output+= "label: " + transaction.label + "<br>";
        output+= "<hr>";
    }

    output+="</p>";
    pending.innerHTML = output;
}



   function mine() {

      setMessage('warning', 'Mining!');

      // set difficulty
      // let difficulty = miningDifficulty.value;
      // blockchain.setDifficulty(difficulty);
      // console.log('Difficulty set to: '+difficulty);

      let address =  miner.value;
      if(!address) {
        setMessage('warning', 'Unknown address!');
      } else {
        blockchain.mineBlock(address);
        setMessage('success', 'New block created!');
        miner.innerHTML = '';
        refresh();
      }
          
     
   }


  function send() {
      let from = sender.value,
          to = reciever.value,
          amount = coins.value,
          info = label.value;

     if(blockchain.createTransaction(new Transaction(from, to, amount, info))) {
        setMessage('success', 'New transaction created!');
        showPendingTranactions();
     } else {
        setMessage('danger', 'Transaction rejected!');
     }
   }


    function reset() {
    //   localStorage.removeItem("chain");
       location.reload();
    }

    function newBlockchain() {

        let initialBlockText = document.getElementById("initialBlockText").value;
        let chain = new Blockchain(initialBlockText);    

        //localStorage.setItem("chain", JSON.stringify(chain, null, 4));

      isValid();
      // replace old blockchain with new
      blockchain = chain;
      setMessage('primary', 'New blockchain created!');
      drawBlocks();
    }



    function balanceOf() {
      let address = getBalance.value.toString();
      let balance = blockchain.getBalanceOfAddress(address);
     
      showBalance.innerHTML = "Balance of " + address + ": " + balance +" <i class=\"fab fa-bitcoin\"></i>";
      
    }


    function isValid() {
      blockchain.isChainValid() ? setIsValid('success', 'true') : setIsValid('danger', 'false');
    }


    function changeDifficulty() {

      let newValue = document.getElementById("difficulty").value;
      blockchain.setDifficulty(newValue);
     
      setMessage('warning', 'Difficulty set to '+newValue +'!');
      
    }

    function setIsValid(alert, text) {
        valid.setAttribute("class", "badge badge-"+alert);
        valid.innerHTML = text;
    }


    function total() {
      let count =  blockchain.blockCount();
      document.getElementById("blockCount").innerHTML = count; 
    }


    function refresh() {
      //drawBlocks();
      drawBlock();
      showPendingTranactions();
      isValid();
      total();
    }