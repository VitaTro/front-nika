const InvoicePreview = ({ invoiceData }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "20px", width: "600px" }}>
      <h2>FAKTURA VAT: {invoiceData.invoiceNumber}</h2>
      <p>
        <strong>Data wystawienia:</strong> {invoiceData.issueDate}
      </p>
      <p>
        <strong>Metoda płatności:</strong> {invoiceData.paymentMethod}
      </p>
      <p>
        <strong>Kwota brutto:</strong> {invoiceData.totalAmount} PLN
      </p>
      <hr />
      <h3>Sprzedawca</h3>
      <p>Nika Gold - Vitaliia Troian</p>
      <p>NIP: 9121950449</p>
      <p>ul. Świeradowska 51/57, 50-559 Wrocław</p>
      <hr />
      <h3>Nabywca</h3>
      <p>{invoiceData.buyerName}</p>
      <p>{invoiceData.buyerAddress}</p>
      {invoiceData.buyerNIP && <p>NIP: {invoiceData.buyerNIP}</p>}
      <hr />
      <h3>Produkty</h3>
      <table border="1" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Lp</th>
            <th>Nazwa</th>
            <th>Ilość</th>
            <th>Cena Netto</th>
            <th>VAT</th>
            <th>Wartość Brutto</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.items.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.priceNetto} PLN</td>
              <td>{item.vat}%</td>
              <td>{item.priceBrutto} PLN</td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr />
      <p>
        <strong>Razem brutto:</strong> {invoiceData.totalAmount} PLN
      </p>
      <p>
        <strong>Kwota VAT:</strong> {invoiceData.taxAmount} PLN
      </p>
      <hr />
      <p>
        <strong>Wystawił(a):</strong> AUTOMAT Nika Gold - Vitaliia Troian
      </p>
      <p>
        <strong>Odebrał(a):</strong> ________________________
      </p>
    </div>
  );
};

export default InvoicePreview;
