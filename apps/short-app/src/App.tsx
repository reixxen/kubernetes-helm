import { useEffect, useState } from "react";
import "./App.css";
import axios, { AxiosError } from "axios";
import { Link } from "./interfaces";

function App() {
  const PREFIX = import.meta.env.VITE_DOMAIN ? import.meta.env.VITE_DOMAIN : "";
  const [links, setLinks] = useState<Link[]>([]);
  const [error, setError] = useState<string>();
  const [newUrl, setNewUrl] = useState<string>("");

  useEffect(() => {
    loadUrls();
  }, []);

  const loadUrls = async () => {
    try {
      const { data } = await axios.get<Link[]>(`${PREFIX}/api`);
      setLinks(data);
    } catch (e) {
      if (e instanceof AxiosError) {
        setError(e.response?.data.message);
      }
    }
  };

  const deleteUrl = async (id: number) => {
    await axios.delete(`${PREFIX}/api/${id}`);
    loadUrls();
  };

  const addUrl = async () => {
    await axios.post(`${PREFIX}/api`, {
      link: newUrl,
    });
    loadUrls();
    setNewUrl("");
  };

  return (
    <>
      <img src="/vite.svg" />
      <h1>Сокращатель ссылок</h1>
      {links.map((l) => (
        <div className="row" key={l.id}>
          <div>{l.id}</div>
          <div>{l.url}</div>
          <div>
            <a href={`${PREFIX}/api/${l.hash}`}>Перейти</a>
          </div>
          <div>
            <button onClick={() => deleteUrl(l.id)}>Удалить</button>
          </div>
        </div>
      ))}
      <div className="form">
        <input onChange={(e) => setNewUrl(e.target.value)} value={newUrl} />
        <button onClick={addUrl}>Сократить</button>
      </div>
      {error && <div className="error">{error}</div>}
    </>
  );
}

export default App;
