import {
  arrayOf,
  shape,
  number,
  string,
  object,
} from 'prop-types';

const showsType = arrayOf(
  shape({
    title: string,
    current: shape({
      season: string,
      episode: string,
    }),
    comments: string,
    tags: arrayOf(string),
    data: object,
  }),
);

export default showsType;
