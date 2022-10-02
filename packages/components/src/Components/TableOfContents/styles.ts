import { styled, css } from '@nextui-org/react';

export const TableOfContentWrapper = styled(`aside`, {
  display: `flex`,
  flexDirection: `column`,
  position: `relative`,
  maxWidth: `15.62rem`,
  minWidth: `15.62rem`,
  overflow: `auto`,
  top: `1.797rem`,

  [`@media (max-width: 48rem)`]: {
    display: `none`,
  },

  ul: {
    margin: '1.5rem 0',
  },

  h3: {
    fontSize: `1.125rem`,
    color: `$text`,
    fontWeight: `$medium`,
    margin: `0`,
  },

  div: {
    position: 'fixed',
  },
});

export const ItemLink = styled(`li`, {
  display: `block`,
  textDecoration: `none`,
  fontSize: `.8rem`,
  lineHeight: `1.5`,
  transition: `all 0.2s ease-in-out`,
  padding: '0.3rem 0',
});

export const active = css({
  fontWeight: `$medium`,
  '& a': {
    color: `$text`,
  },
});

export const inactive = css({
  '& a': {
    color: `$accents8`,
  },
  fontWeight: `$light`,
});
