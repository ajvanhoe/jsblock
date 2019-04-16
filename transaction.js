class Transaction {
	constructor(fromAddress, toAddress, amount, label=null) {
		this.fromAddress = fromAddress;
		this.toAddress = toAddress;
		this.amount = Number(amount);
		this.label = label;
		this.timestamp = Date.now();
	}

	calculateHash() {
	    return SHA256(this.fromAddress + this.toAddress + this.amount + this.label + this.timestamp).toString();
	}

	signTransaction(signingKey) {
    	if (signingKey.getPublic('hex') !== this.fromAddress) {
      		throw new Error('You cannot sign transactions for other wallets!');
    	}
    
	    // Calculate the hash of this transaction, sign it with the key
	    // and store it inside the transaction obect
	    const hashTx = this.calculateHash();
	    const sig = signingKey.sign(hashTx, 'base64');

	    this.signature = sig.toDER('hex');
  	}

}

//module.export.Transaction = Transaction;