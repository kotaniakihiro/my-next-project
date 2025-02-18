import { notFound } from "next/navigation";
import Article from "@/app/_components/Article";
import ButtonLink from "@/app/_components/ButtonLink";
import { getNewsDetail } from "@/app/_libs/microcms";
import styles from "@/app/news/[slug]/page.module.css";

type Props = {
  params: {
    slug: string;
  };
  searchParams: {
    dk?: Promise<string>;
  };
};

export default async function Page({ params, searchParams }: Props) {
  const contentId = params.slug;
  const data = await getNewsDetail(contentId, {
    draftKey: await searchParams.dk,
  }).catch(notFound);
  return (
    <>
      <Article data={data} />
      <div className={styles.footer}>
        <ButtonLink href="/news">ニュース一覧</ButtonLink>
      </div>
    </>
  );
}
