export class Store {
    /**
     1. For this example, state looks like{
          todos: {
            data: [],
            loaded: false,
            loading: false,
          }
        }
     2. we use loaded/loading because when we perform async stuff
     such as fetching json over http, we want to know what step we are at
     */
    private state: { [key: string]: any };
    private reducers: { [key: string]: Function };
    private subscribers: Function[];

    constructor(reducers = {}, init = {}) {
        this.reducers = reducers;
        this.state = this.reduce(init, {});
        this.subscribers = [];
    }

    get value() {
        return this.state;
    }

    dispatch(action) {
        // Manual update of the state, without reducer
        // this.state = {
        //     todos: {
        //         data: [...this.state.todos.data, action.payload],
        //         loaded: true,
        //         loading: false,
        //     },
        // };
        this.state = this.reduce(this.state, action);
        // we then inform our subscribers that something has changed
        // subscribers are just functions that we call
        this.subscribers.forEach(fn => {
            fn(this.value);
        });
    }

    private reduce(state, action) {
        const newState = {};
        // iterate over all keys of this.reducers = slice-names of the state
        for (const prop in this.reducers) {
            // for each such slice name (prop),
            // the new value of the slice (newState[prop])
            // is given by the result of using the proper reducer (this.reducers[prop])
            // to reduce the old state by an action ( (state[prop],action))
            newState[prop] = this.reducers[prop](state[prop], action);
        }
        return newState;
    }

    // "give me data when it's available or when it changes"
    subscribe(fn) {
        this.subscribers = [...this.subscribers, fn];
        // send current state to subscriber on first subscribe
        fn(this.value);
        // function closure which when invoked unsubscribes us (removes us
        // from the list of subscribers)
        // use as:
        // unsubscribe = store.subscribe(state=>{});
        // destroyButton.on('click', unsubscribe, false);
        return () => {
            this.subscribers = this.subscribers.filter(sub => sub !== fn);
        };
    }
}
