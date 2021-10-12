import {addToDoListAC, toDoListReducer, ToDoListWithDomainType} from "../features/ToDoListsAll/todolists-reducer";
import {LocalTasksType, removeTodolistAC, tasksReducer} from "../features/ToDoListsAll/tasks-reducer";
import {TaskStatuses} from "../api/todolists-api";

test('ids should be equals', () => {
    const startTasksState: LocalTasksType = {};
    const startTodolistsState: Array<ToDoListWithDomainType> = [];

    const action = addToDoListAC({"id": 'todolistId2', "title": 'new todolist',
        "addedDate": 'string', "order": 1});

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = toDoListReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.id);
    expect(idFromTodolists).toBe(action.payload.id);
});


test('property with todolistId should be deleted', () => {
    const startState: LocalTasksType = {
        "todolistId1": [
            { id: "1", entityStatus: 'idle', title: "CSS", status: TaskStatuses.New, startDate: '', priority: 0, order: 1, deadline: '', description: '', addedDate: '', todoListId: '' },
            { id: "2", entityStatus: 'idle', title: "JS", status: TaskStatuses.Completed, startDate: '', priority: 0, order: 1, deadline: '', description: '', addedDate: '', todoListId: ''  },
            { id: "3", entityStatus: 'idle', title: "React", status: TaskStatuses.New, startDate: '', priority: 0, order: 1, deadline: '', description: '', addedDate: '', todoListId: ''  }
        ],
        "todolistId2": [
            { id: "1", entityStatus: 'idle', title: "bread", status: TaskStatuses.New, startDate: '', priority: 0, order: 1, deadline: '', description: '', addedDate: '', todoListId: ''  },
            { id: "2", entityStatus: 'idle', title: "milk", status: TaskStatuses.Completed, startDate: '', priority: 0, order: 1, deadline: '', description: '', addedDate: '', todoListId: ''  },
            { id: "3", entityStatus: 'idle', title: "tea", status: TaskStatuses.New, startDate: '', priority: 0, order: 1, deadline: '', description: '', addedDate: '', todoListId: '' }
        ]
    };

    const action = removeTodolistAC("todolistId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});

