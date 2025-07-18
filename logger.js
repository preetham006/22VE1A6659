export const Logger = {
  log: (level, message, metadata = {}) => {
    const logEntry = { timestamp: new Date().toISOString(), level, message, ...metadata };
    console.log(JSON.stringify(logEntry)); // Simulated; replace with Pre-Test Setup middleware
  }
};