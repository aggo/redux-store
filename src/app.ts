import * as fromStore from './store';

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

function renderTodos(state) {
// build a list of the todos and show how many there are
    number.innerText = state.todos.data.length;
    todoList.innerHTML = state.todos.data.map(d =>
        '<li>' + d.label + '</li>'
    );
}

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
        // build action for dispatch
        const action: Action = {
            type: 'ADD_TODO',
            payload: payload
        };
        // dispatch action
        store.dispatch(action);
        // reset input
        input.value = '';
    },
    false
);

// todo implement something here as well
todoList.addEventListener('click', function (event) {
    const target = event.target as HTMLButtonElement;
    if (target.nodeName.toLowerCase() === 'button') {
        console.log(target);
    }
});

// unsubscribe when the button is clicked
destroy.addEventListener('click', (event) => {
    unsubscribe();
});

// log store changes
store.subscribe(state => console.log('STATE:::', state));
