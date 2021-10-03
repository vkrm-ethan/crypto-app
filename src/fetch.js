function updateOptions(options) {
  const update = { ...options };
  if (localStorage.user && JSON.parse(localStorage.user).token) {
    update.headers = {
      ...update.headers,
      Authorization: `Bearer ${JSON.parse(localStorage.user).token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
  } else {
    update.headers = {
      ...update.headers,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
  }
  console.log(update);
  return update;
}

export default function fetcher(url, options) {
  return fetch(url, updateOptions(options));
}
