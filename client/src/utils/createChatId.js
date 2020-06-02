export default function createChatId(senderId, receiverId, delimiter) {
  return [senderId, receiverId].sort().join(delimiter);
}
