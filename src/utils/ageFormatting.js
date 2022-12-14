// Functions for converting a creation time (Unix time) to a readable age e.g. "3 weeks".

// Durations in seconds
const durations = {
  year: 31536000, // 365  days
  month: 2592000, // Assuming 30 days = 1 month
  week: 604800,
  day: 86400,
  hour: 3600,
  minute: 60
};

const unixTimeToAgeInSeconds = (unixTimeStamp) => {
  const currentUnixTime = Math.floor(new Date().getTime() / 1000); // getTime() returns milliseconds

  const ageInSeconds = currentUnixTime - unixTimeStamp;

  return ageInSeconds;
};

const formatAge = (unixTimeStamp) => {
  const ageInSeconds = unixTimeToAgeInSeconds(unixTimeStamp);

  if (ageInSeconds < 60) return "seconds";

  for (const [unit, duration] of Object.entries(durations)) {
    if (ageInSeconds >= duration) {
      const ageTidy = Math.floor(ageInSeconds / duration);
      const timeUnit = ageTidy > 1 ? `${unit}s` : unit;

      return `${ageTidy} ${timeUnit}`;
    }
  }
};

export default formatAge;
