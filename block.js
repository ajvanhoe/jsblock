class Block {
	constructor(timestamp, transactions, previousHash = ''){
		this.timestamp = timestamp;
		this.transactions = transactions;		
		this.previousHash = previousHash;
		this.hash = this.calculateHash();
		this.nonce = 0;
	}

	calculateHash() {
		return CryptoJS.SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
	
	}

	mineBlock(difficulty) {
		while( this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0") ){
			this.nonce++;
			this.hash = this.calculateHash();		
		}

		// dodati ovde da smesta block u local storage
		console.log("Block mined: " + this.hash);

	}
}

//module.export.Block = Block;