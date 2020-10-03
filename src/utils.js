exports.formatTitle = title =>
    title
        .split('-')
        .map(word => word[0].toUpperCase() + word.substring(1))
        .join(' ')
