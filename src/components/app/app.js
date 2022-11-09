import React from "react";
import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import ItemStatusFilter from "../item-status-filter";
import TodoList from "../todo-list";
import ItemAddForm from "../item-add-form";
import './app.css'

export default class App extends React.Component {
    minId = 100;
    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Build React App'),
            this.createTodoItem('Walking throw the streets')
        ],
        term: '',
        filter: 'all'
    };
    createTodoItem (label) {
        return {
            id: this.minId++,
            label: label,
            important: false,
            done: false
        };
    };
    deleteItem = (id) => {
        this.setState(({todoData}) => {
            const idx = todoData.findIndex(el => el.id === id);
            // нельзя менять существующий СТЕЙТ - поэтому создаем новый массив из todoData
            // и уже его записываем в новый СТЕЙТ
            const before = todoData.slice(0, idx);
            const after = todoData.slice(idx + 1);
            const slicedArr = [...before, ...after];
            return {
                todoData: slicedArr
            };
        });
    };
    addItem = (text) => {
        this.setState(({todoData}) => {
            const newItem = this.createTodoItem(text);
            const pushedArr = [...todoData, newItem];
            return {
                todoData: pushedArr
            };
        })
    };
    toggleProperty(arr, id, prop) {
        const idx = arr.findIndex(el => el.id === id);
        const oldItem = arr[idx];
        const newItem = {...oldItem, [prop]: !oldItem[prop]};
        return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
    }
    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            };
        });
    };
    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            };
        });
    };
    filter(items, filter) {
        switch (filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter(item => item.done);
            default:
                return items;
        }
    };
    onFilterChange = (filter) => {
        this.setState({filter: filter});
    };
    search(items, term) {
        if (!term) return items;
        else return items.filter(item => item.label.toLowerCase().includes(term.toLowerCase()));
    };
    onSearchChange = (term) => {
        this.setState({term: term});
    };
    render() {
        const {todoData, term, filter} = this.state;
        const visibleItems = this.filter(this.search(todoData, term), filter);
        const doneCount = todoData.filter(item => item.done).length;
        const todoCount = todoData.length - doneCount;
        return (
            <div>
                <AppHeader todo={todoCount} done={doneCount} />
                <div className='top-panel d-flex'>
                    <SearchPanel onSearchChange={this.onSearchChange} />
                    <ItemStatusFilter onFilterChange={this.onFilterChange} />
                </div>
                <TodoList todos={visibleItems} onDeleted={this.deleteItem}
                          onToggleImportant={this.onToggleImportant} onToggleDone={this.onToggleDone} />
                <ItemAddForm onAdd={this.addItem} />
            </div>
        );
    }
}