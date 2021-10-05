import {TasksStateType} from "../AppWithUseState";
import {addToDoListAC, toDoListReducer, ToDoListWithDomainType} from "./todolists-reducer";
import {removeTodolistAC, tasksReducer} from "./tasks-reducer";
import {TaskStatuses} from "../api/todolists-api";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<ToDoListWithDomainType> = [];

    const action = addToDoListAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = toDoListReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.tdlID);
    expect(idFromTodolists).toBe(action.tdlID);
});


test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", status: TaskStatuses.New, startDate: '', priority: 0, order: 1, deadline: '', description: '', addedDate: '', todoListId: '' },
            { id: "2", title: "JS", status: TaskStatuses.Completed, startDate: '', priority: 0, order: 1, deadline: '', description: '', addedDate: '', todoListId: ''  },
            { id: "3", title: "React", status: TaskStatuses.New, startDate: '', priority: 0, order: 1, deadline: '', description: '', addedDate: '', todoListId: ''  }
        ],
        "todolistId2": [
            { id: "1", title: "bread", status: TaskStatuses.New, startDate: '', priority: 0, order: 1, deadline: '', description: '', addedDate: '', todoListId: ''  },
            { id: "2", title: "milk", status: TaskStatuses.Completed, startDate: '', priority: 0, order: 1, deadline: '', description: '', addedDate: '', todoListId: ''  },
            { id: "3", title: "tea", status: TaskStatuses.New, startDate: '', priority: 0, order: 1, deadline: '', description: '', addedDate: '', todoListId: '' }
        ]
    };

    const action = removeTodolistAC("todolistId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});

