const options = {
  rootMargin: "50px",
  threshold: 0.5,
};

const onEntry = (entries, observer) => {
  entries.forEach((entry) => {
    // тут можно писать логику для проверки вхождения
  });
};

const observer = new IntersectionObserver(onEntry, options);
