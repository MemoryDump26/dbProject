function createQuery(queryString) {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: queryString
    }),
  };
}

function query(queryString, callback) {
  const fetchOptions = createQuery(queryString);

 fetch("http://localhost:3001/query", fetchOptions)
    .then(res => res.json())
    .then(data => callback(data))
}

module.exports = { createQuery, query }
