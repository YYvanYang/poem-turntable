import { data } from 'Data/data';

export function getPoemById(id) {
  for (const l0 of data) {
    const level1 = l0.children;
    for (const l1 of level1) {
      const block = l1.children;
      for (const b of block) {
        if (id === b.name) {
          const child = b.children[0] || {};
          return child.name;
        }
      }
    }
  }
}
