function updateBySearchParams(info) {
  const searchParams = new URLSearchParams(window.location.search)
  for (const [key, value] of Object.entries(info)) {
    if (searchParams.has(key)) {
      const v = searchParams.get(key)
      if (typeof value === 'number') {
        info[key] = Number(v)
      } else if (typeof value === 'boolean') {
        info[key] = (v.toLowerCase() === 'true')
      } else { // string
        info[key] = v
      }
    }
  }
}