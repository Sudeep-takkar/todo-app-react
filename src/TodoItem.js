import {
    ListItem, Checkbox, IconButton,
    ListItemText, ListItemSecondaryAction,
    Switch, Tooltip,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { DeleteOutlined } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
    listItemText: {
        textDecoration: 'line-through',
        opacity: '0.45'
    }
}));
export default function TodoItem(props) {
    const { divider, onSelectUnselectItem, selected,
        text, done, handleItemStatus, onButtonClick } = props;
    const classes = useStyles();

    return (
        <ListItem divider={divider} className={done ? classes.listItem : ''} selected={selected}>
            <Tooltip title="Select Task">
                <Checkbox
                    onClick={onSelectUnselectItem}
                    checked={selected}
                    disableRipple
                />
            </Tooltip>
            <ListItemText primary={text} className={done ? classes.listItemText : ''} />
            <ListItemSecondaryAction>
                <Tooltip title={done ? 'Incomplete Task' : 'Complete Task'}>
                    <Switch
                        checked={done}
                        onChange={handleItemStatus}
                        color="primary"
                    />
                </Tooltip>
                <Tooltip title="Delete Task">
                    <IconButton aria-label="Delete Todo" onClick={onButtonClick}>
                        <DeleteOutlined />
                    </IconButton>
                </Tooltip>
            </ListItemSecondaryAction>
        </ListItem>
    );
}