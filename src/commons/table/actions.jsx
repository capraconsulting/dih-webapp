import React, { PropTypes } from 'react';
import Dropdown from '../DropdownComponent';
import DropdownItem from '../DropdownComponent/DropdownItem';

const Actions = (props) => (
    <div>
        {props.actions.length === 1 &&
            <div
                className="ui icon top right button labeled actions"
                onClick={() => props.actions[0].action(props.selected)}
            >
                <i className={`${props.actions[0].icon} icon`} />
                <span className="text">{props.actions[0].name}</span>
            </div>
        }
        {props.actions.length > 1 &&
            <Dropdown icon="wrench" class="actions" label="Actions">
                {props.actions.map(action =>
                    <DropdownItem
                        disabled={props.selected.length === 0}
                        name={action.name}
                        icon={action.icon}
                        handleClick={() => action.action(props.selected)}
                    />
                )}
            </Dropdown>
        }
    </div>
);

Actions.propTypes = {
    selected: PropTypes.array,
    actions: PropTypes.array
};

export default Actions;
