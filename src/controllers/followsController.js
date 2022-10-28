import { follow, getIsFollowed, getUserFollows, unfollow } from "../repositories/followsRepository.js";

async function getFollows (req, res) {
    const { userId } = res.locals.session;
    const { followedId } = req.params;

    try {
        const isFollowed = await getIsFollowed(userId, followedId);
        return res.status(200).send(isFollowed);
    } catch (error) {
        return res.status(500).send("followers not available.");
    }
}

async function userFollows (req, res) {
    const { userId } = res.locals.session;

    try {
        const userFollows = await getUserFollows(userId);
        return res.status(200).send(userFollows);
    } catch (error) {
        return res.status(500).send("user follows not available.");
    }
}

async function changeFollows (req, res) {
    const { userId } = res.locals.session;
    const { followedId, followed } = req.body;

    if (followed) {
        try {
            await unfollow(userId, followedId);
            return res.status(200).send("unfollowed");
        } catch (error) {
            return res.status(500).send("unfollow not available.");
        }
    } else {
        try {
            await follow(userId, followedId);
            return res.status(200).send("following");
        } catch (error) {
            return res.status(500).send("follow not available");
        }
    }
}

export { getFollows, userFollows, changeFollows };