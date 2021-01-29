import React, { useState } from "react";

const FormContainer = () => {
  const [body, setBody] = useState("");
  const handleChange = (e) => {
    setBody(e.target.value);
  };
  return (
    <div>
      <form>
        <input
          type="text"
          value={body}
          placeholder="Enter text"
          onChange={handleChange}
        />
      </form>
      <button type="submit">つぶやく</button>
    </div>
  );
};

export default FormContainer;
