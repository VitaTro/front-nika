import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAdminUser,
  fetchAdminUsers,
} from "../../../../redux/admin/operationsAdmin";
import { selectAdminData } from "../../../../redux/admin/selectorsAdmin";

const UsersTab = () => {
  const dispatch = useDispatch();
  const { users } = useSelector(selectAdminData);

  useEffect(() => {
    dispatch(fetchAdminUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteAdminUser(id));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Ім'я</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Роль</TableCell>
            <TableCell>Дії</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={user.id || `user-${index}`}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Button onClick={() => handleDelete(user.id)} color="error">
                  Видалити
                </Button>
                <Button color="primary">Редагувати</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTab;
