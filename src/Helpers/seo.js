const constructSEOTitle = (title) => title
  .split(' ')
  .map((el) => el.toLowerCase())
  .filter((el) => (
    el !== '-'
      && el !== ''
      && el !== ' '
      && el !== '?'
      && el !== ','
      && el !== ':'
      && el !== ';'
      && el !== '.'
      && el !== '/'
      && el !== '{'
      && el !== '}'
      && el !== '['
      && el !== ']'
      && el !== '"'
      && el !== "'"
      && el !== '!'
      && el !== '@'
      && el !== '#'
      && el !== '$'
      && el !== '%'
      && el !== '^'
      && el !== '&'
      && el !== '*'
      && el !== '('
      && el !== ')'
      && el !== '-'
      && el !== '_'
      && el !== '='
      && el !== '+'
      && el !== '|'
      && el !== '\\'
  ))
  .join('-');
export default constructSEOTitle;
