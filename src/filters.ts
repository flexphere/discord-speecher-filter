export const applyFilters = (message: string, filters: MessageFilter[]) => {
  return filters.reduce((prev:string, curr:MessageFilter) => {
    return curr(prev);
  }, message);
}

export const removeCodeBlock = (message: string) => {
  return message.replace(/```[^`]+```/g, '');
}

export const removeQuote = (message: string) => {
  return message.replace(/^>.*/mg, "");
}

export const removeURL = (message: string) => {
  return message.replace(/https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+/, '');
}

export const emojiToLabel = (message: string) => {
  return message.replace(/<([^\d]+)\d+>/g, "$1");
}