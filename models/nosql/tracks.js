const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')

const TracksScheme = new mongoose.Schema(
    {
        name: {
            type: String
        },
        album: {
            type: String
        },
        cover: {
            type: String,
            validate: {
                validator: (req) => {
                    return true;
                },
                message: 'ERROR_URL'
            }
        },
        artist: {
            name: {
                type: String
            },
            nickname: {
                type: String
            },
            nationality: {
                type: String
            }
        },
        duration: {
            start: {
                type: Number
            },
            end: {
                type: Number
            }
        },
        mediaId: {
            type: mongoose.Types.ObjectId,
        },
    },
    {
        timestamps: true, // createdAt, updatedAt
        versionKey: false
    }
)

TracksScheme.statics.findOneData = function (id) {
    const joinData = this.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(id)
            }
        },
        {
            $lookup: {
                from: 'storages',
                localField: 'mediaId',
                foreignField: '_id',
                as: 'audio'
            }
        },
        {
            $unwind: '$audio'
        }
        
    ])
    return joinData
}

TracksScheme.plugin(mongooseDelete, { overrideMethods: 'all' })
module.exports = mongoose.model('tracks', TracksScheme)