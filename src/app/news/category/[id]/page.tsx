import NewsList from "@/app/_components/NewsList";
import { getCategoryDetail, getNewsList } from "@/app/_libs/microcms";
import Category from "@/app/_components/Category";
import { notFound } from "next/navigation";
import { NEWS_LIST_LIMIT } from "@/app/_constants";
import PageNation from "@/app/_components/Pagenation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;
  const category = await getCategoryDetail(id).catch(notFound);

  const { contents: news, totalCount } = await getNewsList({
    limit: NEWS_LIST_LIMIT,
    filters: `category[equals]${category.id}`,
  });
  return (
    <>
      <p>
        <Category category={category} />
        の一覧
      </p>
      <NewsList news={news} />
      <PageNation
        totalCount={totalCount}
        basePath={`/news/category/${category.id}`}
      />
    </>
  );
}
