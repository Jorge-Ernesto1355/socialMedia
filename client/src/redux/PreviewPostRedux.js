import { createSlice } from '@reduxjs/toolkit';

const PreviewPostSlice = createSlice({
  name: 'PreviewPost',
  initialState: {
    active: false,
    text: '',
    VotesActive: false,
    postImg: '',
    postFeeling: '',
    votes: [],
    imgReady: {},
    sharedPostId: ''
  },
  reducers: {
    PreviewActive: (state) => {
      state.active = true;
    },
    PreviewDesactivate: (state) => {
      state.active = false;
    },
    TextValue: (state, action) => {
      state.text = action.payload;
    },
    VotesActive: (state) => {
      state.VotesActive = !state.VotesActive;
    },
    PostImg: (state, action) => {
      state.postImg = action.payload;
    },
    PostFeeling: (state, action) => {
      state.postFeeling = action.payload;
    },
    VotesRedux: (state, action) => {
      state.votes = action.payload;
    },
    ImgReady: (state, action) => {
      state.imgReady = action.payload;
    },
    sharedPost: (state, action) => {
      state.sharedPostId = action.payload;
    }
  }
});

export const {
  PreviewActive,
  TextValue,
  VotesActive,
  PreviewDesactivate,
  PostImg,
  PostFeeling,
  VotesRedux,
  ImgReady,
  sharedPost
} = PreviewPostSlice.actions;
export default PreviewPostSlice.reducer;
