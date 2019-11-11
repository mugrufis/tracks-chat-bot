module.exports = {
    generateUniqueId: function () {
    //    can be replaced with
    //    read all file titles -> cast to number -> increment -> return
    var hrTime = process.hrtime();
    return hrTime[0] * 1000000000 + hrTime[1];
}
};
