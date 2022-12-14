import { styled, css, cssHideShowIn } from '@nextui-org/react';

export const SidebarWrapper = styled(
  `aside`,
  {
    top: '1rem',
    display: `flex`,
    position: `relative`,
    flexDirection: `column`,
    maxWidth: `15.62rem`,
    width: `15.62rem`,
    minWidth: `15.62rem`,
    height: 'calc(100vh - 90px)',

    '.wrapper': {
      overflow: `auto`,
      position: `fixed`,
      height: 'calc(100vh - 100px)',

      '& > ul': {
        padding: 0,
      },
    },
  },
  cssHideShowIn
);

export const List = styled(`ul`, {
  listStyle: `none`,
  margin: 0,
  paddingLeft: `1rem`,
});

export const Item = styled(`li`, {
  position: `relative`,
  paddingLeft: `1rem`,
});

export const Category = styled(`div`, {
  display: `flex`,
  alignItems: 'center',
  paddingBlock: `0.5rem`,
  border: `1px solid transparent`,
  fontWeight: `$medium`,
  fontSize: `1.125rem`,
  color: `$text`,
  transition: 'ease 300ms',
  cursor: 'pointer',
  '&:hover': {
    color: `$accents8`,
  },
});

export const Tag = styled(`div`, {
  width: `4px`,
  height: `4px`,
  marginInlineEnd: `0.5rem`,
  background: `$primary`,
  borderRadius: `$rounded`,
});

export const Link = styled(`span`, {
  display: `flex`,
  alignItems: `center`,
  padding: `0.1rem 0`,
  fontSize: `1rem`,
  fontWeight: `$normal`,
  [Tag.toString()]: {
    background: `$accents8`,
  },
});

export const active = css({
  '& a': {
    fontWeight: `$medium`,
    color: `$text`,
  },
});

export const inactive = css({
  fontWeight: `$normal`,
  '& a': {
    color: `$accents8`,
  },
});
