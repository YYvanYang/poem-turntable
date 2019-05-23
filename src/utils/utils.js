import { data } from 'Data/data';

export function getPoemById(id) {
  for (const l0 of data) {
    const dynasty = l0.name.trim()
    const level1 = l0.children;
    for (const l1 of level1) {
      const author = l1.name.trim()
      const block = l1.children;
      for (const b of block) {
        if (id === b.name) {
          const child = b.children[0] || {};
          const poem = child.name;
          return {
            dynasty,
            author,
            poem
          }
        }
      }
    }
  }
}
