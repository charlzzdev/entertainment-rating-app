export const searchMusic = (music) => {
      return {
            type: 'SEARCH_MUSIC',
            music
      }
}

export const similarContent = (content) => {
      return {
            type: 'SIMILAR_CONTENT',
            content
      }
}