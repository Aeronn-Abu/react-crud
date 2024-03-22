import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    TextField
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

function CrudTable() {
  const [data, setData] = useState([]);
  const [inputItem, setInputItem] = useState({
    title: "",
    body: ""
  });
  const [itemToEdit, setItemToEdit] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then((res) => {
      setData(res.data);
    })
    .catch(err => {
      console.log(err);
    });
  }, []);

  function saveItem(e) {
    e.preventDefault();
    
    console.log("item: ", inputItem);
    axios.post("https://jsonplaceholder.typicode.com/posts", inputItem)
    .then((res) => {
      const newItem = res.data;
      
      setData([...data, newItem]);
    })
    .catch(err => {
      console.log(err);
    });
  }

  function editItem(item) {
    setItemToEdit(item);
    setIsEditing(true);
  }

  function saveEdit(e) {
    e.preventDefault(e);
    
    axios.put(`https://jsonplaceholder.typicode.com/posts/${itemToEdit.id}`, inputItem)
    .then((res) => {
      const updatedItem = res.data;
      const newData = data.map((item) => item.id === updatedItem.id ? updatedItem : item);
      setData(newData);
      setIsEditing(false);
    })
    .catch(err => {
      console.log(err);
    });
  }

  function cancelEdit() {
    setIsEditing(false);
  }

  function deleteItem(itemId) {
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${itemId}`)
    .then(() => {
      const newData = data.filter((item) => item.id !== itemId);
      setData(newData);
    })
    .catch(err => {
      console.log(err);
    });
  }

  return (
    <div className="crud-container">
      <form className="crud-form" onSubmit={isEditing ? saveEdit : saveItem}>
          <TextField 
            size="small"
            label="Title"
            value={isEditing ? itemToEdit.title : ""}
            onChange={e => setInputItem({title: e.target.value})}
          />
          <TextField 
            size="small"
            label="Body"
            value={isEditing ? itemToEdit.body : ""}
            onChange={e => setInputItem({...inputItem, body: e.target.value})}
          />
          <Button variant="contained" type="submit">
            {isEditing ? "Update" : "Add"}
          </Button>
          {isEditing && (
            <Button variant="outlined" onClick={cancelEdit}>
              Cancel
            </Button>
          )}
      </form>
      <TableContainer component={Paper}>
        <Table aria-label="crud table">
          <TableHead>
            <TableRow>
              <TableCell align="left">ID</TableCell>
              <TableCell align="left">TITLE</TableCell>
              <TableCell align="left">BODY</TableCell>
              <TableCell align="left">ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow
                key={item.id}
              >
                <TableCell align="left">{item.id}</TableCell>
                <TableCell align="left">{item.title}</TableCell>
                <TableCell align="left">{item.body}</TableCell>
                <TableCell>
                  <div className="actions">
                    <Button variant="contained" onClick={() => editItem(item)}>
                      <Edit />
                    </Button>
                    <Button variant="contained" color="error" onClick={() => deleteItem(item.id)}>
                      <Delete />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default CrudTable