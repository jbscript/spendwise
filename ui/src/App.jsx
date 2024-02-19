import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8000/transactions").then((response) => {
      console.log(response.data);
      setData(response.data);
    });

    return () => {};
  }, []);

  return (
    <>
      <div>Transaction</div>
      <ul>
        {data.map((transaction) => (
          <li key={transaction.id}>
            {transaction.type}-{transaction.amount} -{transaction.description}
            {formatDate(transaction.createdAt)}
          </li>
        ))}
      </ul>
    </>
  );
}

const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
export default App;
