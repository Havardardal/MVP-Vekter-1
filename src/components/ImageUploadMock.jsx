export default function ImageUploadMock({ image, onUpload, onRemove }) {
  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    // Mock: store filename instead of real base64
    onUpload(`image_uploaded:${file.name}`);
    // Reset input so the same file can be re-selected if needed
    e.target.value = "";
  }

  if (image) {
    const filename = image.replace("image_uploaded:", "");
    return (
      <div className="image-upload mock-uploaded">
        <span className="image-icon">📷</span>
        <span className="image-filename">{filename}</span>
        <button type="button" className="image-remove-btn" onClick={onRemove}>
          Fjern
        </button>
      </div>
    );
  }

  return (
    <label className="image-upload mock-empty">
      <span className="image-icon">📷</span>
      <span>Last opp bilde</span>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </label>
  );
}
