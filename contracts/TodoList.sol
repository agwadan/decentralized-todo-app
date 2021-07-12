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
    event TaskCompleted(uint256 id, bool completed);

    constructor() public {
        createTask("default task");
    }

    function createTask(string memory _content) public {
        taskCount++;
        tasks[taskCount] = Task(taskCount, _content, false);
        emit TaskCreated(taskCount, _content, false);
    }

    function toggleCompleted(uint256 _id) public {
        Task memory _task = tasks[_id]; //---> Underscore represents a local variable, not state variable
        _task.completed = !_task.completed;
        tasks[_id] = _task;
        emit TaskCompleted(_id, _task.completed);
    }
}
