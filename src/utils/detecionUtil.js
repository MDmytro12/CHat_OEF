export const detectPartnerId = (authors, userId) => {
  if (userId !== authors[0].user._id) {
    return 0;
  } else {
    return 1;
  }
};
