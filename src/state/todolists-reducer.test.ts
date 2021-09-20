import {
    addToDoList,
    changeToDoListFilter,
    changeToDoListTitle, FilterType,
    removeToDoList,
    toDoListReducer, ToDoListWithStatusType
} from './todolists-reducer';
import {v1} from 'uuid';

let todolistId1: string
let todolistId2: string

let startState: Array<ToDoListWithStatusType> = []

beforeEach( () => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", status: "all", addedDate: '', order: 1 },
        {id: todolistId2, title: "What to buy", status: "all", addedDate: '', order: 1 }
    ]
})

test('correct todolist should be removed', () => {

    const startState: Array<ToDoListWithStatusType> = [
        {id: todolistId1, title: "What to learn", status: "all", addedDate: '', order: 1 },
        {id: todolistId2, title: "What to buy", status: "all", addedDate: '', order: 1 }
    ]

    const endState = toDoListReducer(startState, removeToDoList(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {

    let newTodolistTitle = "New Todolist";

    const endState = toDoListReducer(startState, addToDoList(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";

    const endState = toDoListReducer(startState, changeToDoListTitle(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterType = "completed";

    const endState = toDoListReducer(startState, changeToDoListFilter(todolistId2, newFilter));

    expect(endState[0].status).toBe("all");
    expect(endState[1].status).toBe(newFilter);
});
