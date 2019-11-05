interface Action {
    type: string;
    payload?: any;
}

// action constants
export const ADD_TODO = '[Todo] Add Todo';
export const REMOVE_TODO = '[Todo] Remove Todo';

// action creators
export class AddTodo implements Action {
    readonly type = ADD_TODO;

    constructor(payload: any) {
    }
}

export class RemoveTodo implements Action {
    readonly type = REMOVE_TODO;

    constructor(payload: any) {
    }
}
