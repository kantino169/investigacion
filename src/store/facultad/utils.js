export function getSubtree (tree, id, current, ...rest) {
  if (current === undefined) {
    return tree[id]
  }
  for (const idparent in tree) {
    const value = getSubtree(tree[idparent][`${current}s`], id, ...rest)
    if (value) return value
  }
}
