const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)) // Promise.resolve() karta kya hai? Ye kisi bhi value ko Promise bana deta hai. agar already promise h to vhi return kar deta hai. Agar value promise nahi h to usse resolve karke promise return kar deta hai.
            .catch((err) => next(err));
    };
};

export { asyncHandler };
export default asyncHandler;