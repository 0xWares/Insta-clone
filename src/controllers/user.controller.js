const followModel = require('./../model/follow.model')

async function userFollowController(req, res){

    const followeeUserName = req.params.userName
    const followerUserName = req.user.userName

    if(followerUserName === followeeUserName){
        return res.status(400).json({
            message: "Could not follow yourself"
        })
    }

    const isFolloweeExists = await followModel.findOne({
        userName: followeeUserName
    })

    if(isFolloweeExists){
        return res.status(400).json({
            message: "User is not available"
        })
    }

    const hasAlreadyFollowed = await followModel.findOne({
        follower: followerUserName,
        followee: followeeUserName
    })


    if(hasAlreadyFollowed){
        return res.status(201).json({
            message: `You have already followed ${followeeUserName}`
        })
    }

    const followRecord = await followModel.create({
        follower: followerUserName,
        followee: followeeUserName
    })

    res.status(201).json({
        message: `You are following ${followeeUserName}`,
        followRecord
    })

}

async function userUnfollowController(req, res){
    const followeeUserName = req.params.userName
    const followerUserName = req.user.userName


    const hasAlreadyFollowed = await followModel.findOne({
        follower: followerUserName,
        followee: followeeUserName
    })

    if(!hasAlreadyFollowed){
        return res.status(400).json({
            message: `You have not followed ${followeeUserName}`
        })
    }

    await followModel.findByIdAndDelete(hasAlreadyFollowed._id)
    res.status(201).json({
        message: "Unfollowed successfully."
    })
}


module.exports = {
    userFollowController,
    userUnfollowController

}