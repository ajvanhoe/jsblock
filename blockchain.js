class Blockchain {
	constructor(initialBlockInput=null) {
		this.chain = [this.createGenesisBlock(initialBlockInput)];
		this.difficulty = 1;
		this.pendingTransactions = [];
		this.miningReward = 25;
	}

	createGenesisBlock(initialBlockInput=null) {
		if(!initialBlockInput) {initialBlockInput="The Genesis Block";}

		this.pendingTransactions = [
			new Transaction(null, 'coinbase', 21000000, initialBlockInput)
		];

		let time = Date.now();
		return new Block(time, this.pendingTransactions, "0");
	}
	
	getLatestBlock(){
		return this.chain[this.chain.length -1];
	}

	blockCount(){
		return this.chain.length;
	}

	mineBlock(miningRewardAddress) {
		
		// adds a mining reward
		this.pendingTransactions.push(new Transaction('coinbase', miningRewardAddress, this.miningReward));
		
		let block = new Block (Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
		block.mineBlock(this.difficulty);

		console.log('Block succesfully mined!');
		this.pendingTransactions = [];
		this.chain.push(block);

	}

	createTransaction(transaction){
		// it will only work if the sender has enough coins
		if(!(this.getBalanceOfAddress(transaction.fromAddress) < transaction.amount)) {
			this.pendingTransactions.push(transaction);		
			return true;
		}
		return false;
	}


	getBalanceOfAddress(address){
		let balance = 0;

		for (const block of this.chain) {
			for (const trans of block.transactions){
				if(trans.fromAddress === address){
					balance -= Number(trans.amount);
				}			

				if(trans.toAddress === address){
					balance += Number(trans.amount);
				}
			}
		}
		return balance;		
	}


	isChainValid() {
		for(let i=1; i< this.chain.length; i++){

			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i-1];

			if(currentBlock.hash !== currentBlock.calculateHash()){
				return false;				
			}

			if(currentBlock.previousHash !== previousBlock.hash) {
				return false;			
			}			
	
		}
		return true;
	}


	setDifficulty(newValue) {
		this.difficulty = newValue;
	}



}

//module.exports.Blockchain = Blockchain;