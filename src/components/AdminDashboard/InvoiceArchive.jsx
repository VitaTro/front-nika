import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Link,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "../../redux/axiosConfig";
const InvoiceArchive = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get("/api/admin/invoices");
        setInvoices(response.data);
      } catch (error) {
        console.error("❌ Не вдалося отримати інвойси:", error);
      }
    };
    fetchInvoices();
  }, []);
  const groupByMonth = (invoicesArray) => {
    const grouped = {};
    invoicesArray.forEach((inv) => {
      const date = new Date(inv.issueDate);
      const month = date.toLocaleString("uk-UA", {
        month: "long",
        year: "numeric",
      }); // Наприклад: "Червень 2025"

      if (!grouped[month]) grouped[month] = [];
      grouped[month].push(inv);
    });
    return grouped;
  };

  const groupedInvoices = groupByMonth(invoices);

  const buildPdfLink = (invoice) =>
    `/invoices/all/${invoice.invoiceNumber.replace(/\//g, "_")}_${
      invoice.invoiceType
    }.pdf`;

  return (
    <div style={{ marginTop: "16px" }}>
      <Typography variant="h5" gutterBottom>
        📂 Архів інвойсів
      </Typography>
      {Object.entries(groupedInvoices).map(([month, invoices]) => (
        <Accordion key={month} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{month}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {invoices.map((inv) => (
                <ListItem
                  key={inv._id}
                  divider
                  secondaryAction={
                    <Link
                      href={buildPdfLink(inv)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      📥 Завантажити PDF
                    </Link>
                  }
                >
                  <Typography>
                    <strong>{inv.invoiceNumber}</strong> — {inv.totalAmount} zł
                    —{" "}
                    {inv.buyerType === "anonim"
                      ? "Анонім"
                      : "Підприємець / Компанія"}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default InvoiceArchive;
