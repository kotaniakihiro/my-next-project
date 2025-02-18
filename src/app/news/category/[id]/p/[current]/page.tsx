import NewsList from "@/app/_components/NewsList";
import PageNation from "@/app/_components/Pagenation";
import { NEWS_LIST_LIMIT } from "@/app/_constants";
import { getCategoryDetail, getNewsList } from "@/app/_libs/microcms";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
    current: string;
  }>;
};
export default async function page({ params }: Props) {
  const { id, current } = await params;
  const currentValue = parseInt(current, 10);

  if (Number.isNaN(currentValue) || currentValue < 1) {
    notFound();
  }

  const category = await getCategoryDetail(id).catch(notFound);

  const { contents: news, totalCount } = await getNewsList({
    filters: `category[equals]${category.id}`,
    limit: NEWS_LIST_LIMIT,
    offset: NEWS_LIST_LIMIT * (currentValue - 1),
  });

  if (news.length === 0) {
    notFound();
  }

  return (
    <>
      <NewsList news={news} />
      <PageNation
        totalCount={totalCount}
        current={currentValue}
        basePath={`/news/category/${category.id}`}
      />
    </>
  );
}
