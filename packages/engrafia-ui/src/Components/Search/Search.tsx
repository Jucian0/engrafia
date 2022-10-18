import React, { useState } from 'react';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { FormElement, Grid, Input,Text } from '@nextui-org/react';
import { RiSearchFill } from 'react-icons/ri';
import { getThemeConfig } from '../../get-theme-config';
import { useTranslate } from '../../useTranslation';
import * as S from './styles';
import { DocFile, getSidebarTree } from '../../get-sidebar';
import { getSearchableList } from './utils';
import { search } from 'fast-fuzzy';
import { useSiteConfig } from '../../Provider';
import { getFolderContent } from '../../get-folders';

const StyledTriggerWithCaret = React.forwardRef(
  ({ children, ...props }: any, forwardedRef) => {
    return (
      <S.StyledTrigger {...props} ref={forwardedRef}>
        {children}
      </S.StyledTrigger>
    );
  }
);

const ContentListItem = React.forwardRef(
  ({ children, title, ...props }: any, forwardedRef) => (
    <S.ListItem>
      <S.StyledLink
        {...props}
        ref={forwardedRef}
        css={{
          padding: 12,
          borderRadius: 6,
          '&:hover': { backgroundColor: '$gray200' },
        }}
      >
        <S.LinkTitle>{title}</S.LinkTitle>
        <S.LinkText>{children}</S.LinkText>
      </S.StyledLink>
    </S.ListItem>
  )
);

const { default: themeConfig } = getThemeConfig();
const content = getSidebarTree();

export const NavigationMenuDemo = () => {
  const t = useTranslate();
  const [list, setList] = useState([] as DocFile[]);
  const [input,setInput] = React.useState('')

  const { language, version } = useSiteConfig();

  const searchableContent = React.useMemo(() => {
    const paths = [version, language, themeConfig.rootDocs].filter(
      (p) => p
    ) as string[];

    const filteredContent = getFolderContent(content, paths);
    return filteredContent.name ? getSearchableList(filteredContent) : [];
  }, [content, version, language, themeConfig]);

  function handleSetList(e: React.ChangeEvent<FormElement>) {
    setInput(e.target.value)
    const data = search(e.target.value, searchableContent, {
      keySelector: (obj) => obj.meta.title,
    });

    if (data.length === 0) {
      const data = search(e.target.value, searchableContent, {
        keySelector: (obj) => obj.meta.description,
      });
      setList(data);
    } else {
      setList(data);
    }
  }

  return (
    <S.StyledMenu>
      <S.StyledList>
        <NavigationMenuPrimitive.Item>
          <StyledTriggerWithCaret
            onPointerMove={(e: any) => e.preventDefault()}
            onPointerLeave={(e: any) => e.preventDefault()}
          >
            <RiSearchFill fill="var(--nextui-colors-accents6)" size={16} />
          </StyledTriggerWithCaret>
          <S.StyledContent
            onPointerEnter={(e: any) => e.preventDefault()}
            onPointerLeave={(e: any) => e.preventDefault()}
          >
            <Grid css={{ padding: '20px' }}>
              <Input
                contentLeft={
                  <RiSearchFill
                    fill="var(--nextui-colors-accents6)"
                    size={16}
                  />
                }
                contentLeftStyling
                autoFocus
                clearable
                animated={false}
                onChange={handleSetList}
                css={{
                  border: '1px solid $gray200',
                  background: '$gray200',
                  w: '100%',
                  '@xsMax': {
                    mw: '300px',
                  },
                  '& .nextui-input-content--left': {
                    h: '100%',
                    ml: '$4',
                    dflex: 'center',
                  },
                }}
                aria-label="Search field"
                placeholder={t(themeConfig.nav?.search_bar ?? 'Search')}
              />
            </Grid>
            <S.ContentList>
              {list.map((content) => (
                <ContentListItem title={content.meta.title} href={content.url}>
                  {content.meta.description}
                </ContentListItem>
              ))}
            </S.ContentList>
            {list.length === 0 && (
              <Grid
                css={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: 20,
                }}
              >
                {input.length === 0 ?<Text size="$3xl">Start to search by typing...</Text> :<Text size="$3xl">No results found for your search!</Text>}
              </Grid>
            )}
          </S.StyledContent>
        </NavigationMenuPrimitive.Item>
      </S.StyledList>

      <S.ViewportPosition>
        <S.StyledViewport />
      </S.ViewportPosition>
    </S.StyledMenu>
  );
};