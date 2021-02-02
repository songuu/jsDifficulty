Object.entries(
  [...document.querySelectorAll('*')]
    .map((v) => v.tagName)
    .reduce((res, a) => {
      res[a] = (res[a] || 0) + 1
      return res
    }, {})
)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 3)
