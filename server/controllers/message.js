import Message from '../models/Message.js';


export const listMessages = async (req, res) => {
const { withUser } = req.query; // id of the other participant
const me = req.user._id;
const messages = await Message.find({
$or: [
{ sender: me, receiver: withUser },
{ sender: withUser, receiver: me }
]
}).sort({ createdAt: 1 });
res.json(messages);
};