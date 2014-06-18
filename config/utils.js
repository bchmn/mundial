exports.validateReq = function(req, fields){
    var errs = [];
    if (req.query.force != '1') {
        for (var i= 0, field; field=fields[i]; i++){
            if (!req.body[field]) errs.push('missing ' + field + '');
        }
    }
    return errs.length>0 ? errs : false;
}