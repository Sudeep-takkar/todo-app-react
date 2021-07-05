import { useState } from 'react';
export const useItems = (initialValue = []) => {
    const [items, setItems] = useState(initialValue);
    const [selectedItems, setSelectedItems] = useState(initialValue);
    return {
        selectedItems,
        items,
        addItem: text => {
            if (text !== '') {
                setItems(
                    items.concat({
                        id: Date.now(),
                        text,
                        done: false,
                    })
                );
            }
        },
        handleItemStatus: id => {
            setItems(
                items.map((item, index) => {
                    if (id === item.id) {
                        item.done = !item.done;
                    }
                    return item;
                })
            );
        },
        removeItem: id => {
            setItems(items.filter((item, index) => id !== item.id));
        },
        removeMultipleItems: () => {
            setItems(items.filter((item, index) => !selectedItems.includes(item.id)));
            setSelectedItems([]);
        },
        selectUnselectItems: (id, action) => {
            if (action === 'select') {
                setSelectedItems([...selectedItems, items.filter((item, index) => item.id === id)[0].id]);
            }
            else {
                setSelectedItems(selectedItems.filter((itemId, index) => id !== itemId));
            }
        },
        completeMultipleItems: () => {
            setItems(
                items.map((item, index) => {
                    if (selectedItems.includes(item.id)) {
                        item.done = true;
                    }
                    return item;
                })
            );
            // setItems(items.filter((item, index) => !selectedItems.includes(item.id)));
            setSelectedItems([]);
        }
    };
};

export const useInputValue = (initialValue = "") => {
    const [text, setText] = useState(initialValue);

    return {
        text,
        changeInput: event => setText(event.target.value),
        clearInput: () => setText(""),
        keyInput: (event, callback) => {
            if (event.which === 13 || event.keyCode === 13) {
                callback(text);
                return true;
            }
            return false;
        }
    };
};

export const useDialog = (initialValue = false) => {
    const [isDialogOpen, setDialogOpen] = useState(initialValue);
    const [dialogName, setDialogName] = useState("");
    return {
        isDialogOpen,
        dialogName,
        handleDialogClose: () => {
            setDialogOpen(false);
        },
        handleDialogOpen: (name) => {
            setDialogName(name);
            setDialogOpen(true);
        }
    }
};

export const useAlert = (initialValue = false) => {
    const [isAlertShown, setIsAlertShown] = useState(initialValue);
    return {
        isAlertShown,
        handleAlert: (isOpen) => {
            setIsAlertShown(isOpen);
        }
    }
};