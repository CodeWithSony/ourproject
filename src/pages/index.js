import { useState, useEffect } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    id: "",
  });

  const [value, setValue] = useState([]); // Initialize as an array

  const getData = async () => {
    console.log("Fetching data...");
    try {
      const response = await fetch(`http://localhost:3000/allpost`); // Fetch data
      const data = await response.json(); // Parse JSON
      console.log("Fetched data:", data); // Log data to verify structure
      setValue(data); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { title, body, id } = formData;

      // Create the data object using the destructured values
      const data = { title, body, id };
      console.log(data, "data");

      const options = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      };

      await fetch(`http://localhost:3000/allpost`, options);
      getData(); // Refresh data
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <h1>Input Form</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              style={{
                marginLeft: "10px",
                padding: "5px",
                width: "300px",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="body">Body:</label>
            <textarea
              id="body"
              name="body"
              value={formData.body}
              onChange={handleChange}
              rows="4"
              cols="50"
              required
              style={{
                marginLeft: "10px",
                padding: "5px",
                width: "300px",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="id">User ID:</label>
            <input
              type="number"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleChange}
              required
              style={{
                marginLeft: "10px",
                padding: "5px",
                width: "300px",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#0070f3",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
        </form>
      </div>

      <br />
      <h1>All Posts</h1>
      <table border={2}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {value?.map((element) => (
            <tr key={element.id}>
              <td>{element.id}</td>
              <td>{element.title}</td>
              <td>{element.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
