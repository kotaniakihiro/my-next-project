import { getNewsList } from "../_libs/microcms";
import NewsList from "../_components/NewsList";
import PageNation from "../_components/Pagenation";
import SearchField from "../_components/SearchField";

export default async function Page() {
  const { contents: news, totalCount } = await getNewsList();

  return (
    <>
      <SearchField />
      <NewsList news={news} />
      <PageNation totalCount={totalCount} />
    </>
  );
}
