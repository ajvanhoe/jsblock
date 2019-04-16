const EC = require('elliptic').ec;
const ec = new EC('secp256k1');


class Wallet {
	constructor() {
		this.addresses = [];
		this.totalBalance = getTotalBalance();
	}

	createAddress(label) {
		this.addresses = [new Address(label)];
	}

	getTotalBalance() {
		//
	}

	
}


class Address {
	constructor(label=null) {
		this.key = ec.genKeyPair();
		this.publicKey = key.getPublic('hex');
		this.privateKey = key.getPrivate('hex');
		this.label = label;
	}

}
