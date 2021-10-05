import {
    addToDoListAC,
    changeToDoListFilterAC,
    changeToDoListTitleAC, FilterType,
    removeToDoListAC, setTDLsAC,
    toDoListReducer, ToDoListWithDomainType
} from './todolists-reducer';
import {v1} from 'uuid';

let todolistId1: string
let todolistId2: string

let startState: Array<ToDoListWithDomainType> = []

beforeEach( () => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", status: "all", addedDate: '', order: 1 },
        {id: todolistId2, title: "What to buy", status: "all", addedDate: '', order: 1 }
    ]
})

test('correct todolist should be removed', () => {

    const startState: Array<ToDoListWithDomainType> = [
        {id: todolistId1, title: "What to learn", status: "all", addedDate: '', order: 1 },
        {id: todolistId2, title: "What to buy", status: "all", addedDate: '', order: 1 }
    ]

    const endState = toDoListReducer(startState, removeToDoListAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('set todolists', () => {

    let newTodolistTitle: Array<ToDoListWithDomainType> = [
        {id: todolistId1, title: "Some text", status: "all", addedDate: '', order: 1 },
        {id: todolistId1, title: "Samurai", status: "all", addedDate: '', order: 1 },
        {id: todolistId2, title: "Hello world", status: "completed", addedDate: '', order: 1 }
    ]

    const endState = toDoListReducer(startState, setTDLsAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[1].title).toBe("Samurai");
});

test('correct todolist should be added', () => {

    let newTodolistTitle = "New Todolist";

    const endState = toDoListReducer(startState, addToDoListAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";

    const endState = toDoListReducer(startState, changeToDoListTitleAC(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterType = "completed";

    const endState = toDoListReducer(startState, changeToDoListFilterAC(todolistId2, newFilter));

    expect(endState[0].status).toBe("all");
    expect(endState[1].status).toBe(newFilter);
});
