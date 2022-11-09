import React from "react";
import './item-status-filter.css';

export default class ItemStatusFilter extends React.Component {
    state = {
        buttons: [
            {label: 'All', name: 'all'},
            {label: 'Active', name: 'active'},
            {label: 'Done', name: 'done'},
        ],
        filter: 'All'
    };
    onFilterChange(filter) {
        this.setState({filter: filter});
        this.props.onFilterChange(filter);
    };
    render() {
        const filter = this.state.filter;
        const elements = this.state.buttons.map(({name, label}) => {
            let classMix = (name.toLowerCase() === filter.toLowerCase()) ? ' btn-info' : ' btn-outline-secondary';
            return (
                <button type='button' key={name} className={`btn ${classMix}`}
                onClick={() => {this.onFilterChange(name.toLowerCase())}}>{label}</button>
            );
        })
        return (
            <div className='btn-group'>
                {elements}
            </div>
        );
    }
}