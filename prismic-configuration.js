import Prismic from "prismic-javascript";

export const apiEndpoint = "https://next-tester.cdn.prismic.io/api/v2";

export const accessToken = "";

// Client method to query documents from the Prismic repo

export const client = Prismic.client(apiEndpoint, { accessToken });
