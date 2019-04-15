
function drawBlocks() {

      var output = "";
      // draw block
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
               
          //output+="";

      }

      document.getElementById("blocks").innerHTML = output;
  }


function drawBlock() {
 // sve za pojedinacni blok sa append 
 
 var block = blockchain.getLatestBlock();
 var output="";

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
document.getElementById('blocks').insertAdjacentHTML('afterbegin', output);

}


function showPendingTranactions() {

    var output ="<p>";
    for (const transaction of blockchain.pendingTransactions) {
        output+= transaction.fromAddress + " <i class=\"fas fa-long-arrow-alt-right\"></i> " + transaction.toAddress + " <i class=\"fab fa-bitcoin\"></i> " + transaction.amount + "<br>";
        output+= "label: " + transaction.label + "<br>";
        output+= "<hr>";
    }

    output+="</p>";
    document.getElementById("pending").innerHTML = output;
}









   function mine() {

      document.getElementById("message").setAttribute("class", "badge badge-warning");
      document.getElementById("message").innerHTML = "Mining!";

      // set difficulty
      //let difficulty = document.getElementById("miningDifficulty").value;
      //blockchain.setDifficulty(difficulty);
      //console.log('Difficulty set to: '+difficulty);

      let address =  document.getElementById("miningRewardAddress").value;
      address ? blockchain.mineBlock(address) : blockchain.mineBlock('unknown address');

     //localStorage.setItem("chain", JSON.stringify(blockchain, null, 4));

      document.getElementById("message").setAttribute("class", "badge badge-success");
      document.getElementById("message").innerHTML = "New block created!";

      if(blockchain.isChainValid()) {
          document.getElementById("isValid").setAttribute("class", "badge badge-success");
          document.getElementById("isValid").innerHTML = 'true';
        } else {
          document.getElementById("isValid").setAttribute("class", "badge badge-danger");
          document.getElementById("isValid").innerHTML = 'false';
      }

      
      refresh();
   }





  function send() {
      let from = document.getElementById("from").value;
      let to = document.getElementById("to").value;
      let amount = document.getElementById("amount").value;

      let label = document.getElementById("label").value;

     if(blockchain.createTransaction(new Transaction(from, to, amount, label))) {
        document.getElementById("message").setAttribute("class", "badge badge-success");
        document.getElementById("message").innerHTML = "New transaction created!";
        showPendingTranactions();
     } else {
       document.getElementById("message").setAttribute("class", "badge badge-danger");
       document.getElementById("message").innerHTML = "Transaction rejected!";
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



        if(chain.isChainValid()) {
          document.getElementById("isValid").setAttribute("class", "badge badge-success");
          document.getElementById("isValid").innerHTML = 'true';
        } else {
          document.getElementById("isValid").setAttribute("class", "badge badge-danger");
          document.getElementById("isValid").innerHTML = 'false';
        }


        // replace old blockchain with new
      blockchain = chain;

      document.getElementById("chainData").innerHTML = JSON.stringify(chain, null, 4);
      document.getElementById("message").innerHTML = "New blockchain created!";

      drawBlocks();
    }



    function balanceOf() {
      let address = document.getElementById("getBalance").value.toString();
      let balance = blockchain.getBalanceOfAddress(address);
     
      document.getElementById("showBalance").innerHTML = "Balance of " + address + ": " + balance +" <i class=\"fab fa-bitcoin\"></i>";
      
    }


    function isValid() {
        if(blockchain.isChainValid()) {
          document.getElementById("isValid").setAttribute("class", "badge badge-success");
          document.getElementById("isValid").innerHTML = 'true';
        } else {
          document.getElementById("isValid").setAttribute("class", "badge badge-danger");
          document.getElementById("isValid").innerHTML = 'false';
        }
    }


    function changeDifficulty() {

      let newValue = document.getElementById("difficulty").value;
      blockchain.setDifficulty(newValue);

      document.getElementById("isValid").setAttribute("class", "badge badge-warning");
      document.getElementById("message").innerHTML = "Difficulty set to "+newValue +"!";
    }



    function total() {
      let count =  blockchain.blockCount();
      document.getElementById("blockCount").innerHTML = count; 
    }


    function refresh() {
      //drawBlocks();
      drawBlock();
      showPendingTranactions();
      total();
    }