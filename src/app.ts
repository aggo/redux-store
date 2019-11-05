import * as fromStore from './store';
import { renderTodos } from './utils';

const input = document.querySelector('input') as HTMLInputElement;
const addButton = document.querySelector('.add-button') as HTMLButtonElement;
const destroy = document.querySelector('.unsubscribe') as HTMLButtonElement;
const todoList = document.querySelector('.todos') as HTMLLIElement;
let number = document.querySelector('.number') as HTMLLIElement;

const store = new fromStore.Store(
    {},
    {todos: [{label: 'Eat pizza', complete: false}]}
);

console.log(store.value);

// save returned value from store.subscribe to be able to unsubscribe
const unsubscribe = store.subscribe((state) => {
    renderTodos(state);
});


addButton.addEventListener(
    'click',
    () => {
        // get input value
        if (!input.value.trim()) {
            return;
        }
        // build payload for action
        const payload = {label: input.value, complete: false};
        // build action for dispatch and dispatch action
        store.dispatch(new fromStore.AddTodo(payload));
        // reset input
        input.value = '';
    },
    false
);

todoList.addEventListener('click', function (event) {
    const target = event.target as HTMLButtonElement;
    if (target.nodeName.toLowerCase() === 'button') {
        const todo = JSON.parse(target.getAttribute('data-todo') as any);
        store.dispatch(new fromStore.RemoveTodo(todo));
    }
});

// unsubscribe when the button is clicked
destroy.addEventListener('click', (event) => {
    unsubscribe();
});

// log store changes
store.subscribe(state => console.log('STATE:::', state));
