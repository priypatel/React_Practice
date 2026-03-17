import { useEffect, useState } from "react";
import axios from "axios";

export default function PaginationExample() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const perPage = 20; // items per page

  // Fetch API (100 items)
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      setData(res.data);
    };
    fetchData();
  }, []);

  const totalPages = Math.ceil(data.length / perPage);

  // Slice data for current page
  const start = (page - 1) * perPage;
  const paginatedData = data.slice(start, start + perPage);

  const goToPage = (num) => {
    if (num >= 1 && num <= totalPages) {
      setPage(num);
    }
  };

  return (
    <div
      style={{ width: "600px", margin: "40px auto", fontFamily: "sans-serif" }}
    >
      <h2>Pagination</h2>

      {/* List */}
      <ul>
        {paginatedData.map((item) => (
          <li key={item.id} style={{ padding: "5px 0" }}>
            {item.id}. {item.title}
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <button disabled={page === 1} onClick={() => goToPage(page - 1)}>
          Previous
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i + 1)}
            style={{
              fontWeight: page === i + 1 ? "bold" : "normal",
              background: page === i + 1 ? "#ddd" : "#fff",
            }}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => goToPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
