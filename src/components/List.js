import * as React from 'react';

const List = ({ id, title, checked, removeItem, editItem, checkBoxItem }) => {
    return (
        <div className="list-item">
            <div className='check-list'>
                <input className='checkbox-btn' type='checkbox'
                    checked={checked}
                    onChange={() => checkBoxItem(id)}
                />
                <p className="title">{title}</p>
            </div>
            <div className="btn-container">
                <button onClick={() => editItem(id)}>Edit</button>
                <button onClick={() => removeItem(id)}>Delete</button>
            </div>
        </div>
    )
}

export default List;