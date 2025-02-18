import NewsList from "@/app/_components/NewsList";
import PageNation from "@/app/_components/Pagenation";
import { NEWS_LIST_LIMIT } from "@/app/_constants";
import { getNewsList } from "@/app/_libs/microcms";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    current: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { current } = await params;
  const currentValue = parseInt(current, 10);

  if (Number.isNaN(currentValue) || currentValue < 1) {
    notFound();
  }

  const { contents: news, totalCount } = await getNewsList({
    limit: NEWS_LIST_LIMIT,
    offset: NEWS_LIST_LIMIT * (currentValue - 1),
  });

  if (news.length === 0) {
    notFound();
  }

  return (
    <>
      <NewsList news={news} />
      <PageNation totalCount={totalCount} current={currentValue} />
    </>
  );
}
