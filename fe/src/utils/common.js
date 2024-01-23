export const formatDate = (dateString) => {
  const timezoneOffset = new Date().getTimezoneOffset() / 60;
  const timezoneString = `${timezoneOffset > 0 ? '-' : '+'}${(`0${timezoneOffset}`).slice(-2)}:00`;

  try {
    return new Date(dateString.replace(/Z$/, timezoneString)).toLocaleDateString('en-us', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return 'Invalid date';
  }
};
