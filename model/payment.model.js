const mongoose = require('mongoose');

let data = Date.now()
let D_Date = data + 5
const paymentSchema = new mongoose.Schema({
    method: { type: String, required: true },
    status: { type: String, default: 'pending' },
    dilawaryDate: { type: Date, default: D_Date },
},
    {
        isDelete: {
            type: Boolean,
            default: false
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

module.exports = mongoose.model('Payment', paymentSchema);
