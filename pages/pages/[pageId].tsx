import { Comment, Page, User } from "@prisma/client";
import { NextPage } from "next";
import { PageCommenter } from "../../components/PageCommenter";
import { getClient } from "../../lib/PrismaClient";

const PageComponent: NextPage<{
  pageId: string;
  page: Page & { comments: Array<Comment & { user: User }> }
}> = ({ page, pageId }) => {
  async function createComment(content: string, { x, y }: { x: number, y: number }) {
    await fetch(`/api/v1/pages/${pageId}/comments`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        content, x, y
      })
    });
    location.reload();
  }

  return (
    <>
    <PageCommenter url={page.url} onCreateComment={createComment} comments={page.comments} />
    </>
  );
};

PageComponent.getInitialProps = async (context) => {
  const { pageId: id } = context.query;
  const page = await getClient().page.findFirst({
    where: { id: id as string },
    include: {
      comments: {
        include: {
          user: true
        }
      }
    }
  });
  return {
    pageId: id as string,
    page: page!
  };
}

export default PageComponent;
