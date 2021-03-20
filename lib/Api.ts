import { Comment } from "@prisma/client";

const ApplicationJsonHeader = { "content-type": "application/json" };

function postJson(url: string, body: any) {
  return fetch(url, { method: "POST", headers: {...ApplicationJsonHeader}, body: JSON.stringify(body) });
}

function throwError(message: string) {
  throw Error(message)
}

export const Apis = {
  v1: {
    users: {
      create(id: string, password: string) {
        return postJson("/api/v1/users/create", { id, password }).then(res => res.ok ? undefined : throwError("Failed to create user."));
      },
      login(id: string, password: string) {
        return postJson("/api/v1/users/login", { id, password }).then(res => res.ok ? undefined : throwError("Failed to login."));
      },
      logout() {
        return postJson("/api/v1/users/logout", {}).then(res => res.ok ? undefined : throwError("Failed to logout."));
      }
    },
    pages: {
      create(url: string) {
        return postJson("/api/v1/pages", { url })
      },
      page(id: string) {
        return {
          comments: {
            create(content: string, { x, y }: { x: number, y: number }) {
              return postJson(`/api/v1/pages/${id}/comments`, { content, x, y });
            },
            list(): Promise<Comment[]> {
              return fetch(`/api/v1/pages/${id}/comments`).then(it => it.json());
            }
          }
        };
      },
      delete(id: string) {
        return fetch(`/api/v1/pages/${id}`, { method: "DELETE" });
      }
    }
  }
}
