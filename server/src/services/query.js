const DEFAULT_PAGE_LIMIT = 0;

function getPagination(query) {
  const limit = Math.abs(query.limit) || 1;
  const page = Math.abs(query.page) || DEFAULT_PAGE_LIMIT;
  const skip = (page - 1) * limit;

  return {
    skip,
    limit
  };
}

module.exports = {
  getPagination
}
