const lengthOfSortTokensRequired = 2;

const sortPrototypes = {
  name: {
    asc: (a, b) => {
      return a.name.localeCompare(b.name);
    },
    desc: (a, b) => {
      return b.name.localeCompare(a.name);
    },
  },
  updatedTime: {
    asc: (a, b) => {
      return a.updatedTime > b.updatedTime ? 1 : -1;
    },
    desc: (a, b) => {
      return b.updatedTime > a.updatedTime ? 1 : -1;
    },
  },
  createdTime: {
    asc: (a, b) => {
      return a.createdTime > b.createdTime ? 1 : -1;
    },
    desc: (a, b) => {
      return b.createdTime > a.createdTime ? 1 : -1;
    },
  },
};

export function sortByElementProperty(unsortedArray, sortTokens) {
  if (sortTokens.length === lengthOfSortTokensRequired) {
    unsortedArray.sort(sortPrototypes[sortTokens[0]][sortTokens[1]]);
  }
}
