/**
 * Created by Haoran on 2015/9/2.
 */
var config_help = require('../configs/config_help');

module.exports = function(app, express)
{
    var api = express.Router();

    api.get('/:category', function(req,res)
    {
        var msg = '';

        switch(req.params.category)
        {
            case 'req_verify_real_name':
            {
                msg = config_help.request_verify_real_name;
                break;
            }
            default :
            {
                msg = '请选择需要帮助的类型，到时候会有一个菜单的。';
            }
        }
        res.send({message:msg});

    });

    return api;
};