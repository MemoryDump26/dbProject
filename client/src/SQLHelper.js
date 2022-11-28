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

module.exports = { createQuery }
