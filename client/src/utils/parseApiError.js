// Axios error ko friendly { message, fields } mein badalta hai
export default function parseApiError(error) {
  // Server tak request pahunchi hi nahi (server band, network issue)
  if (!error.response) {
    return {
      message: "Can't reach the server. Please check your connection and try again.",
      fields: {},
    };
  }

  const { message, errors } = error.response.data || {};
  return {
    message: message || "Something went wrong. Please try again.",
    fields: errors || {},
  };
}