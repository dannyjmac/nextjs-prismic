import Head from "next/head";
import Prismic from "prismic-javascript";
import { RichText, Date } from "prismic-reactjs";
import { client } from "../prismic-configuration";
import styled from "styled-components";

const Hero = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
`;

const Article = styled.div`
  background: purple;
  height: 50px;
`;

export default function Home(props) {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>{RichText.asText(props.home.data.title)}</h1>
      <ul>
        {props.posts.results.map((post) => (
          <li key={post.uid}>{RichText.render(post.data.title)}</li>
        ))}
      </ul>
      <Hero>
        <Article></Article>
        <Article></Article>
        <Article></Article>
        <Article></Article>
      </Hero>
    </div>
  );
}

Home.getInitialProps = async (context) => {
  const home = await client.getSingle("blog_home");
  const posts = await client.query(
    Prismic.Predicates.at("document.type", "post"),
    { orderings: "[my.post.date desc]" }
  );

  return { home, posts };
};
