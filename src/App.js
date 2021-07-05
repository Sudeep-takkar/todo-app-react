import { makeStyles } from '@material-ui/core/styles';
import { useItems, useInputValue, useDialog, useAlert } from './TodoUtils';
import DialogComponent from './Dialog';
import {
  IconButton,
  InputAdornment, Box,
  AppBar, Toolbar, Typography, Paper, Button, TextField, Grid
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { CheckCircleOutline, Send } from '@material-ui/icons';

import TodoList from './TodoList';

const useStyles = makeStyles(() => ({
  appContainer: {
    padding: 0,
    margin: 0,
    backgroundColor: '#fafafa'
  },
  appBar: {
    height: 64
  },
  textFieldContainer: {
    margin: 16,
    padding: 16,
    display: 'flex',
    justifyContent: 'center'
  },
  btn: {
    marginLeft: 16
  }
}));

function App() {
  const { items, selectedItems, addItem, handleItemStatus,
    removeItem, removeMultipleItems, selectUnselectItems, completeMultipleItems } = useItems();
  const { text, changeInput, clearInput, keyInput } = useInputValue();
  const { isDialogOpen, dialogName, handleDialogClose, handleDialogOpen } = useDialog();
  const { isAlertShown, handleAlert } = useAlert();

  const classes = useStyles();

  const clearInputAndAddItem = () => {
    clearInput();
    addItem(text);
  }

  const removeSelectedItems = () => {
    handleClose();
    removeMultipleItems();
  };

  const completeSelectedItems = () => {
    handleClose();
    completeMultipleItems();
  };

  const handleClose = () => {
    handleDialogClose();
    handleAlert(true);
    setTimeout(() => {
      handleAlert(false);
    }, 2000);
  }

  return (
    <>
      <Paper
        elevation={0}
        className={classes.appContainer}
      >
        <AppBar color="primary" position="static" className={classes.appBar}>
          <Toolbar className={classes.appBar}>
            <Typography color="inherit">TODO APP</Typography>
          </Toolbar>
        </AppBar>
        <Paper className={classes.textFieldContainer}>
          <Grid xs={6} md={6} item>
            <TextField
              fullWidth
              variant="outlined"
              label="Add Item"
              value={text}
              onChange={e => changeInput(e)}
              onKeyDown={e => keyInput(e, clearInputAndAddItem)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      style={{ padding: 0 }}
                      aria-label="add item button"
                      onClick={clearInputAndAddItem}
                      disabled={!text}
                    >
                      <Send />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Paper>
        <Box display="flex" justifyContent="space-between">
          <div>
            <Button color="secondary"
              variant="outlined"
              className={classes.btn}
              disabled={!selectedItems.length}
              onClick={() => handleDialogOpen('delete')}
            >
              Delete Item(s)
            </Button>
            <Button color="secondary"
              variant="outlined"
              className={classes.btn}
              disabled={!selectedItems.length}
              onClick={() => handleDialogOpen('complete')}
            >
              Complete Item(s)
            </Button>
          </div>
          <Grid xs={7} md={7} item style={{ visibility: `${isAlertShown ? 'visible' : 'hidden'}` }}>
            <Box display="flex" justifyContent="flex-start">
              <Alert variant="filled" iconMapping={{ success: <CheckCircleOutline fontSize="inherit" /> }}>
                {`The Selected Item(s) has been successfully ${dialogName}d.`}
              </Alert>
            </Box>
          </Grid>
        </Box>
        <TodoList
          items={items}
          handleItemStatus={id => handleItemStatus(id)}
          onDeleteItem={id => removeItem(id)}
          onSelectUnselectItem={(id, action) => selectUnselectItems(id, action)}
          selectedItems={selectedItems}
        />
      </Paper>
      <DialogComponent open={isDialogOpen}
        dialogName={dialogName}
        removeMultipleItems={removeSelectedItems}
        handleDialogClose={handleDialogClose}
        completeMultipleItems={completeSelectedItems} />
    </>
  );
}

export default App;