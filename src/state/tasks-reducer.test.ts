import {
    addNewTaskAC,
    addNewToDoListTasksArrayAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC, setTasksAC,
    tasksReducer
} from './tasks-reducer';
import {TasksStateType} from '../App';
import {addToDoListAC} from "./todolists-reducer";
import {TaskStatuses} from "../api/todolists-api";

let startState: TasksStateType = { };

beforeEach( () => {
    startState = {
        "todolistId1": [
            { id: "1", title: "CSS", status: TaskStatuses.New, startDate: '', priority: 0, order: 1, deadline: '', description: '', addedDate: '', todoListId: '' },
            { id: "2", title: "JS", status: TaskStatuses.Completed, startDate: '', priority: 0, order: 1, deadline: '', description: '', addedDate: '', todoListId: '' },
            { id: "3", title: "React", status: TaskStatuses.New, startDate: '', priority: 0, order: 1, deadline: '', description: '', addedDate: '', todoListId: '' }
        ],
        "todolistId2": [
            { id: "1", title: "bread", status: TaskStatuses.New, startDate: '', priority: 0, order: 1, deadline: '', description: '', addedDate: '', todoListId: '' },
            { id: "2", title: "milk", status: TaskStatuses.Completed, startDate: '', priority: 0, order: 1, deadline: '', description: '', addedDate: '', todoListId: '' },
            { id: "3", title: "tea", status: TaskStatuses.New, startDate: '', priority: 0, order: 1, deadline: '', description: '', addedDate: '', todoListId: '' }
        ]
    };
})

test('tasks should be set', () => {
    const action = setTasksAC( "todolistId2", [
        { id: "1", title: "CSS", status: TaskStatuses.New, startDate: '', priority: 0, order: 1, deadline: '', description: '', addedDate: '', todoListId: ''  },
        { id: "2", title: "JS", status: TaskStatuses.Completed, startDate: '', priority: 0, order: 1, deadline: '', description: '', addedDate: '', todoListId: ''  },
        { id: "3", title: "React", status: TaskStatuses.New, startDate: '', priority: 0, order: 1, deadline: '', description: '', addedDate: '', todoListId: ''  }
    ]);

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][0].title).toBe('CSS')
    expect(endState["todolistId2"].length).toBe(3)
})

test('set todolists with new empty task array', () => {
    const action = addNewToDoListTasksArrayAC( "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"]).toStrictEqual([])
})

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC( "todolistId2", "2");

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            { id: "1", title: "CSS", status: TaskStatuses.New, startDate: '', priority: 0, order: 1, deadline: '', description: '', addedDate: '', todoListId: ''  },
            { id: "2", title: "JS", status: TaskStatuses.Completed, startDate: '', priority: 0, order: 1, deadline: '', description: '', addedDate: '', todoListId: ''  },
            { id: "3", title: "React", status: TaskStatuses.New, startDate: '', priority: 0, order: 1, deadline: '', description: '', addedDate: '', todoListId: ''  }
        ],
        "todolistId2": [
            { id: "1", title: "bread", status: TaskStatuses.New, startDate: '', priority: 0, order: 1, deadline: '', description: '', addedDate: '', todoListId: ''  },
            { id: "3", title: "tea", status: TaskStatuses.New, startDate: '', priority: 0, order: 1, deadline: '', description: '', addedDate: '', todoListId: ''  }
        ]
    });

});


test('correct task should be added to correct array', () => {

    const action = addNewTaskAC("todolistId2", "juce");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe('juce');
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
})

test('status of specified task should be changed', () => {

    const action = changeTaskStatusAC("todolistId2",  "2", TaskStatuses.New);

    const endState = tasksReducer(startState, action)

    expect(startState["todolistId2"][1].status).toBe(TaskStatuses.Completed);
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
    expect(endState["todolistId2"][2].status).toBe(TaskStatuses.New);
});

test('title of specified task should be changed', () => {

    const action = changeTaskTitleAC("todolistId2",  "3", 'Cheese');

    const endState = tasksReducer(startState, action)

    expect(startState["todolistId2"][2].title).toBe('tea');
    expect(endState["todolistId2"][0].title).toBe('bread');
    expect(endState["todolistId2"][1].title).toBe('milk');
    expect(endState["todolistId2"][2].title).toBe('Cheese');
});

test('new array should be added when new todolist is added', () => {

    const action = addToDoListAC("new todolist");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

