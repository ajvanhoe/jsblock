class Transaction {
	constructor(fromAddress, toAddress, amount, label=null) {
		this.fromAddress = fromAddress;
		this.toAddress = toAddress;
		this.amount = Number(amount);
		this.label = label;
	}
}

//module.export.Transaction = Transaction;