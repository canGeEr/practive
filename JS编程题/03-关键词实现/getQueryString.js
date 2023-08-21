function getQueryString(url) {
  let { search } = new URL(url);
  search = search.substring(1);
  if (!search) return null;
  return new URLSearchParams(search);
}
