import React from "react";
import './todo-list-item.css';

export default class TodoListItem extends React.Component {
    // пользуясь новым синтаксисом полей классов
    // такая запис эквивалента this.state = .. внутри конструктора
    // переменная (не функция) в любом случае попадет на сам объект (не прототип)
    // новый синтаксис полей классов для записи функций в стрелочном виде
    // функции попадут не в прототип класса (ф-конструктора), а на сам объект
    // таким образом, удается не потерять контекст this при передачи функции (в события)
        // если задание нового стейта (состояние) отталкивается на его прошло состояние (измененное)
        // в setState передается -> функция с текущим {state} в аргументе, а не сам с измененной частью {state}
        // это связано с тем, что setState() работает асинхронно, и в некоторых случаях возможны некорректные срабатывания
        // если новое state никак не зависит от предыдущего state (НЕ ОСНОВАНО НА ПРОШЛОМ СТЕЙТЕ)
        // то в setState можно передавать простой объект с изменениями в {state}

    render() {
        const {label, important, done, onDeleted, onToggleImportant, onToggleDone} = this.props;
        let classNames = 'todo-list-item';
        if (important) classNames += ' important';
        if (done) classNames += ' done';

        return (
            <span className={classNames}>
            <span className='todo-list-item-label' onClick={ onToggleDone }>
                { label }
            </span>
            <button type="button" className="btn btn-outline-success btn-sm float-end" onClick={ onToggleImportant }>
                <i className="fa fa-exclamation" />
            </button>
            <button type="button" className="btn btn-outline-danger btn-sm float-end" onClick={ onDeleted }>
                -
            </button>
        </span>
        );
    }
}