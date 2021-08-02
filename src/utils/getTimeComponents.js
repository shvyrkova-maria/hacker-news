const pad = value => {
  return String(value).padStart(2, '0');
};

const getTimeComponents = time => {
  const hours = pad(
    Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
  );
  const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

  return `${hours}:${mins}:${secs}`;
};

export { getTimeComponents };
