import { postSchema } from '../schemas/postSchema.js';
import urlMetaData from 'url-metadata';
import { addHashtag, deleteLikeData, deleteMiddleTableData, deletePostData, findPost, insertIntoMiddleTable, insertMetadata, listAllPosts, publishPost, publishPostWithoutContent, updateContent, updateLinkAndContent } from '../repositories/postsRepository.js';

async function sendPost(req, res) {
	const { link, content } = req.body;
	const validation = postSchema.validate(req.body);
	const { session } = res.locals;

	if (validation.error) {
		const errors = validation.error.details
			.map((error) => error.message)
			.join('\n');
		return res
			.status(422)
			.send(`The following errors an occurred:\n\n${errors}`);
	}

	try {
		const metadata = await urlMetaData(link, {
			timeout: 20000,
			descriptionLength: 120,
		});

		if (content) {
			const hashtagsHashtable = {};
			content
				.split(' ')
				.filter((word) => word[0] === '#')
				.forEach(
					(element) => (hashtagsHashtable[element.toLowerCase()] = true)
				);
			let valuesString = '';
			for (let i = 1; i <= Object.keys(hashtagsHashtable).length; i++) {
				valuesString += `($${i}), `;
			}
			valuesString = valuesString.trim().replace(/.$/, '');
			const hashtags = Object.keys(hashtagsHashtable);

			if (hashtags.length === 0) {
				const insertPost = await publishPost(content, link, session.userId)
				await insertMetadata(metadata, insertPost.rows[0].id)

				return res.sendStatus(201);
			}

			const insertedPostId = await publishPost(content, link, session.userId)

			const insertedHashtagsId = await addHashtag(hashtags, valuesString)

			await insertMetadata(metadata, insertedPostId.rows[0].id)
			
			const hashtagsIdList = insertedHashtagsId.rows.map(
				(element) => element.id
			);
			valuesString = '';
			for (let i = 1; i <= hashtagsIdList.length; i++) {
				valuesString += `($1, $${i + 1}), `;
			}
			valuesString = valuesString.trim().replace(/.$/, '');

			await insertIntoMiddleTable(valuesString, insertedPostId.rows[0].id, hashtagsIdList);

			res.sendStatus(201);
		} else {
			const insertedPostId = await publishPostWithoutContent(link, session.userId);
			await insertMetadata(metadata, insertedPostId.rows[0].id);
			res.sendStatus(201);
		}
	} catch (error) {
		return res.status(500).send(error.message);
	}
}

async function listPosts(req, res) {
	const { offset, limit } = req.query
	try {
		const query = await listAllPosts(offset, limit)
		res.send(query.rows)
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
}

function addSpaceHashtags(text){

    if(text.includes('#')){
        text = text.replace(/#/gi, ' #');
        text = text.replace(/# /gi, '');
        text = text.replace(/\s{2,}/g, ' ');
        text = text.trim();
    }
    
    return text;
}

async function editPost (req, res) {

	const { userId } = res.locals.session;
	const { link, content } = req.body;
	const { postId } = req.params;
	const validation = postSchema.validate(req.body);
	const contentResolve = addSpaceHashtags(content);

	try {

		const postInfo = await findPost(postId);
		if (postInfo.rows[0].userId !== userId) {
			return res.status(401).send("post made by another user.");
		}	  
		
	} catch (error) {
		return res.status(400).send("can't verify posts user.")
	}

	if (validation.error) {
		const errors = validation.error.details
			.map((error) => error.message)
			.join('\n');
		return res
			.status(422)
			.send(`The following errors an occurred:\n\n${errors}`);
	}

	const hashtagsHashtable = {};
			content
				.split(' ')
				.filter((word) => word[0] === '#')
				.forEach(
					(element) => (hashtagsHashtable[element.toLowerCase()] = true)
				);
			let valuesString = '';
			for (let i = 1; i <= Object.keys(hashtagsHashtable).length; i++) {
				valuesString += `($${i}), `;
			}
			valuesString = valuesString.trim().replace(/.$/, '');
			const hashtags = Object.keys(hashtagsHashtable);

	try {

		if (!postId) {
			return res
			.status(422)
			.send(`The following errors an occurred:\n\nInvalid Id.`);
		}

		if (hashtags.length === 0) {
			await updateLinkAndContent(link, content, postId)
			return res.sendStatus(200)
		}
		
		await updateContent(contentResolve, postId)

		await addHashtag([contentResolve], "($1)")
		
		return res.sendStatus(200);
		
	} catch (error) {
		return res.status(500).send(error.message);
	}

} 

async function deletePost (req, res) {

    const { userId } = res.locals.session;
	const { postId } = req.params;

    if (postId) {

        try {
			const postInfo = await findPost(postId);
			if (postInfo.rows[0].userId !== userId) {
				return res.status(401).send("post made by another user.");
			}  

			await deleteLikeData(postId)
			await deleteMiddleTableData(postId)
            await deletePostData(postId)
    
            return res.sendStatus(200);
    
        } catch (error) {
            return res
				.status(422)
				.send(error.message);
        }

    } else {
        return res
			.status(404)
			.send(`The following errors an occurred:\n\nInvalid Id.`);
    }

}

export { sendPost, listPosts, editPost, deletePost }
