import { Comment, User } from "@prisma/client";
import { FC, useEffect, useRef } from "react";
import styles from "./PageCommenter.module.scss";

export const PageCommenter: FC<{
  url: string;
  onCreateComment: (comment: string, position: { x: number, y: number }) => void;
  comments: Array<Comment & { user: User }>
}> = ({ url, onCreateComment, comments }) => {
  function setupIframe(el: HTMLIFrameElement | null) {
    console.log(el);
    function createCommentInputElement(onCreateComment: (e: string) => void) {
      if (!el) return;
      const div = el.contentDocument!.createElement("div");
      div.style.position = "absolute";
      const input = el.contentDocument!.createElement("input");
      input.style.border = "1px solid #ccc";
      input.style.borderRadius = "4px";
      input.style.padding = "4px 8px"
      input.style.width = "240px";
      input.style.background = "#fff";
      input.addEventListener("keypress", (e) => e.key === "Enter" && onCreateComment((e.target as HTMLInputElement).value))
      div.append(input);
      return div;
    }

    function showCommentPopup(x: number, y: number) {
      if (!el) return;
      const document = el.contentDocument!;
      const div = createCommentInputElement((text) => {
        document.body.removeChild(div);
        onCreateComment(text, { x, y });
      })!;
      if (!div) return;
      div.style.top = `${y}px`;
      div.style.left = `${x}px`;
      div.style.zIndex = "30000";
      document.body.append(div);
    }

    function showPin(text: string, x: number, y: number) {
      if (!el) return;
      const document = el.contentDocument!;
      const div = document.createElement("div");
      div.style.position = "absolute";
      div.style.top = `${y}px`;
      div.style.left = `${x}px`;
      div.style.zIndex = "30000";
      div.style.backgroundColor = "#fff";
      div.style.border = "1px solid #ccc";
      div.style.borderRadius = "2px";
      div.style.padding = "4px 8px";
      div.textContent = text;
      document.body.append(div);
    }

    el && (el.onload = () => {
      el.contentWindow && (el.contentWindow.oncontextmenu = (e) => {
        e.preventDefault();
        showCommentPopup(e.pageX, e.pageY);
      });
      console.log(comments.length);
      setTimeout(() => comments.forEach(it => showPin(it.content, it.x, it.y)), 100);
    })
  }
  return (
    <div style={{ display: "flex" }}>
      <iframe
        ref={setupIframe}
        style={{ position: "relative", minWidth: 1024, boxSizing: "border-box", height: 640 }}
        src={`/api/v1/proxy?url=${encodeURIComponent(url)}`}
      />
      <ul className={styles.commentList}>
        {comments.map((c) => (
          <li key={c.id} className={styles.comment}>
            <div>{c.userId}</div>
            <div>{c.content}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
