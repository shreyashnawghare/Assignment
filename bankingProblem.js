function Bank() {
  this.count = 1000; 
  this.allAccounts = []; 

  this.create = function (name) {
    this.count++; 
    // creating a new account with this account number
    var account = {
      accountHolder: name,
      accountBalance: 0,
      accountNumber: this.count,
      depositsCount: 0, // setting the no. of deposits to 0 by default, this will later be used to limit the no. of deposits to 3
      withdrawlsCount: 0 // setting the no. of withdrawls to 0 by default, this will later be used to limit the no. of withdrawls to 3
    };
    // adding this account to the bank
    this.allAccounts.push(account);
    console.log(account.accountNumber);
  };

  // deposit method has two parameters - account number and the deposit amount
  this.deposit = function (accNo, depositAmount) {
    var accountNumbers = this.allAccounts.map(
      (account) => account.accountNumber
    );
    var account = this.allAccounts.find(
      (account) => account.accountNumber == accNo
    );
    var accountIndex = this.allAccounts.findIndex(
      (account) => account.accountNumber == accNo
    );
    if (accountNumbers.includes(accNo)) {
      if (
        account.accountBalance + depositAmount <= 100000 &&
        depositAmount >= 500 &&
        depositAmount <= 50000 &&
        account.depositsCount < 3
      ) {
        account.accountBalance += depositAmount;
        this.allAccounts[accountIndex] = account;
        account.depositsCount++;
        console.log(account.accountBalance);
      } else if (
        account.depositsCount >= 3 &&
        account.accountBalance + depositAmount <= 100000
      )
        console.log("Only 3 deposits allowed in a day");
      else if (account.accountBalance + depositAmount > 100000)
        console.log("Account balance cannot exceed 100000");
      else if (depositAmount < 500)
        console.log("Minimum deposit amount is 500");
      else if (depositAmount > 50000)
        console.log("Maximum deposit amount is 50000");
    } else console.log("Invalid account number");
  };

  // withdraw method has two parameters - account number and the withdraw amount
  this.withdraw = function (accNo, withdrawAmount) {
    var accountNumbers = this.allAccounts.map(
      (account) => account.accountNumber
    );
    var account = this.allAccounts.find(
      (account) => account.accountNumber == accNo
    );
    var accountIndex = this.allAccounts.findIndex(
      (account) => account.accountNumber == accNo
    );
    if (accountNumbers.includes(accNo)) {
      if (
        account.accountBalance - withdrawAmount >= 0 &&
        withdrawAmount >= 1000 &&
        withdrawAmount <= 25000 &&
        account.withdrawlsCount < 3
      ) {
        account.accountBalance -= withdrawAmount;
        this.allAccounts[accountIndex] = account;
        account.withdrawlsCount++;
        console.log(account.accountBalance);
      } else if (
        account.withdrawlsCount >= 3 &&
        account.accountBalance - withdrawAmount > 0
      )
        console.log("Only 3 withdrawls allowed in a day");
      else if (account.accountBalance - withdrawAmount < 0)
        console.log("Insufficient balance");
      else if (withdrawAmount < 1000)
        console.log("Minimum withdrawl amount is 1000");
      else if (withdrawAmount > 25000)
        console.log("Maximum withdrawl amount is 25000");
    } else console.log("Invalid account number");
  };

  // balance method has one parameter which is the account number
  this.balance = function (accNo) {
    var account = this.allAccounts.find(
      (account) => account.accountNumber == accNo
    );
    account
      ? console.log(account.accountBalance)
      : console.log("Invalid account number");
  };

  // transfer method has three parameters - sender's account number, reciever's account number and the transfer amount
  this.transfer = function (senderAccNo, receiverAccNo, amountToTransfer) {
    var sendersAccount = this.allAccounts.find(
      (account) => account.accountNumber == senderAccNo
    );
    var sendersAccountIndex = this.allAccounts.findIndex(
      (account) => account.accountNumber == senderAccNo
    );
    var recieversAccount = this.allAccounts.find(
      (account) => account.accountNumber == receiverAccNo
    );
    var recieversAccountIndex = this.allAccounts.findIndex(
      (account) => account.accountNumber == receiverAccNo
    );
    if (
      sendersAccount.accountBalance - amountToTransfer >= 0 &&
      recieversAccount.accountBalance + amountToTransfer <= 100000 &&
      amountToTransfer >= 1000 &&
      amountToTransfer <= 30000
    ) {
      sendersAccount.accountBalance -= amountToTransfer;
      recieversAccount.accountBalance += amountToTransfer;
      this.allAccounts[sendersAccountIndex] = sendersAccount;
      this.allAccounts[recieversAccountIndex] = recieversAccount;
      console.log("Transfer successful");
    } else if (sendersAccount.accountBalance - amountToTransfer < 0)
      console.log("Insufficient balance");
    else if (recieversAccount.accountBalance + amountToTransfer > 100000)
      console.log("Reciever's account cannot recieve this amount");
    // because then his account balance would exceed 100000
    else if (amountToTransfer < 1000)
      console.log("Minimum amount that can be transferred is 1000");
    else if (amountToTransfer > 25000)
      console.log("Maximum amount that can be transferred is 25000");
  };

  // allinfo method
  this.allInfo = function () {
    console.log(this.allAccounts);
  };
}

// creating a bank object by calling the constructor function
const bank = new Bank();

// i/o

// account creation
bank.create("Johny Depp"); // o/p : 1001
bank.create("Amber Heard"); // o/p : 1002

// amount deposit
bank.deposit(3456); // o/p: Invalid account number
bank.deposit(1001, 450); // o/p: Minimum deposit amount is 500
bank.deposit(1001, 60000); // o/p: Maximum deposit amount is 50000
bank.deposit(1001, 120000); // o/p: Account balance cannot exceed 100000
bank.deposit(1001, 15000); // o/p: 15000
bank.deposit(1001, 15000); // o/p: 30000
bank.deposit(1001, 15000); // o/p: 45000
bank.deposit(1001, 10000); // o/p: Only 3 deposits are allowed in a day

// amount withdrawl
bank.withdraw(1001, 400); // o/p: Minimum withdrawl amount is 1000
bank.withdraw(1001, 30000); // o/p: Maximum withdrawl amount is 25000
bank.withdraw(1001, 5000); // o/p: 40000
bank.withdraw(1001, 15000); // o/p : 25000
bank.withdraw(1001, 15000); // o/p : 10000
bank.withdraw(1001, 15000); // o/p : Insufficient balance
bank.withdraw(1001, 5000); // o/p : Only 3 withdrawls are allowed in a day

// balance
bank.balance(1001); // o/p : 10000
bank.balance(1002); // o/p : 0
bank.balance(3456); // o/p : Invalid account number

// transfer
bank.transfer(1001, 1002, 12000); // o/p : Insufficient balance
bank.transfer(1001, 1002, 800); // o/p : Minimum amount that can be transferred is 1000
bank.transfer(1001, 1002, 8000); // o/p : Transfer successful
// bonus method
// this method gets info of all accounts in the bank
bank.allInfo(); // o/p : [
//     {
//       accountHolder: 'Johny Depp',
//       accountBalance: 2000,
//       accountNumber: 1001
//     },
//     {
//       accountHolder: 'Amber Heard',
//       accountBalance: 8000,
//       accountNumber: 1002
//     }
//   ]
