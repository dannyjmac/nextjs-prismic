import Head from "next/head";
import Prismic from "prismic-javascript";
import { RichText, Date } from "prismic-reactjs";
import { client } from "../prismic-configuration";

export default function Home(props) {
  console.log(props.posts.results);
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
