function SearchBar({ value, onChange, onSearch }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch();
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Buscar por marca, modelo ou ID..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      <button type="submit" className="btn btn-secondary">
        Buscar
      </button>
    </form>
  );
}

export default SearchBar;
