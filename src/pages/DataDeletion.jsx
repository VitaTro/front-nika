export default function DataDeletion() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Data Deletion Instructions</h1>
      <p>
        To delete your account and all associated data, please log in to your
        profile and use the delete option.
      </p>
      <p>Alternatively, you can request data deletion by contacting us at:</p>
      <p>
        <strong>huping.nika.gold@gmail.com</strong>
      </p>
      <p>
        Automated deletion endpoint (for developers):
        <code>DELETE /api/user/profile</code>
      </p>
    </div>
  );
}
