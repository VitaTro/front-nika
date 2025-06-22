import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAdminUser,
  fetchAdminUsers,
} from "../../../../redux/admin/operationsAdmin";
import { selectAdminData } from "../../../../redux/admin/selectorsAdmin";

const UsersTab = () => {
  const dispatch = useDispatch();
  const { users } = useSelector(selectAdminData);
  const isMobile = useMediaQuery("(max-width: 768px)");
  useEffect(() => {
    dispatch(fetchAdminUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteAdminUser(id));
  };

  return isMobile ? (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {users.map((user, index) => (
        <Paper key={user.id || `user-${index}`} sx={{ padding: 2 }}>
          <div>
            <strong>Ім’я:</strong> {user.username}
          </div>
          <div>
            <strong>Email:</strong> {user.email}
          </div>
          <div>
            <strong>Роль:</strong> {user.role}
          </div>
          <Box mt={1}>
            <Button
              onClick={() => handleDelete(user.id)}
              color="error"
              size="small"
            >
              Видалити
            </Button>
            <Button color="primary" size="small" sx={{ ml: 1 }}>
              Редагувати
            </Button>
          </Box>
        </Paper>
      ))}
    </Box>
  ) : (
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
