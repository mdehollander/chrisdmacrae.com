import React from "react";
import { Col, Jumbotron, Row } from "react-bootstrap";
import { Heading } from "../../core/components/Typography/Heading";
import { Paragraph } from "../../core/components/Typography/Paragraph";

export interface ArticleHeroProps {
  article: any;
  className?: string;
  variant: "featured-right" | "featured-left"
}

export function ArticleHero(props: ArticleHeroProps) {
  if (props.article) {
    switch (props.variant) {
      case "featured-right":
        return <ArticleHeroFeaturedSide alignment="right" {...props} />;
        case "featured-left":
          return <ArticleHeroFeaturedSide alignment="left" {...props} />
    }
  }

  return undefined;
}

interface ArticleHeroFeaturedSideProps extends ArticleHeroProps {
  alignment: "left" | "right";
}

function ArticleHeroFeaturedSide({ article, alignment, className, variant }: ArticleHeroFeaturedSideProps) {
  const featuredImage = (
      <Col md="6" className="pr-0">
        <img src={article?.featured_image} />
      </Col>
  )

  return (
    <Jumbotron className="container mb-3 pl-0 pt-0 pb-0 bg-transparent position-relative" fluid>
      <div className="h-100 tofront">
        <Row className="justify-content-between">
        {article.featured_image && alignment === "left" && featuredImage}
          <Col md={article.featured_image ? "6" : "12"} className="pt-6 pb-6 pr-6 align-self-center">
            <Paragraph className="text-uppercase font-weight-bold">
              {article?.categories?.map((category, i) => (
                <a href={article.href} className="text-primary" key={i}>
                  {category.title}
                </a>
              ))}
            </Paragraph>
            <Heading as="h1" bold={true} className="display-4 secondfont mb-3">
              {article.title}
            </Heading>
            <Paragraph className="mb-3">
              {article.description}
            </Paragraph>
            {article.author && (
              <div className="d-flex align-items-center">
                <img src={article.author.photo} className="rounded-circle" width="70" />
                  <small className="ml-3">
                    {article.author.fullName}
                    <span className="text-muted d-block">
                      A few hours ago · 5 min read
                    </span>
                  </small>
              </div>
            )}
          </Col>
          {article.featured_image && alignment === "right" && featuredImage}
        </Row>
      </div>
    </Jumbotron>
  );
}