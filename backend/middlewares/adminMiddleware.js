module.exports = function (req, res, next){
    const role = req.cookies["role"];
    if(!role) return res.status(401).send("Access Denied");

    if(role != "admin") return res.status(401).send("Access Denied");

    try {
        req.role = role;
        next()
    } catch (error) {
        return res.status(400).send("Invalid Token");
    }
}