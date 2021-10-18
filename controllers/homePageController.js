let handleHelloWorld = async (req, res) => {
    return res.render("store.ejs",{
        user: req.user
    });
};

module.exports = {
    handleHelloWorld: handleHelloWorld,
};
