import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFinanceSettings,
  updateFinanceSettings,
} from "../../../../../redux/finance/settings/operationSettings";
import { selectFinanceSettings } from "../../../../../redux/finance/settings/selectorsSettings";

const FinanceSettings = () => {
  const dispatch = useDispatch();
  const settings = useSelector(selectFinanceSettings);
  const [editableSettings, setEditableSettings] = useState(settings);

  useEffect(() => {
    dispatch(fetchFinanceSettings());
  }, [dispatch]);

  useEffect(() => {
    setEditableSettings(settings);
  }, [settings]);

  const handleChange = (event) => {
    setEditableSettings({
      ...editableSettings,
      [event.target.name]: event.target.value,
    });
  };

  const handleSave = () => {
    dispatch(updateFinanceSettings(editableSettings));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Параметр</TableCell>
            <TableCell>Значення</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {settings && (
            <>
              <TableRow>
                <TableCell>Ставка податку (%)</TableCell>
                <TableCell>
                  <TextField
                    name="taxRate"
                    type="number"
                    value={editableSettings.taxRate || ""}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Операційні витрати</TableCell>
                <TableCell>
                  <TextField
                    name="operatingCosts"
                    type="number"
                    value={editableSettings.operatingCosts || ""}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Бюджет закупівлі</TableCell>
                <TableCell>
                  <TextField
                    name="budgetForProcurement"
                    type="number"
                    value={editableSettings.budgetForProcurement || ""}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </TableCell>
              </TableRow>
            </>
          )}
        </TableBody>
      </Table>
      <Button variant="contained" color="primary" onClick={handleSave}>
        Зберегти зміни
      </Button>
    </TableContainer>
  );
};

export default FinanceSettings;
