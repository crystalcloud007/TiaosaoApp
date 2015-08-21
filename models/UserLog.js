/**
 * Created by Haoran on 2015/8/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserLog = new Schema(
    {
        target: {type: Schema.Types.ObjectId, ref:'User'},
        action:{type:String, default:''},
        ip:{type:String, default:''},
        time:{type:Date, default:Date.now()}
    }
);
