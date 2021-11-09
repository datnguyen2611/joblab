import {
  CAREER_EDITING,
  EDUCATION_EDITING
} from 'constants/Status';

export const toggleCareerEdit = (state) => {
  return { 
    type: CAREER_EDITING, 
    isCareerEditing: state,
  };
}

export const toggleEducationEdit = (state) => {
  return { 
    type: EDUCATION_EDITING, 
    isEducationEditing: state,
  };
}