class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = null, // object rakhna: { email: "...", password: "..." } (field-wise errors)
    stack = ""
  ) {
    super(message); // Error(message) call hota hai: message aur name initialize ho jaate hain

    this.statusCode = statusCode;
    this.data = null; // error ke case mein data hamesha null
    this.success = false; // error hai toh success kabhi true nahi
    this.errors = errors;

    if (stack) {
      // agar stack pass kiya hai toh wahi use karo
      this.stack = stack;
    } else {
      // warna current jagah se clean stack trace banao (isme ApiError constructor ki line nahi aati)
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;