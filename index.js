//let balance = 500.00;

class Account {

  constructor(username) {
    this.username = username;
    // Have the account balance start at $0 since that makes more sense.
    this._transactions = [];
  }

  get balance() {
    let result = 0;
    for (const transaction of this._transactions) {
      result += transaction.value;
    }
    return result;
  }

  addTransaction(transaction) {
    this._transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this._amount = amount;
    this.account = account;
  }
  commit() {
    if (this.isAllowed()) {
      this.time = new Date();
      this.account.addTransaction(this);
    }
  }
  isAllowed() {
    return true;
  }
}

class Deposit extends Transaction {
  get value() {
    return this._amount;
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this._amount;
  }
  isAllowed() {
    return this._amount <= this.account.balance;
  }
}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("snow-patrol");

console.log('Starting Balance:', myAccount.balance);

const t1 = new Deposit(120.00, myAccount);
t1.commit();

const t2 = new Withdrawal(50.00, myAccount);
t2.commit();

const t3 = new Withdrawal(70.00, myAccount);
t3.commit();

console.log('Ending Balance:', myAccount.balance);
