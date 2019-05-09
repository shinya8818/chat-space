json.array! @new_messages do |message|
  json.content message.content
  json.image message.image
  json.time message.created_at
  json.name message.user.name
  json.id message.id
end
