import { useEffect, useState } from "react";
import logo from "./logo.svg";

function App() {
  const { search, animals } = useAnimal();
  return (
    <main>
      <div className="navbar flex">
        <h1>Animal Farm</h1>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact us</li>
        </ul>
      </div>
      <div className="content">
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => {
            search(e.target.value);
          }}
          className="textArea"
        />

        <ul className="textItems">
          {animals.map((animal) => (
            <Animal key={animal.id} {...animal} />
          ))}
          {animals.length === 0 && "No animals found"}
        </ul>
      </div>
    </main>
  );
}

// Ui component
function Animal({ type, name, age }) {
  return (
    <li className="animals-info">
      <strong>{type}</strong> {name} ({age} years old)
    </li>
  );
}

// Custom Hook

function useAnimal() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    const lastQuery = localStorage.getItem("lastQuery");
    search(lastQuery);
  }, []);

  const search = async (q) => {
    const response = await fetch(
      "http://localhost:8080?" + new URLSearchParams({ q })
    );
    const data = await response.json();
    setAnimals(data);

    localStorage.setItem("lastQuery", q);
  };

  return { search, animals };
}

export default App;
