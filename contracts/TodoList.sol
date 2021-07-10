pragma solidity >=0.4.22 <0.9.0;

/* Initializing the contract */
contract TodoList {
    uint256 public taskCount = 0; //-------------------------> State variables -> represent the state of the smart contract on the blockchain

    /* Model for the tasks. */
    struct Task {
        uint256 id;
        string content;
        bool completed;
    }

    mapping(uint256 => Task) public tasks;

    event TaskCreated(uint256 id, string content, bool completed);

    constructor() public {
        createTask("default task");
    }

    function createTask(string memory _content) public {
        taskCount++;
        tasks[taskCount] = Task(taskCount, _content, false);
        emit TaskCreated(taskCount, _content, false);
    }
}
