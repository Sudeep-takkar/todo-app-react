import { Paper, List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TodoItem from './TodoItem';

const useStyles = makeStyles(() => ({
    paperContainer: { margin: 16 },
}));
export default function TodoList(props) {
    const { items, handleItemStatus, onDeleteItem, onSelectUnselectItem, selectedItems } = props;
    const handleCheckboxAction = (id) => {
        let action = selectedItems.includes(id) ? 'unselect' : 'select';
        onSelectUnselectItem(id, action);
    }
    const classes = useStyles();

    return (
        <>
            {items.length > 0 && (
                <Paper className={classes.paperContainer}>
                    <List>
                        {items.map((item, index) => (
                            <TodoItem
                                {...item}
                                key={`Item_${item.id}`}
                                divider={index !== items.length - 1}
                                onButtonClick={() => onDeleteItem(item.id)}
                                handleItemStatus={() => handleItemStatus(item.id)}
                                onSelectUnselectItem={() => handleCheckboxAction(item.id)}
                                selected={selectedItems ? selectedItems.includes(item.id) : false}
                            />
                        ))}
                    </List>
                </Paper>
            )}
        </>
    )
}