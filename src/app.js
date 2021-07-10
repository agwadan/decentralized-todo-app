App = {
  contracts: {},
  load: async () => {
    console.log('App Running...');
    await App.loadWeb3();//----> allows web browser work with the blockchain.
    await App.loadAccount();
    await App.loadContract();
    await App.render();
    //web3.eth.defaultAccount = web3.eth.accounts[0];
  },

  loadWeb3: async () => {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)
    } else {
      window.alert("Please connect to Metamask.")
    }
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum)
      try {
        // Request account access if needed
        await ethereum.enable()
        // Acccounts now exposed
        web3.eth.sendTransaction({/* ... */ })
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = web3.currentProvider
      window.web3 = new Web3(web3.currentProvider)
      // Acccounts always exposed
      web3.eth.sendTransaction({/* ... */ })
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  },

  loadAccount: async () => {
    App.account = await web3.eth.getAccounts()
      .then(
        function (acc) {
          accounts = acc;
          console.log(`Account ----> ${accounts[0]}`);
          return accounts[0];
        });
  },

  loadContract: async () => {
    /* Create a JS version of the smart contract */
    const todoList = await $.getJSON('TodoList.json');
    App.contracts.TodoList = TruffleContract(todoList);
    App.contracts.TodoList.setProvider(App.web3Provider);

    /* Hydrate smart contract with current values from the blockchain */
    App.todoList = await App.contracts.TodoList.deployed();
  },

  render: async () => {
    $('#account').html(`${App.account}`);
  }
}

$(() => {
  $(window).load(() => {
    App.load();
  })
})