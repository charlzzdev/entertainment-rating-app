const initialState = {
      searchResult: {}
};

const reducer = (state = initialState, action) => {
      switch(action.type){
            case 'SEARCH_MUSIC':
                  return {
                        ...state,
                        searchResult: action.music
                  };
            case 'SIMILAR_CONTENT':
                  return {
                        ...state,
                        similarContent: action.content
                  };
            default: return state;
      }
}

export default reducer;