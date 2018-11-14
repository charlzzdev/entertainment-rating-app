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
            default: return state;
      }
}

export default reducer;