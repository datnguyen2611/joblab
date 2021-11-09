import {
  CAREER_EDITING,
  EDUCATION_EDITING,
} from '../constants/Status';

const INIT_STATE = {
  isCareerEditing: false,
  isEducationEditing: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CAREER_EDITING:
      console.log("Call CAREER_EDITING")
      //console.log(action.isCareerEditing)
      return {
        ...state,
        isCareerEditing: action.isCareerEditing
      };
    case EDUCATION_EDITING:
      console.log("Call EDUCATION_EDITING")
      //console.log(action.isEducationEditing)
      return {
        ...state,
        isEducationEditing: action.isEducationEditing
      };
    default:
      return state;
  }
};
