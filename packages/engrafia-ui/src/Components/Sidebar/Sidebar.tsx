import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSiteConfig } from '../../Provider';
import * as S from './styles';
import { MdChevronRight, MdExpandMore } from 'react-icons/md';
import { Category, DocFile, getSidebarTree } from '../../get-sidebar';
import { getThemeConfig } from '../../get-theme-config';
import { getFolderContent } from '../../get-folders';
import { order } from './util';

const sidebar = getSidebarTree();
const { default: themeConfig } = getThemeConfig();

export function Sidebar({ hide = true }) {
  const { version } = useSiteConfig();
  const router = useRouter();
  const [toggle, setToggle] = React.useState(['']);

  const sidebarTree = React.useMemo(() => {
    const paths = [themeConfig.rootDocs, version, router.locale].filter(
      (p) => p
    ) as string[];

    return getFolderContent(sidebar, paths);
  }, [sidebar, version, router.locale, themeConfig]);

  function isActive(path: string) {
    return path === router.asPath;
  }

  function isOpened(item: DocFile) {
    return toggle?.includes(item.relativePath);
  }

  const handleClick = React.useCallback(
    (relativePath: string) => {
      const index = toggle.indexOf(relativePath);
      if (index >= 0) {
        setToggle((state) => state.filter((path) => path !== relativePath));
      } else {
        setToggle((state) => state.concat([relativePath]));
      }
    },
    [sidebarTree, toggle]
  );

  React.useEffect(() => {
    const opened = sidebarTree?.children?.map((e) => e.relativePath);
    setToggle(opened);
  }, [sidebarTree]);

  function recursiveMenu(menu: Category & DocFile) {
    return (
      <S.List key={menu.path}>
        {menu.meta ? (
          <S.Link className={isActive(menu.url) ? S.active() : S.inactive()}>
            <S.Tag
              css={isActive(menu.url) ? { background: '$accents8' } : {}}
            />
            <Link href={menu.url}>
              <a>{menu.meta.title.trim()}</a>
            </Link>
          </S.Link>
        ) : (
          <S.Category onClick={() => handleClick(menu.relativePath)}>
            {menu.title}
            {isOpened(menu) ? <MdExpandMore /> : <MdChevronRight />}
          </S.Category>
        )}
        {isOpened(menu) &&
          order(
            menu?.children?.sort((a, b) => {
              if (a.meta) {
                return -1;
              } else {
                return 1;
              }
            })
          )?.map((item: Category & DocFile) => {
            if (item.meta) {
              return (
                <S.Item key={item.path}>
                  <S.Link
                    className={isActive(item.url) ? S.active() : S.inactive()}
                  >
                    <S.Tag
                      css={
                        isActive(item.url) ? { background: '$accents8' } : {}
                      }
                    />
                    <Link href={item.url}>
                      <a>{item.meta.title.trim()}</a>
                    </Link>
                  </S.Link>
                </S.Item>
              );
            }

            return recursiveMenu(item);
          })}
      </S.List>
    );
  }
  return (
    <S.SidebarWrapper hideIn={hide ? 'xs' : undefined}>
      <div className="wrapper">
        {order(
          sidebarTree?.children?.sort((a, b) => {
            if (a.meta) {
              return -1;
            } else {
              return 1;
            }
          })
        )?.map?.((child) => recursiveMenu(child))}
      </div>
    </S.SidebarWrapper>
  );
}
