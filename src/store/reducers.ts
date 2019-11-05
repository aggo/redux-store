import { initialState } from './store';

export function todosReducer(
    state = initialState,
    action: { type: string, payload: any }
) {
    switch (action.type) {
        case 'ADD_TODO': {
            const todo = action.payload;
            const data = [...state.data, todo];
            return {
                ...state,
                data,
            };
        }
    }
    return state;
}
