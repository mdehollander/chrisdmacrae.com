import React from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github';
import { ArticleRoute, getArticleMetaByName, useArticleData } from '../../lib/articles/routes/article';
import { getAllArticlePaths } from '../../lib/articles/routes/article';
import { footerRelativePath, useFooterData } from '../../lib/core/components/Footer';

export const ArticlePage = (props) => {
  const route = useRouter();

  if (route.isFallback) {
    return <>Loading...</>
  }
  
  return (
    <ArticleRoute {...props} />
  );
}

export async function getStaticPaths() {
  const paths = (await getAllArticlePaths())
    .map(article => ({
      params: {
        article: article.slug
      }
    }));

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async function ({
  params,
  preview,
  previewData,
}) {
  const fileMeta = await getArticleMetaByName(params.article as string);
  let props = {
    isEditing: preview ?? false,
    page: {} as any,
    footer: {} as any
  }

  if (preview || process.env.USE_REMOTE) {
    const fileProps = await getGithubPreviewProps({
      working_repo_full_name: process.env.REPO_FULL_NAME,
      github_access_token: process.env.GITHUB_ACCESS_TOKEN,
      fileRelativePath: fileMeta.articleRelPath,
      head_branch: process.env.BASE_BRANCH,
      ...previewData,
      parse: parseJson
    });
    const footerProps = await getGithubPreviewProps({
      working_repo_full_name: process.env.REPO_FULL_NAME,
      github_access_token: process.env.GITHUB_ACCESS_TOKEN,
      head_branch: process.env.BASE_BRANCH,
      fileRelativePath: footerRelativePath,
      ...previewData,
      parse: parseJson,
    });

    props = {
      ...props,
      page: fileProps.props,
      footer: footerProps.props
    }
  }
  else {
    console.log('works');
    props = {
      ...props,
      page: {
        error: null,
        file: {
          sha: null,
          fileRelativePath: fileMeta.articleRelPath,
          data: (await useArticleData(fileMeta.articleRelPath)),
        }
      },
      footer: {
        error: null,
        file: {
          sha: null,
          fileRelativePath: footerRelativePath,
          data: (await useFooterData()).default
        }
      }
    }
  }

  return {
    props: props,
    unstable_revalidate: 60
  }
}

export default ArticlePage;
